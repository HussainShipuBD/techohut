'use strict'
const Zone = use('App/Models/Zone')
const Product = use('App/Models/Product')
const MainProduct = use('App/Models/MainProduct')
const Setting = use('App/Models/Setting')
const Invoice = use('App/Models/Invoice')
const Payment = use('App/Models/Payment')
const Paymentsheet = use('App/Models/Paymentsheet')
const Selling = use('App/Models/Selling')
const Bonus = use('App/Models/Bonus')
const Cart = use('App/Models/Cart')
const Coupon = use('App/Models/Coupon')
const Order = use('App/Models/Order')
const Noti = use('App/Models/Noti')
const Customer = use('App/Models/Customer')
const OrderDetail = use('App/Models/OrderDetail')
const GiftVoucher = use('App/Models/GiftVoucher')
const User = use('App/Models/User')
// const curl = new (require( 'curl-request' ))();
const SRequst = require('request');
const axios = require('axios');
const SSLCommerzPayment = require('sslcommerz')
const Env = use('Env')
const Database = use('Database')
const store_id = Env.get('SSL_STORE_ID')
const store_passwd = Env.get('SSL_STORE_PASSWORD')
const ssl_live = Env.get('SSL_LIVE')
const fetch = require('node-fetch');
// const ssl_live = false;
const url = Env.get('APP_URL', 'https://dreamsgallerybd.com');

const BKASH_USERNAME = Env.get('BKASH_USERNAME', '');
const BKASH_PASS = Env.get('BKASH_PASS', '');
const BKASH_APP_KEY = Env.get('BKASH_APP_KEY', '');
const BKASH_APP_SECRET = Env.get('BKASH_APP_SECRET', '');
const BKASH_MODE = Env.get('BKASH_MODE', '');
const BKASH_REDIRECT_URL = Env.get('BASE_URL', '')+"/bkash-status";
const BASE_URL = Env.get('BASE_URL', '');
const moment = require('moment-timezone');
const { getCount } = require('../../Models/Faq')
class OrderController {
    contactNumber (){
        return "09678120120 ";
    }

    async showZones({response}){

        let zone = await Zone.query().orderBy('zoneName','asc').fetch();
        return response.status(200).json({
            success: true,
            zones:zone
        })

    }
    async  checkStock({request,response}){
        let id =  request.input('id')
        let stock =  request.input('stock')

        let product = await Product.query().where('id',id).where('stock','>=',stock).first();


        if(product){
            return response.status(202).json({
                message: "Product found!",
            })
        }
        return response.status(401).json({
            message: "Product not found!",
        })
    }
    async  checkCoupon({request,response}){
        let data = request.all();
        var today = new Date();
        let dd = String(today.getDate()).padStart(2,'0');
        let mm = String(today.getMonth()+1).padStart(2,'0');
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd
        let product = await Coupon.query().where('code',data.code).first();
        if(product == null){
            return response.status(401).json({
                'message': 'Invalid Promo Code!',
                'success': true,
            })
        }
        product = await Coupon.query().where('code',data.code).where('validity' , '>=' , today).first();
        if(product == null){
            return response.status(401).json({
                'message': 'Promo Code expired!',
                'success': true,
            })
        }



        return response.status(202).json({
            Coupon: product,
            'success': true,
        })


    }
    async  checkGiftVoucherCode({request,response}){
        let data = request.all();


        let product = await GiftVoucher.query().where('code',data.code).first();
        if(product == null){
            return response.status(401).json({
                'message': ' Invalid Gift Voucher Code !',
                'success': true,
            })
        }
        return response.status(202).json({
            Coupon: product,
            'success': true,
        })


    }
    async  checkReferralCode({request,response}){
        let data = request.all();
        let product = await Customer.query().where('barcode',data.barCode).getCount();


        if(product > 0){
            return response.status(202).json({

                Coupon: product,
                'success': true,
            })
        }
        return response.status(401).json({
            message: "Coupon not found!",
            'success': false,
        })
    }

    async checkProductStock(cartItems){
        for(let d of cartItems){

            let ispa = await Product.query().where('id',d.productId).where('stock','>=',d.quantity).getCount();
            if(ispa==0){
                return {
                    next:false,
                    item:d
                }
            }


        }
        return  {
            next:true,
            item: null
        }
    }


    async storeOrder({request,response, auth}){
        let data = request.all();
        let user = await auth.getUser();
        data.userId = user.id;
        let cartItems = data.cartItems;
        let zoneId = data.zoneId;
        const date = data.date;
        delete data.cartItems;
        delete data.date;
        delete data.zoneId;

        let checkProductStockvar = await this.checkProductStock(cartItems);
        if(checkProductStockvar.next == false){
            return response.status(422).json({
                'success': false,
                'message': checkProductStockvar.item.mproduct.productName + " product quantity is stock out!",

              })
        }
        let order = await Order.create(data);
        order = order.toJSON();


        if(data.giftVoucherAmount>0){
            await GiftVoucher.query().where('code',data.giftVoucherCode).delete()
        }
        await Customer.query().where('userId',user.id).update({
            address: data.billingAddress,
            postCode: data.postCode,
            zone: data.billingCity,
            customerName: data.name,
            zoneId: zoneId,
        })
        await User.query().where('id',user.id).update({
            name: data.name,
        });
        let Items = [];
        let product_names = '';
        let totalQuantity = 0;
        let ii = 0;
        for(let d of cartItems){
            let ob = {
                orderId: order.id,
                productId:d.productId,
                quantity:d.quantity,
                sellingPrice:d.mproduct.sellingPrice,
                price:0
            }
            totalQuantity += (d.quantity);
            if(d.mproduct.discount>0) ob.price = (d.mproduct.sellingPrice) - ((d.mproduct.sellingPrice)*d.mproduct.discount)/100
            else ob.price = (d.mproduct.sellingPrice)
            ob.price = Math.floor(ob.price)
            Items.push(ob);

            if(ii == 0 ) product_names +=d.mproduct.productName;
            else product_names += ','+d.mproduct.productName;
            ii++;

        }
        await Noti.create({
            userId:0,
            orderId:order.id,
            title: `Order #PX${order.id} is Order Placed`,
            msg: `Order #PX${order.id} is Order Placed`,
            type : "order",
            seen : 0,
        })
        await OrderDetail.createMany(Items);
        await Cart.query().where('userId',user.id).delete();

        let ssldata = {};
        let bkash_data = {};
        if(data.paymentType == "sslcommerz"){
            ssldata = await this.sslPayment(order,user);

            await Order.query().where('id',order.id).update({
                sessionkey: ssldata.sessionkey
            })
        }
        else if(data.paymentType == "Bkash"){
            let all_bkash_data = await this.payWithBkash(order,user);

            await Order.query().where('id',order.id).update({
                sessionkey: all_bkash_data.paymentIntent.paymentID,
                bkashJson: JSON.stringify(all_bkash_data)
            })

            bkash_data = {
                bkashURL:all_bkash_data.paymentIntent.bkashURL
            }
        }

        let message =`  We have received your order. Order no (PX${order.id}); Our support team will contact you soon to confirm the order.For any kind of query please call: ${this.contactNumber()}.Dreams Gallery`;
        if(data.paymentType == "sslcommerz"){
             message = `We have received your order. Order no (PX${order.id}); You are requested to proceed for online payment. For any kind of query please call: ${this.contactNumber()}. Dreams Gallery`;
        }
        let dataObj = {
            number:order.contact,
            username:'01619672554',
            password:'Nokia6300',
            message:message,
        }
        var options = {
            'method': 'POST',
            'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

          SRequst(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });
        // curl
        // .setBody(dataObj)
        // .post('http://66.45.237.70/api.php')
        // .then(({statusCode, body, headers}) => {
        //     console.log(statusCode, body, headers)
        // })
        // .catch((e) => {
        //     console.log(e);
        // });
        let paidAmdount  =  0;
        // paidAmdount = parseInt(paidAmdount) + parseInt( order.dgAmount)
        // let paidAmdount  =  data.paymentType == 'sslcommerz' ? (order.grandTotal-order.dgAmount) : 0;
        let reference_id = "";
        if(order.referralCode) {
            let ref = await Customer.query().where('barcode',order.referralCode).pluck('id')
            reference_id = ref[0];
        }
        let customer_id = await Customer.query().where('userId',user.id).pluck('id')
        let saleData = {
            bonusAmount: data.dgAmount,
            roundAmount: order.roundAmount,
            paidAmount: paidAmdount,
            cashPaid: paidAmdount,
            customer_id : customer_id[0],
            date : this.datefixed(order.created_at),
            discount : order.discount,
            homeDeliveryAmount : order.shippingPrice,
            homeDelivery:true,
            reference_id: reference_id,
            subQuantity:0,
            subTotal:order.totalSellingPrice,
            supplier_id:'',
            id:order.id,
            totalPrice:order.subTotal,
            total:order.grandTotal,
            totalQuantity:totalQuantity,
            type:'sell',
            productDetails: cartItems,
            'refferalDiscount' : order.refferalDiscount,
            'membershipDiscount' : order.membershipDiscount,
            'promoDiscount' : order.promoDiscount,
            'roundingDiscount' : order.roundAmount,
            'refferalDiscountAmount' : order.refferalDiscountAmount,
            'membershipDiscountAmount' : order.membershipDiscountAmount,
            'promoDiscountAmount' : order.promoDiscountAmount,

        };
        this.saleOrder(saleData,date);


        return response.status(200).json({
            'success': true,
            'message': 'Order  Successfully created ! ',
            "order": order,
            "ssldata": ssldata,
            "bkash_data": bkash_data,
          })
    }
    async storeAppOrder({request,response, auth}){
        let data = request.all();
        let user = await auth.getUser();
        data.userId = user.id;
        let cartItems = data.cartItems;
        let zoneId = data.zoneId;
        const date = data.date;
        delete data.cartItems;
        delete data.date;
        delete data.zoneId;

        let checkProductStockvar = await this.checkProductStock(cartItems);
        if(checkProductStockvar.next == false){
            return response.status(422).json({
                'success': false,
                'message': checkProductStockvar.item.mproduct.productName + " product quantity is stock out!",

              })
        }
        let order = await Order.create(data);
        order = order.toJSON();


        if(data.giftVoucherAmount>0){
            await GiftVoucher.query().where('code',data.giftVoucherCode).delete()
        }
        await Customer.query().where('userId',user.id).update({
            address: data.billingAddress,
            postCode: data.postCode,
            zone: data.billingCity,
            customerName: data.name,
            zoneId: zoneId,
        })
        await User.query().where('id',user.id).update({
            name: data.name,
        });
        let Items = [];
        let product_names = '';
        let totalQuantity = 0;
        let ii = 0;
        for(let d of cartItems){
            let ob = {
                orderId: order.id,
                productId:d.productId,
                quantity:d.quantity,
                sellingPrice:d.mproduct.sellingPrice,
                price:0
            }
            totalQuantity += parseInt(d.quantity);
            if(d.mproduct.discount>0) ob.price = parseInt(d.mproduct.sellingPrice) - (parseInt(d.mproduct.sellingPrice)*d.mproduct.discount)/100
            else ob.price = parseInt(d.mproduct.sellingPrice)
            Items.push(ob);

            if(ii == 0 ) product_names +=d.mproduct.productName;
            else product_names += ','+d.mproduct.productName;
            ii++;

        }
        await Noti.create({
            userId:0,
            orderId:order.id,
            title: `Order #PX${order.id} is Order Placed`,
            msg: `Order #PX${order.id} is Order Placed`,
            type : "order",
            seen : 0,
        })
        await OrderDetail.createMany(Items);
        await Cart.query().where('userId',user.id).delete();

        let ssldata = {};
        let bkash_data = {};
        if(data.paymentType == "sslcommerz"){
            // ssldata = await this.sslPayment(order,user);

            // await Order.query().where('id',order.id).update({
            //     sessionkey: ssldata.sessionkey
            // })
        }
        else if(data.paymentType == "Bkash"){
            let all_bkash_data = await this.payWithBkash(order,user);

            await Order.query().where('id',order.id).update({
                sessionkey: all_bkash_data.paymentIntent.paymentID,
                bkashJson: JSON.stringify(all_bkash_data)
            })

            bkash_data = {
                bkashURL:all_bkash_data.paymentIntent.bkashURL
            }
        }

        let message =`  We have received your order. Order no (PX${order.id}); Our support team will contact you soon to confirm the order.For any kind of query please call: ${this.contactNumber()}.Dreams Gallery`;
        if(data.paymentType == "sslcommerz"){
             message = `We have received your order. Order no (PX${order.id}); You are requested to proceed for online payment. For any kind of query please call: ${this.contactNumber()}. Dreams Gallery`;
        }
        let dataObj = {
            number:order.contact,
            username:'01619672554',
            password:'Nokia6300',
            message:message,
        }
        var options = {
            'method': 'POST',
            'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

          SRequst(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });
        // curl
        // .setBody(dataObj)
        // .post('http://66.45.237.70/api.php')
        // .then(({statusCode, body, headers}) => {
        //     console.log(statusCode, body, headers)
        // })
        // .catch((e) => {
        //     console.log(e);
        // });
        let paidAmdount  =  0;
        // paidAmdount = parseInt(paidAmdount) + parseInt( order.dgAmount)
        // let paidAmdount  =  data.paymentType == 'sslcommerz' ? (order.grandTotal-order.dgAmount) : 0;
        let reference_id = "";
        if(order.referralCode) {
            let ref = await Customer.query().where('barcode',order.referralCode).pluck('id')
            reference_id = ref[0];
        }
        let customer_id = await Customer.query().where('userId',user.id).pluck('id')
        let saleData = {
            bonusAmount: data.dgAmount,
            roundAmount: order.roundAmount,
            paidAmount: paidAmdount,
            cashPaid: paidAmdount,
            customer_id : customer_id[0],
            date : this.datefixed(order.created_at),
            discount : order.discount,
            homeDeliveryAmount : order.shippingPrice,
            homeDelivery:true,
            reference_id: reference_id,
            subQuantity:0,
            subTotal:order.totalSellingPrice,
            supplier_id:'',
            id:order.id,
            totalPrice:order.subTotal,
            total:order.grandTotal,
            totalQuantity:totalQuantity,
            type:'sell',
            'refferalDiscount' : order.refferalDiscount ? order.refferalDiscount : 0,
            'membershipDiscount' : order.membershipDiscount ? order.membershipDiscount : 0,
            'promoDiscount' : order.promoDiscount ? order.promoDiscount : 0,
            'roundingDiscount' : order.roundAmount ? order.roundAmount : 0,
            'refferalDiscountAmount' : order.refferalDiscountAmount ? order.refferalDiscountAmount : 0,
            'membershipDiscountAmount' : order.membershipDiscountAmount ? order.membershipDiscountAmount : 0,
            'promoDiscountAmount' : order.promoDiscountAmount ? order.promoDiscountAmount : 0,
            productDetails: cartItems

        };
        this.saleOrder(saleData,date);


        return response.status(200).json({
            'success': true,
            'message': 'Order  Successfully created ! ',
            "order": order,
            "ssldata": ssldata,
            "bkash_data": bkash_data,
          })
    }
    async updateSSL({request,response, auth}){

        let data = request.all();
       return await Order.query().where('id',data.id).update({
                sessionkey: data.sessionkey
            })
    }
    async showOrder({request,response, auth}){
        let isApp =  request.input('isApp')
        let user = await auth.getUser();
        if(isApp){
            let limit =  request.input('limit') ? request.input('limit') : 10;
            let status =  request.input('status')
            let apporder =  Order.query().where('userId',user.id).with('orderdetails.product').limit(limit);
            if(status) apporder.where('status',status)
            let order = await apporder.orderBy('id','desc').fetch();
            order = order.toJSON();
            for(let d of order){
                d.bkashJson = JSON.parse(d.bkashJson)
            }
            return response.status(200).json({
                'success': true,
                'message': 'Showing order for Auth User  ! ',
                "order": order,
              })
        }

        let page =  request.input('page') ? request.input('page') : 1
        let order = await Order.query().where('userId',user.id).with('orderdetails.product').orderBy('id','desc').paginate(page,10);
        order = order.toJSON();
        for(let d of order.data){
            d.bkashJson = JSON.parse(d.bkashJson)
        }
        return response.status(200).json({
            'success': true,
            'message': 'Showing order for Auth User  ! ',
            "order": order,
          })
    }
    async payNow({request,response, auth}){
        let order = request.all();
        let user = await auth.getUser();
        let ssldata = await this.sslPayment(order,user);
        await Order.query().where('id',order.id).update({
            sessionkey: ssldata.sessionkey
        })
        return response.status(200).json({
            'success': true,
            "ssldata": ssldata,
          })
    }
    async clearPayment({request,response, auth}){
        let data = request.all();
        if(data.status == 'VALID'){
            // let query_url = `?store_id:${store_id}&store_passwd:${store_passwd}&val_id=${data.val_id}&format=json`;
            let validation_url ='https://securepay.sslcommerz.com/validator/api/validationserverAPI.php';
            // validation_url = validation_url + query_url;
            console.log('validation_url in validation');
            console.log(validation_url);
            let validation_data = {
                "status": "INVALID_TRANSACTION",
            }
            await axios.get(validation_url,{
                params: {
                    "val_id": data.val_id,
                    'store_id': store_id,
                    'store_passwd': store_passwd,
                }
            })
            .then(function (response) {
                // handle success
                console.log('handle success');
                console.log(response);
                validation_data = response.data;


            })
            .catch(function (error) {
                // handle error
                console.log('handle error');
                console.log(error);
            })
            if(validation_data.status == 'VALID' || validation_data.status == "VALIDATED"){
                let date =  moment().tz("Asia/Dhaka").format('YYYY-MM-DD');
                let user =  await Order.query().where('id',data.value_a).with('user.customer').first()
                user = user.toJSON();

                let payment = await Payment.create({
                    'admin_id' : 1,
                    'uid' :  user.user.customer.id,
                    'invoice_id' :user.invoice_id,
                    'type' : 'incoming',
                    'paidAmount' :  user.grandTotal-user.dgAmount,
                    'date' : date,
                });



               let  paymentSheet = await Paymentsheet.create({
                    'admin_id' : 1,
                    'invoice_id' : user.invoice_id,
                    'type' : 'dueIncoming',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                    'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                    'uid' : user.user.customer.id,
                    'amount' : user.grandTotal-user.dgAmount,
                    'paymentMethod' : 'cash',
                    'remarks' : 'Sell To Customer',
                    'date' : date,
                })


                await Order.query().where('id',data.value_a).update({
                    paymentStatus:'Paid',
                    status:'Processing'

                })
                // user = user.toJSON();
                // let amount = user.grandTotal - user.dgAmount;
                // amount += parseFloat(user.shippingPrice)
                // amount -= parseFloat(user.giftVoucherAmount);
                let message =`  Tk. ${data.amount}  payment received for order no. PX${data.value_a}. Thank you for staying with Dreams Gallery.`;
                let dataObj = {
                    number:user.user.contact,
                    username:'01619672554',
                    password:'Nokia6300',
                    message:message,
                }
                var options = {
                    'method': 'POST',
                    'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
                    'headers': {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  };

                  SRequst(options, function (error, response) {
                    if (error) throw new Error(error);
                    console.log(response.body);
                  });
                // curl
                // .setBody(dataObj)
                // .post('http://66.45.237.70/api.php')
                // .then(({statusCode, body, headers}) => {
                //     console.log('statusCode, body, headers')
                //     console.log(statusCode, body, headers)
                // })
                // .catch((e) => {
                //     console.log(e);
                // });
                message =`Your Dreams Gallery order (#PX${data.value_a}) has been approved. You will get the  product within 3-5 working days. Helpline: 09678120120 Dreams Gallery`;

                dataObj = {
                    number:user.user.contact,
                    username:'01619672554',
                    password:'Nokia6300',
                    message:message,
                }
                 options = {
                    'method': 'POST',
                    'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
                    'headers': {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  };

                  SRequst(options, function (error, response) {
                    if (error) throw new Error(error);
                    console.log(response.body);
                  });
                // curl
                // .setBody(dataObj)
                // .post('http://66.45.237.70/api.php')
                // .then(({statusCode, body, headers}) => {
                //     console.log('statusCode, body, headers')
                //     console.log(statusCode, body, headers)
                // })
                // .catch((e) => {
                //     console.log(e);
                // });
            }

        }

        return response.status(200).json({
            'success': true,
          })
    }
    async test_clearPayment({response,params}){
        let user =  await Order.query().where('id',params.id).with('user').first()
        user = user.toJSON();
        let message =`  Tk. ${user.grandTotal}  payment received for order no. PX${params.id}. Thank you for staying with Dreams Gallery.`;
        let dataObj = {
            number:user.user.contact,
            username:'01619672554',
            password:'Nokia6300',
            message:message,
        }

        var options = {
            'method': 'POST',
            'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

          SRequst(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });

        // curl
        // .setBody(dataObj)
        // .post('http://66.45.237.70/api.php')
        // .then(({statusCode, body, headers}) => {
        //     console.log('statusCode, body, headers')
        //     console.log(statusCode, body, headers)
        // })
        // .catch((e) => {
        //     console.log(e);
        // });
        return response.status(200).json({
            'success': true,
          })
    }
    async sslValidation(ssldata){
        console.log('sslValidation')
        let query_url = `?store_id:${store_id}&store_passwd:${store_passwd}&val_id=${ssldata.val_id}&format=json`
        let dataObj = {

            store_id: store_id,
            store_passwd: store_passwd,
            val_id:ssldata.val_id,
            format:'json',
        };

        let validation_url = (ssl_live == true)? 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php' : 'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php';
        validation_url = validation_url + query_url;
        console.log('validation_url in validation');
        console.log(validation_url);
        axios.get(validation_url)
            .then(function (response) {
                // handle success
                console.log('handle success');
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log('handle error');
                console.log(error);
            })


        // curl
        // .setBody(dataObj)
        // .post(validation_url)
        // .then(({statusCode, body, headers}) => {
        //     console.log('validation_url')
        //     console.log('statusCode, body, headers')
        //     console.log(statusCode, body, headers)
        // })
        // .catch((e) => {
        //     console.log(e);
        // });

        return validation_url;
    }
    async cancelOrder({request,response, auth}){
        let user = await auth.getUser();
        let data = request.all();
        console.log(data);
        let order = await Order.query().where('id',data.id).update({
            status:'Canceled'
        })
        await this.saleInvoiceDestroy(data.invoice_id);
        return response.status(200).json({
            'success': true,
            'message': 'Update Order! ',
            "order": order,
          })
    }
    async sslPayment(data,user){
        let order = await Order.query().where('id',data.id).with('orderdetails.product').with('user.customer').first()
        // let user = order.user;
        let amount = data.grandTotal - data.dgAmount;
        amount += parseFloat(data.shippingPrice)
        amount -= parseFloat(data.giftVoucherAmount);
        console.log("Store Id",store_id);
        console.log("store_passwd",store_passwd);
        console.log("ssl_live",ssl_live);
            let test = await  new SSLCommerzPayment({
                store_id: store_id,
                store_passwd: store_passwd,
                total_amount: amount,
                currency: 'BDT',
                tran_id: `PX#${data.id}`,
                success_url: `${url}/ssl-payment/${data.id}`,
                fail_url: `${url}/failed-payment`,
                cancel_url: `${url}/cancel-payment`,
                ipn_url: `${url}/app/clearPayment`,
                shipping_method:'Courier',
                product_name:'names',
                product_category:'general',
                product_profile:'general',
                cus_name: user.name,
                cus_email: user.email,
                cus_add1: data.billingAddress,
                cus_city: data.billingCity,
                cus_country: 'Bangladesh',
                cus_phone: data.contact,
                num_of_item: order.orderdetails.length,
                ship_name: data.billingAddress,
                ship_add1: data.billingAddress,
                ship_city: data.billingCity,
                ship_postcode: data.postCode ,
                ship_country: 'Bangladesh',
                value_a: order.id,
            }, ssl_live);
            console.log("SSL data");
            console.log(test);
            return test;


    }


    // Sale
    async saleOrder(input,date){
        let admin_id = 1;
        let setting = await Setting.query().where('id',1).first();
        setting = setting.toJSON();
        let paidAmount = input.paidAmount;
        let invoice = await Invoice.create({
            'admin_id' : admin_id,
            'type' : 'sell',
            'totalQuantity' : input.totalQuantity,
            'totalPrice' : input.totalPrice,
            'subTotal' : input.subTotal,
            'customer_id' : input.customer_id,
            'discount' : input.discount,
            'sellingPrice' : input.total,
            'paidAmount' : input.paidAmount,
            'bonusAmount' : input.bonusAmount,
            'homeDeliveryAmount' : input.homeDeliveryAmount,
            'homeDelivery' : input.homeDelivery,
            'refferalDiscount' : input.refferalDiscount,
            'membershipDiscount' : input.membershipDiscount,
            'promoDiscount' : input.promoDiscount,
            'roundingDiscount' : input.roundingDiscount,
            'refferalDiscountAmount' : input.refferalDiscountAmount,
            'membershipDiscountAmount' : input.membershipDiscountAmount,
            'promoDiscountAmount' : input.promoDiscountAmount,

            'date' : date,
        });
        invoice = invoice.toJSON();
        await Order.query().where('id',input.id).update({
            'invoice_id':invoice.id
        })
        let payment = await Payment.create({
            'admin_id' : admin_id,
            'uid' : input.customer_id,
            'invoice_id' : invoice.id,
            'type' : 'incoming',
            'paidAmount' : input.paidAmount,
            'date' : date,
        });
        if(input.total == input.paidAmount){
            let paymentSheet = await Paymentsheet.create({

                'admin_id': admin_id,
                'invoice_id': invoice.id,
                'type': 'due',// incoming is profit, outgoing expense, due: due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid': input.customer_id,
                'amount': (input.total+input.bonusAmount)*-1,
                'paymentMethod': 'cash',
                'remarks': 'Sell To Customer',
                'date': date,
            });
            paymentSheet = await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'dueIncoming',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : input.total+input.bonusAmount,
                'paymentMethod' : 'cash',
                'remarks' : 'Sell To Customer',
                'date' : date,
            })
        } else {
            let paymentSheet = await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'due',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : input.total*-1,
                'paymentMethod' : 'due',
                'remarks' : 'Sell To Customer',
                'date' : date,
            })
            let due = input.total  - paidAmount;
            if(paidAmount){
                paymentSheet = await Paymentsheet.create({
                    'admin_id' : admin_id,
                    'invoice_id' : invoice.id,
                    'type' : 'dueIncoming',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                    'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                    'uid' : input.customer_id,
                    'amount' : paidAmount,
                    'paymentMethod' : 'cash',
                    'remarks' : 'Advance Cash on Sale To Customer',
                    'date' : date,
                })
            }
        }
        // if(input.discount){
        //     await Paymentsheet.create({
        //         'admin_id' : admin_id,
        //         'invoice_id' : invoice.id,
        //         'type' : 'discount',// incoming is profit, outgoing expense, due : due for supplier , due for customer
        //         'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
        //         'uid' : input.customer_id,
        //         'amount' : ((input.subTotal*input.discount/100)+input.roundAmount)*-1,
        //         'paymentMethod' : 'cash',
        //         'remarks' : 'Discount To Customer',
        //         'date' : date,
        //     })
        // }
        if(input.refferalDiscount){
            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'discount',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (input.refferalDiscountAmount)*-1,
                'paymentMethod' : 'cash',
                'remarks' : 'Refereral Discount To Customer',
                'date' : date,
            })
        }
        if(input.roundingDiscount){
            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'discount',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (input.roundingDiscount)*-1,
                'paymentMethod' : 'cash',
                'remarks' : 'Rounding Discount To Customer',
                'date' : date,
            })
        }
        if(input.membershipDiscount){
            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'discount',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (input.membershipDiscountAmount)*-1,
                'paymentMethod' : 'cash',
                'remarks' : 'Membership Discount To Customer',
                'date' : date,
            })
        }
        if(input.promoDiscount){
            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'discount',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (input.promoDiscountAmount)*-1,
                'paymentMethod' : 'cash',
                'remarks' : 'Promo Code Discount To Customer',
                'date' : date,
            })
        }
        if(input.bonusAmount>0){
            let bonust_sheet = await Payment.create({
                'admin_id' : admin_id,
                'uid' : input.customer_id,
                'invoice_id' : invoice.id,
                'type' : 'incoming',
                'paidAmount' : input.bonusAmount,
                'date' : date,
            });

            bonust_sheet = bonust_sheet.toJSON();
            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'payment_id' : bonust_sheet.id,
                'type' : 'dueIncoming',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (input.bonusAmount),
                'paymentMethod' : 'cash',
                'remarks' : 'DG Payment',
                'date' : date,
            })

            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'bonus',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (input.bonusAmount)*(-1),
                'paymentMethod' : 'cash',
                'remarks' : 'Customer Bonus Payment',
                'date' : date,
            })

            await Bonus.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'customer_id' : input.customer_id,
                'amount' : (input.bonusAmount)*(-1),
                'type' : 'withdraw',
                'bonusBy' : 0,
                'date' : date,
            })

        }

        if(input.reference_id && input.customer_id){
            await Bonus.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'customer_id' : input.reference_id,
                'amount' : (input.totalPrice*setting.refererBonus)/100,
                'type' : 'gift',
                'bonusBy' : input.customer_id,
                'date' : date,
            })
        }
        let discountFlag = false;
        let productDiscount = 0;
        for(let value of input.productDetails){
            if(!value.mproduct.discount) value.mproduct.discount = 0;
            else {
                discountFlag = true;
                productDiscount += parseFloat(((value.mproduct.sellingPrice*value.mproduct.discount)/100));
            }
            let stock = value.quantity;
            let product_id = value.productId;
            let mproduct_id = value.mproductId;
            await Product.query().where('id',product_id).update({
                'stock' : Database.raw(`stock - ${stock}`)
            });
            await MainProduct.query().where('id',mproduct_id).update({
                'stock' : Database.raw(`stock - ${stock}`)
            });

            let profit = value.mproduct.sellingPrice - value.vproduct.averageBuyingPrice;
            await Selling.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'product_id' : value.productId,
                'quantity' : value.quantity,
                'unitPrice' : value.mproduct.sellingPrice,
                'discount' : value.mproduct.discount,
                'profit' : profit,
                'date' : date,
            })
        }
        if(discountFlag){
            await Paymentsheet.create({
                'admin_id' : admin_id,
                'invoice_id' : invoice.id,
                'type' : 'discount',// incoming is profit, outgoing expense, due : due for supplier , due for customer
                'paymentFor': 'customer',//  customer mean, I am selling to customer, supllier mean buying from suplier
                'uid' : input.customer_id,
                'amount' : (productDiscount)*(-1),
                'paymentMethod' : 'cash',
                'remarks' : 'Product Discount To Customer',
                'date' : date,
            })
        }
        let data = await Invoice.query().where('type','sell').where('id',invoice.id).orderBy('id','desc').with('customer').first();
        return data;




    }

    async saleInvoiceDestroy(id){
        let destroy = await Invoice.query().where('id',id).first();
        let sellingProducts = await Selling.query().where('invoice_id',id).fetch();
        sellingProducts = sellingProducts.toJSON();
        for(let value of sellingProducts ){
            let stock = value.quantity;
            let product_id = value.product_id;
            await Product.query().where('id',product_id).update({
                'stock' : Database.raw(`stock + ${stock}`)
            });
            let mp = await Product.query().where('id',product_id).first();
            mp = mp.toJSON();
            await MainProduct.query().where('id',mp.mproductId).update({
                'stock' : Database.raw(`stock + ${stock}`)
            });
        }
        let payment_ids = await Payment.query().where('invoice_id',id).pluck('id')
        await Promise.all([

            Selling.query().where('invoice_id',id).delete(),
            Paymentsheet.query().where('invoice_id',id).delete(),
            Payment.query().where('invoice_id',id).delete(),
            Paymentsheet.query().whereIn('payment_id',payment_ids).delete(),
            Bonus.query().where('invoice_id',id).delete(),
            Invoice.query().where('id',id).delete(),
        ])
        return;


    }

    // helper methods
    datefixed(value){
        // let value = '2020-10-08 11:38:34'
        let d = new Date(value);
        let monthNumber = d.getMonth()+1
        monthNumber = ("0" + monthNumber).slice(-2);
        let dayNumber = d.getDate()
        dayNumber = ("0" + dayNumber).slice(-2);
        let today = `${d.getFullYear()}-${monthNumber}-${dayNumber}`
        return today


    }

    async test(){
        return moment().tz("Asia/Dhaka").format('YYYY-MM-DD')
    }

    async SSL_TEST(val_id){

        let validation_url = 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php' ;
        // let value = '2020-10-08 11:38:34'
        let data  = null
        axios.get(validation_url,{
            params: {
                "val_id": val_id,
                'store_id': store_id,
                'store_passwd': store_passwd,
            }
        })
            .then(function (response) {
                // handle success
                console.log('handle success');
                console.log(response);
                data = response.data;
            })
            .catch(function (error) {
                // handle error
                console.log('handle error');
                console.log(error);
            })

            return data;
    }
    async payWithBkash(order,user){
        let credentials = {
            username: BKASH_USERNAME,
            password: BKASH_PASS,
            tokenize_app_key:BKASH_APP_KEY,
            tokenize_app_secret:BKASH_APP_SECRET
        }
        let tokenData = await this.grantBkashToken(credentials);
        // let paymentIntent = await this.createPaymentIntent(tokenData.data,credentials,order,user);
        let paymentIntent = await this.createAgreementIntent(tokenData.data,credentials,order,user);

        return {
            'success': paymentIntent.success,
            'paymentIntent': paymentIntent.data,
            'tokenData': tokenData.data,
        }
    }
    async grantBkashToken(credentials){

        const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant';
        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            username: credentials.username,
            password: credentials.password,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            app_key: credentials.tokenize_app_key,
            app_secret: credentials.tokenize_app_secret
        })
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('---------------------')
            // console.log(json)
            return {
                success:true,
                data:json
            }
        })
        .catch(err => {
            console.error('error:' + err)
            return {
                success:false,
                data:err
            }
        });
    }
    async createPaymentIntent(data,credentials,order,user){
        let amount = order.grandTotal - order.dgAmount;
        amount += parseFloat(order.shippingPrice)
        const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-APP-Key': credentials.tokenize_app_key,
                'Content-Type': 'application/json',
                Authorization:data.id_token
            },

            body: JSON.stringify({
                mode: BKASH_MODE,
                payerReference: '01770618575',
                callbackURL: BKASH_REDIRECT_URL,
                amount: amount,
                currency: 'BDT',
                intent: 'sale',
                merchantInvoiceNumber: `PXX${order.id}`,
                // agreementID: `PXX${order.id}`,
            })
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('---------------------')
            // console.log(json)
            return {
                success:true,
                data:json
            }
        })
        .catch(err => {
            console.error('error:' + err)
            return {
                success:false,
                data:err
            }
        });
    }
    async createAgreementIntent(data,credentials,order,user){
        let amount = order.grandTotal - order.dgAmount;
        amount += parseFloat(order.shippingPrice)
        const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-APP-Key': credentials.tokenize_app_key,
                'Content-Type': 'application/json',
                Authorization:data.id_token
            },

            body: JSON.stringify({
                mode: BKASH_MODE,
                payerReference: '01770618575',
                callbackURL: BASE_URL+"/bkash-agreement-status",
                // amount: amount,
                // currency: 'BDT',
                // intent: 'sale',
                // merchantInvoiceNumber: `PXX${order.id}`,
                // agreementID: `PXX${order.id}`,
            })
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('---------------------')
            // console.log(json)
            return {
                success:true,
                data:json
            }
        })
        .catch(err => {
            console.error('error:' + err)
            return {
                success:false,
                data:err
            }
        });
    }
    async createAgreementPaymentIntent(data,credentials,order,agreementID){
        let amount = order.grandTotal - order.dgAmount;
        amount += parseFloat(order.shippingPrice)
        const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-APP-Key': credentials.tokenize_app_key,
                'Content-Type': 'application/json',
                Authorization:data.id_token
            },

            body: JSON.stringify({
                mode: '0001',
                payerReference: '01770618575',
                callbackURL: BASE_URL+"/bkash-status",
                amount: amount,
                currency: 'BDT',
                intent: 'sale',
                merchantInvoiceNumber: `PXX${order.id}`,
                agreementID: agreementID,
            })
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('---------------------')
            // console.log(json)
            return {
                success:true,
                data:json
            }
        })
        .catch(err => {
            console.error('error:' + err)
            return {
                success:false,
                data:err
            }
        });
    }
    async bkash_execute({response,request,params}){
        // var user = {}

        // try {
        //     user = await auth.getUser()
        // } catch (error) {
        //     return response.status(401).json({
        //         message: 'You are not authorized!'
        //     })
        // }


        let order = await Order.query().select('id','bkashJson','sessionkey','contact','grandTotal').where('sessionkey',params.id).where('paymentType','Bkash').first();
        // let order = await Order.query().select('id','bkashJson','sessionkey').where('id',897).where('paymentType','Bkash').first();
        order = order.toJSON();
        order.bkashJson = JSON.parse(order.bkashJson)
        let data = await this.bkash_payment_execute(order)

        console.log("----bkash_execute-----")
        console.log(data)

        if(data.data.statusCode == '0000'){
            order.bkashJson.bkash_agreementPayment_execute = data.data
            let tmp_bkash_agreementPayment_execute = JSON.stringify(order.bkashJson)
            await Order.query().where('sessionkey',params.id).where('paymentType','Bkash').update({
                paymentStatus:'Paid',
                status:'Processing',
                bkashJson:tmp_bkash_agreementPayment_execute
            });

            let message =`  Tk. ${order.grandTotal}  payment received for order no. PX${order.id}. Thank you for staying with Dreams Gallery.`;
                let dataObj = {
                    number:order.contact,
                    username:'01619672554',
                    password:'Nokia6300',
                    message:message,
                }
                var options = {
                    'method': 'POST',
                    'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
                    'headers': {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  };

                  SRequst(options, function (error, response) {
                    if (error) throw new Error(error);
                    console.log(response.body);
                  });

                  return response.status(200).json({
                    'success': data.success,
                    "data": data.data,
                  })
        }



        return response.status(401).json({
            'success': false,
            "data": data.data,
          })



    }
    async bkash_agreement_execute({response,request,params}){
        // var user = {}

        // try {
        //     user = await auth.getUser()
        // } catch (error) {
        //     return response.status(401).json({
        //         message: 'You are not authorized!'
        //     })
        // }

        let credentials = {
            username: BKASH_USERNAME,
            password: BKASH_PASS,
            tokenize_app_key:BKASH_APP_KEY,
            tokenize_app_secret:BKASH_APP_SECRET
        }


        let order = await Order.query().select('id','bkashJson','sessionkey','contact','grandTotal','dgAmount','userId','shippingPrice').where('sessionkey',params.id).where('paymentType','Bkash').first();
        // let order = await Order.query().select('id','bkashJson','sessionkey').where('id',897).where('paymentType','Bkash').first();
        order = order.toJSON();
        order.bkashJson = JSON.parse(order.bkashJson)
        let data = await this.bkash_agreement_payment_execute(order)

        order.bkashJson.agreement_execute_data = data.data

        console.log("----agreement_execute_data-----")
        console.log(data)

        if(data.data.statusCode == '0000'){
            let tempBkashJsonData =  JSON.stringify(order.bkashJson)
            await Order.query().where('id',order.id).update({
                bkashJson:tempBkashJsonData,
            });
            await User.query().where('id',order.userId).update({
                bkashAgreementid:data.data.agreementID,
            });
            let agreementPaymentTokenData = await this.grantBkashToken(credentials);
            let agreementPaymentIntent = await this.createAgreementPaymentIntent(agreementPaymentTokenData.data,credentials,order,data.data.agreementID)
            order.bkashJson.agreementPaymentTokenData = agreementPaymentTokenData.data
            order.bkashJson.agreementPaymentIntent = agreementPaymentIntent.data
            order.bkashJson = JSON.stringify(order.bkashJson)

            console.log("----agreementPaymentIntent-----")
            console.log(agreementPaymentIntent.data)



            await Order.query().where('id',order.id).update({

                bkashJson:order.bkashJson,
                sessionkey: agreementPaymentIntent.data.paymentID,
            });

            return response.status(200).json({
                'success': data.success,
                "data": agreementPaymentIntent.data,
              })


        }
        else {

            return response.status(401).json({
                'success': false,
                "data": data,
              })
        }






    }
    async bkash_agreement_payment_execute(order){
        let credentials = {
            username: BKASH_USERNAME,
            password: BKASH_PASS,
            tokenize_app_key:BKASH_APP_KEY,
            tokenize_app_secret:BKASH_APP_SECRET
        }
        const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-APP-Key': credentials.tokenize_app_key,
                'Content-Type': 'application/json',
                Authorization:order.bkashJson.tokenData.id_token
            },
            body: JSON.stringify({
                paymentID: order.sessionkey,
            })
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('---------------------')
            // console.log(json)
            return {
                success:true,
                data:json
            }
        })
        .catch(err => {
            console.error('error:' + err)
            return {
                success:false,
                data:err
            }
        });
    }
    async bkash_payment_execute(order){
        let credentials = {
            username: BKASH_USERNAME,
            password: BKASH_PASS,
            tokenize_app_key:BKASH_APP_KEY,
            tokenize_app_secret:BKASH_APP_SECRET
        }
        const url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-APP-Key': credentials.tokenize_app_key,
                'Content-Type': 'application/json',
                Authorization:order.bkashJson.tokenData.id_token
            },
            body: JSON.stringify({
                paymentID: order.sessionkey,
            })
        };

        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('---------------------')
            // console.log(json)
            return {
                success:true,
                data:json
            }
        })
        .catch(err => {
            console.error('error:' + err)
            return {
                success:false,
                data:err
            }
        });
    }

    async bkashCallback(){
        return "From bkash call back";
    }
    async bkash_test(){
        let credentials = {
            username: BKASH_USERNAME,
            password: BKASH_PASS,
            tokenize_app_key:BKASH_APP_KEY,
            tokenize_app_secret:BKASH_APP_SECRET
        }

        return credentials;
    }
}

module.exports = OrderController


// amount: '12.00',
// bank_tran_id: 'NG37782020112965316',
// base_fair: '0.00',
// card_brand: 'MOBILEBANKING',
// card_issuer: 'Nagad',
// card_issuer_country: 'Bangladesh',
// card_issuer_country_code: 'BD',
// card_no: 'N016****9844',
// card_sub_brand: 'MB',
// card_type: 'NAGAD-Nagad',
// currency: 'BDT',
// currency_amount: '12.00',
// currency_rate: '1.0000',
// currency_type: 'BDT',
// error: '',
// risk_level: '0',
// risk_title: 'Safe',
// status: 'VALID',
// store_amount: '11.70',
// store_id: 'dreamsgallerybdlive',
// tran_date: '2020-11-29 20:07:54',
// tran_id: 'PX#109',
// val_id: '2011292008584643012294c7b2a',
// value_a: '109',
// value_b: '',
// value_c: '',
// value_d: '',
// verify_sign_sha2: 'aab44a8a0a0b4ff3e7699a189ec115842bbcd45146acf99ea23fc932f32a6e35',
// verify_sign: '8d1cdfcfe9b855d75b93638dc2e07c41',
