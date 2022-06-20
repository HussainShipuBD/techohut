'use strict'
const User = use('App/Models/User')
const Wishlist = use('App/Models/Wishlist')
const Noti = use('App/Models/Noti')
const Customer = use('App/Models/Customer')
const Reservation = use('App/Models/Reservation')
const Contactus = use('App/Models/Contactus')
const Paymentsheet = use('App/Models/Paymentsheet')
const Bonus = use('App/Models/Bonus')
const Order = use('App/Models/Order')
const Hash = use('Hash')
const Database = use('Database')
const randomToken = require('random-token').create('0123456789');
const uniqid = require('uniqid');
const SRequst = require('request');
const { validate } = use('Validator')
class UserController {
  contactNumber (){
    return "+8801309606092";
  }
    async register({request, auth, response}) {
        const data = request.all()
        let regex = /^[0][1][3-9][0-9]{8}$/;
        if (!regex.test(data.contact)) {
          return response.status(401).json({
            'success': false,
            'message': 'Invalid Contact Number ',
          })

        }




          data.userType = 'Customer'
          let user = await User.create(request.all())
          if(user){
            await auth.attempt(data.contact, data.password)
            let oldCustomer = await Customer.query().where('contact',data.contact).where('userId',0).first()
            if(oldCustomer){
              await Customer.query().where('contact',data.contact).where('userId',0).update({
                userId:user.id,
                email:user.email
              })
            }
            else{
                let customer = await Customer.create({
                  userId:user.id,
                  customerName:data.name,
                  contact:data.contact,
                  email:data.email,
              })
            }

            let aUser = await User.query().where('id',user.id).with('customer').first()
            // let dataObj = {
            //   number:aUser.contact,
            //   username:'01745907284',
            //   password:'5T2CZEWS',
            //   message:`Welcome to our DG family! Thanks for signing up in Dreams Gallery. We will provide you the best service and products at all times. We hope that you will continue supporting our products and services.
            //   Happy shopping! Dreams Galllery .Call - 8801611141115`,
            // }
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
            var token = randomToken(4);
            let d = {
              token: token
            }

            let dataObj = {
              number:data.contact,
              username:'01745907284',
              password:'5T2CZEWS',
              message:'Your techohut.com OTP is '+token,
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
            await Database.table('password_resets').where('email', data.contact).delete()
            await Database.table('password_resets').insert({email: data.contact ,token: d.token})
            // let accessToken = await auth.generate(user)
            return response.status(200).json({
                'success': true,
                'message': 'Registration Successful! ',
                "user": aUser,
                // "token": accessToken.token
            })
          }
          return response.status(401).json({
            'success': false,
            'message': 'Registration failed! ',
          })

    }
    // async storeCustomer({request, auth, response}) {

    //     let formatCustomerData = [];
    //     for(let d of allCustomer){
    //       let ob= {
    //         "id": d.id,
    //         "userId": 0,
    //         "customerName": d.customerName,
    //         "address": d.address  ? d.address : null,
    //         "contact": d.contact ,
    //         "email": d.email ? d.email : null,
    //         "facebook": d.facebook ,
    //         "instagram": d.instagram ,
    //         "barcode": d.barcode ? d.barcode : null,
    //         "postCode": d.postCode ? d.postCode : null,
    //       }

    //       formatCustomerData.push(ob);
    //     }

    //     await Customer.createMany(formatCustomerData);
    //     return response.status(401).json({
    //       'success': false,
    //       'message': 'Registration successful! ',
    //     })

    // }
    async sendActivationCode({request, auth, response}) {
        const data = request.all()

            var token = randomToken(4);
            let d = {
              token: token
            }

            let check_otp_count =  await User.query().where('contact',data.contact).select('otp_count').first();
            if(check_otp_count.otp_count >= 3){
              return response.status(422).json({
                'success': false,
                'message': 'OTP Has been Locked! For more Information please call :  '+this.contactNumber(),
              })
            }

            let dataObj = {
              number:data.contact,
              username:'01745907284',
              password:'5T2CZEWS',
              message:'Your techohut.com OTP is '+token,
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

            await User.query().where('contact',data.contact).update({
              'otp_count' : Database.raw('otp_count + 1')
            })
            await Database.table('password_resets').where('email', data.contact).delete()
            await Database.table('password_resets').insert({email: data.contact ,token: d.token})
            // let accessToken = await auth.generate(user)
            return response.status(200).json({
                'success': true,
                'message': 'A varification token send to your contact number! ',
            })



      }

      async login({request, auth, response}) {
        const contact = request.input("contact")
        const password = request.input("password");

        try {
          if (await auth.attempt(contact, password)) {
            const user = await User.query().where('contact',contact).with('customer').first()
            if(user.isActive == 0){
              var token = randomToken(4);
              let d = {
                token: token
              }

              let dataObj = {
                number:contact,
                username:'01745907284',
                password:'5T2CZEWS',
                message:'Your techohut.com OTP is '+token,
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

              await Database.table('password_resets').where('email', contact).delete()
              await Database.table('password_resets').insert({email: contact ,token: d.token})
              return response.status(402).json({
                'success': false,
                'message': 'Account varification required!'

              })
            }
            let accessToken = await auth.generate(user)


            return response.status(200).json({
              'success': true,
              'message': 'Login Successful ! ',
              "user": user,
              "token": accessToken.token
            })
          }
        } catch (error) {

          return response.status(401).json({
            'success': false,
            'message': 'Invalid Credentials',
          })

        }


        // try {


        // } catch (e) {
        //   return response.status(402).json({
        //     'success': false,
        //     'message': e,
        //   })
        // }

    }
    async updateUser({ request, response, auth }){
      let data = request.all();
      let customer=null;
      if(data.customer){

        customer = data.customer;
        delete data.customer;
      }
      const user = await auth.getUser()
      if(data.id !== user.id){
        return response.status(401).json({
          'success': false,
          'message': "You don't have authrization!",
        })
      }
      if(data.password){
        let password =  await Hash.make(data.password.password)
        let newuser =   await  User.query().setVisible(['id','password']).where('id',user.id).first()
        const isSame = await Hash.verify(data.password.oldPassword, newuser.password)
        if(!isSame){
          return response.status(401).json({
            'success': false,
            'message': 'Old password is incorrect.',
          })
        }
        delete data.password
        data.password = password

      }
      let uuser = await User.query().where('id',user.id).update(data);
      if(customer) await Customer.query().where('id',customer.id).update(customer);
      let aUser = await User.query().where('id',user.id).with('customer').first()
      return response.status(200).json({
        'success': true,
        'user': aUser,
        'message': "Profile Updated Successfully!",
      })
    }

    // WishList Methods
    async getCustomer({ request, response, auth }){

      const customer = await Customer.query().whereNot('id',1).fetch();
      return customer;
    }
    async showWishList({ request, response, auth }){
      let page = request.input('page') ? request.input('page') : 1
      const user = await auth.getUser();
      const wishlist = await Wishlist.query().with('product.allgroup').with('product.allcategory').with('product.allbrand').with('product.allImages').with('product.avgRating').where('userId',user.id).paginate(page,10)
      return response.status(200).json({
        'success': true,
        wishlist : wishlist,
      })
    }

    async storeWishList({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();
      const wishlist = await Wishlist.findOrCreate(
        { productId: data.id, userId: user.id }
      );
      return response.status(200).json({
        'success': true,
        wishlist : wishlist,
      })
    }
    async deleteWishlist({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();
      const wishlist = await Wishlist.query().where('id',data.id).where('userId',user.id).delete()
      return response.status(200).json({
        'success': true,
        wishlist : wishlist,
      })
    }
    // Pre-order Methods
    async showPreOrder({ request, response, auth }){
      let page = request.input('page') ? request.input('page') : 1
      const user = await auth.getUser();
      const reservation = await Reservation.query().with('product.mainproduct').where('customerId',user.id).paginate(page,10)
      return response.status(200).json({
        'success': true,
        reservation : reservation,
      })
    }

    async storePreOrder({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();
      const reservation = await Reservation.findOrCreate(
        { productId: data.id, customerId: user.id }
      );
      await Reservation.query().where('id',reservation.id).update({
        quantity: (Database.raw(`quantity + ${data.quantity}`)),
        status:'Pending',
      })
      return response.status(200).json({
        'success': true,
        reservation : reservation,
      })
    }
    async updatePreOrder({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();
      const reservation = await Reservation.query().where('id',data.id).where('customerId',user.id).update(data);
      return response.status(200).json({
        'success': true,
        reservation : reservation,
      })
    }

    async deletePreOrder({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();
      const reservation = await Reservation.query().where('id',data.id).where('customerId',user.id).delete()
      return response.status(200).json({
        'success': true,
        reservation : reservation,
      })
    }
    async storeContactus({ request, response }){
      let data = request.all()

      const contactus = await Contactus.create(data)
      return response.status(200).json({
        'success': true,
        contactus : contactus,
      })
    }


    // Password REset

    async sendResetMessage ({ request, response }) {
      let contact = request.all().contact
      const check = await User.query().where('contact', contact).getCount()
      // eslint-disable-next-line eqeqeq
      if (check == 0) {
        return response.status(404).json({
          'success': false,
          'message': "404  Number doesn't exist!."
        })
      }
      var token = randomToken(4);
      let data = {
        token: token
      }

      let dataObj = {
        number:contact,
        username:'01745907284',
        password:'5T2CZEWS',
        message:'Your techohut.com OTP is '+token,
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

      await Database.table('password_resets').where('email', contact).delete()
      await Database.table('password_resets').insert({email: contact ,token: data.token})
      return response.status(200).json({
        'success': true,
        'message': "A varification code is sent to your number."
      })
    }
    async getResetMessage ({ request, response }) {
      let data = request.all()
      const count = await Database.from('password_resets').where('email', data.email).where('token',data.token).count('* as total')

      const total = count[0].total
      // eslint-disable-next-line eqeqeq
      if (total == 0) {
        return response.status(404).json({
          'success': false,
          'message': "Invalid Code"
        })
      }
      return response.status(200).json({
        'success': true,
        'message': ""
      })
    }
    async activeAccount ({ request, response, auth }) {
      let data = request.all()
      const count = await Database.from('password_resets').where('email', data.email).where('token',data.token).count('* as total')

      const total = count[0].total
      // eslint-disable-next-line eqeqeq
      if (total == 0) {
        return response.status(404).json({
          'success': false,
          'message': "Invalid Code"
        })
      }

      await Database.table('password_resets').where('email', data.email).delete()
      await User.query().where('contact',data.email).update({'isActive':1});
      let user = await User.query().where('contact',data.email).with('customer').first()
      let accessToken = await auth.generate(user)
      let dataObj = {
        number:data.email,
        username:'01745907284',
        password:'5T2CZEWS',
        message:`Welcome to our Techohut family! Thanks for signing up in Techohut. We will provide you the best service and products at all times. We hope that you will continue supporting our products and services.Happy shopping! Techohut .Call - ${this.contactNumber()}`,
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
        'message': 'Login Successful ! ',
        "user": user,
        "token": accessToken.token
      })

    }

    async resetPassword ({  request, response, auth }) {
      const data = request.all()
      const count = await Database.from('password_resets').where('email', data.contact).where('token',data.token).count('* as total')

      const total = count[0].total
      // eslint-disable-next-line eqeqeq
      if (total == 0) {
        return response.status(404).json({
          'success': false,
          'message': "Request Timeout!"
        })
      }
      data.password = await Hash.make(data.password)



      let pdata = await User.query().where('contact', data.contact).update({password:data.password})
      return response.status(200).json({
        'success': true,
        'message': "Password Reset!"
      })
    }


    // Notification Methods

    async getNotiCount ({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();

      let count = await Noti.query().where('userId',user.id).where('seen',0).count('id as total');
      count = count[0].total

      return response.status(200).json({
        'success': true,
        'notiCount': count
      })
    }
    async getNotiDetails ({ request, response, auth }){
      let limit =  request.input('limit')
      const user = await auth.getUser();

      let c =  Noti.query().where('userId',user.id);
      if(limit){
        c.limit(limit)
      }

      let count = await c.orderBy('id','desc').fetch();


      return response.status(200).json({
        'success': true,
        'notiDetails': count
      })
    }
    async updateNoti ({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();

      await Noti.query().where('userId',user.id).where('id',data.id).update({seen:1});
      let count = await Noti.query().where('userId',user.id).limit(10).orderBy('id','desc').fetch();

      return response.status(200).json({
        'success': true,
        'data': count
      })
    }
    async updateAllNoti ({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();

      await Noti.query().where('userId',user.id).update({seen:1});
      let count = await Noti.query().where('userId',user.id).limit(10).orderBy('id','desc').fetch();

      return response.status(200).json({
        'success': true,
        'data': count
      })
    }
    async deleteNoti ({ request, response, auth }){
      let data = request.all()
      const user = await auth.getUser();

      await Noti.query().where('userId',user.id).where('id',data.id).delete();
      let count = await Noti.query().where('userId',user.id).limit(10).fetch();

      return response.status(200).json({
        'success': true,
        'data': count
      })
    }


    async initdata ({ request, response, auth }) {
      try {
        const user = await auth.getUser()
        let aUser = await User.query().where('id',user.id).with('customer').first()
        return response.status(200).json({
          'success': true,
          user: aUser
        })
      } catch (error) {
        return response.status(200).json({
          'success': false,
          'user': false,
        })
      }
    }
    async getOutstandingCustomer ({ request, response, auth }) {
      let user;
        try {
            user = await auth.getUser()
        } catch (error) {
            return response.status(401).json({
              'success': false,
                message: 'You are not authorized!'
            })
        }
      let customer = await Customer.query().where('userId',user.id).first()
      let bonus= await Bonus.query().where('customer_id',customer.id).sum('amount as total' ).first()
      if(bonus.total == null) bonus.total = 0

      return response.status(200).json({
        'success': true,
        'bonus': bonus
      })
    }

    async userBalanceDetails({ request, response, auth }) {
      let user = {
        // id:164
      };
      try {
          user = await auth.getUser()
      } catch (error) {
          return response.status(401).json({
            'success': false,
              message: 'You are not authorized!'
          })
      }
      let customer = await Customer.query().where('userId',user.id).first()
      customer = customer.toJSON();
      let bonus= await Bonus.query().where('customer_id',customer.id).sum('amount as total' ).first()
      if(bonus.total == null) bonus.total = 0;

      let outstandingRaw = await Database.raw("select `uid`, SUM(amount) as total_due, `date` from `paymentsheets` where `type` in ('due','opening','dueincoming') and `paymentFor` = 'customer' and `uid` = ? group by `uid` having sum(amount) < 0",[customer.id])
      let outstanding = outstandingRaw[0].length > 0? outstandingRaw[0][0].total_due : 0

      let totalOrderAmount = await Order.query().where('userId',user.id).sum('grandTotal as total' ).first()
      let totalPaidAmount = await Order.query().where('userId',user.id).where('paymentStatus','Paid').sum('grandTotal as total' ).first()
      if(totalOrderAmount.total == null) totalOrderAmount.total = 0;
      if(totalPaidAmount.total == null) totalPaidAmount.total = 0;

      return response.status(200).json({
        'success': true,
        'balance': bonus.total,
        'totalOrderAmount': totalOrderAmount.total,
        'totalPaidAmount': totalPaidAmount.total,
        'outstanding': outstanding,

      })

    }

}

module.exports = UserController
