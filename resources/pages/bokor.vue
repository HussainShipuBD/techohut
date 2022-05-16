<template>
  <h1>Test Page @JIN</h1>
</template>
<script>
export default {
    data(){
        return{
            zones:[],

            settings:{
                refererBonus:0,
                isShippingFree:0,
            },
            isReferral:false,
            isCoupon:false,
            ismember:false,
            isGiftVoucher:false,
            isDGMoney:false,
            userBonus:0,
            country:'Bangladesh'
        }
    },
    methods:{

    addItemQuantityInServer(item,index){
      console.log("Calling ",item.quantity)
      if(item.quantity > item.vproduct.stock ) return this.i("Product out of stock!")
      this.changeCartQuantityServer(item,index)
    },

        addItemQuantityIn(item,index){

            var oldCartData = this.$ls.get('myCart')
            var storedData= JSON.parse(oldCartData)
            storedData[index].quantity = item.quantity
            if(storedData[index].stock < storedData[index].quantity){
                item.quantity = storedData[index].stock
                return this.i('Out of Stock!!')
            }
            this.$ls.set('myCart', JSON.stringify(storedData))
            this.$store.dispatch('updateCart', storedData)
            return
        },
        changeShippingPrice(){
            let order = this.order;
            if(order.billingCity == '') return this.i('Region Name is empty!')
            let index = this.zones.findIndex(d => d.zoneName == order.billingCity )
            console.log("order 1")
            if(this.settings.isShippingFree == 0){
                order.shippingPrice = parseFloat(this.zones[index].delivery)
            }
            else if(this.settings.isShippingFree == 1){
                console.log("order 2")
                if(this.settings.shippingFreeAfter >= this.totalCost){
                    console.log('index')
                    console.log(index)
                    order.shippingPrice = parseFloat(this.zones[index].delivery);

                    console.log("yes yes yes ")
                }
            }
            this.$store.commit('order',order)
        },
        async checkCoupon(){
            let order = this.order;
            if(order.coupon == '') return this.i('Promo Code  is empty!')

           const res = await this.callApi('post','app/checkCoupon',{code:order.coupon})
           if(res.status == 202){
               console.log(res.data)

               if(order.discount <= res.data.Coupon.discount){
                    this.s('You get '+res.data.Coupon.discount+'% Discount')
                    order.discount = res.data.Coupon.discount
                    order.promoDiscount = res.data.Coupon.discount
                    order.membershipDiscount = 0
                    order.membershipDiscountAmount = 0
                    order.refferalDiscount = 0
                    order.refferalDiscountAmount = 0
                    if(this.isReferral) order.discount += (this.settings.refererBonus)
                    order.discountType = "Promo Code"
                    this.isCoupon = true
               }
               else{
                   this.i('You get '+res.data.Coupon.discount+'% Discount')
               }

           }
           else if (res.status == 401) {
               this.e(res.data.message)
           }
           else{
               this.swr();
           }
        },
        clearCoupon(){
            let order = this.order;
            order.discount = 0
            if(this.isReferral) order.discount += parseInt(this.settings.refererBonus)
            order.membershipDiscount = 0
            order.membershipDiscountAmount = 0
            order.refferalDiscount = 0
            order.refferalDiscountAmount = 0
            order.promoDiscount= 0
            order.promoDiscountAmount = 0
            order.coupon = ''
            order.discountType = ""
            this.isCoupon = false
            this.$store.commit('order',order);
            this.checkMemberShip();
        },
        async checkreferralCode(){

            if(!this.isLoggedIn){
                this.i('Please Login first!')
                return this.$router.push('/login?callback=/cart')

            }
            let order = this.order;
            if(order.referralCode == '') return this.i('Referral  Code  is empty!')
            if(this.isReferral == true) return this.i('You already take Referrrel discount!')

           const res = await this.callApi('post','app/checkReferralCode',{barCode:order.referralCode})
           if(res.status == 202){

               this.s(`You get ${this.settings.refererBonus}% Discount`)
               order.discount = parseInt(order.discount) + parseInt(this.settings.refererBonus)
               order.refferalDiscount = parseInt(this.settings.refererBonus)
               order.membershipDiscount = 0
            order.membershipDiscountAmount = 0
            order.promoDiscount= 0
            order.promoDiscountAmount = 0
               this.isReferral = true

           }
           else if (res.status == 401) {
               this.e("Invalid Referral Code !")
           }
           else{
               this.swr();
           }
           this.$store.commit('order',order);
        },
        async checkGiftVoucherCode(){
            let order = this.order;
            if(order.giftVoucherCode == '') return this.i('Gift Voucher  Code  is empty!')

           const res = await this.callApi('post','app/checkGiftVoucherCode',{code:order.giftVoucherCode})
           if(res.status == 202){
              if(this.totalCost < res.data.Coupon.amount) return this.i("Gift Voucher can not applicable to this amount of order")
               order.giftVoucherAmount = parseFloat(res.data.Coupon.amount)
               this.s(`You get ৳ ${order.giftVoucherAmount} Gift Voucher`)
           }
           else if (res.status == 401) {
              this.e(res.data.message)
           }
           else{
               this.swr();
           }
           this.$store.commit('order',order);
        },
        async checkDGMoney(){
            let order = this.order;
            if(order.dgAmount > this.totalCost) return this.i("DG amount can't more than Grand Total!")
            order.isDGMoney=1
            this.$store.commit('order',order);
        },
        clearreferralCode(){
            let order = this.order;
            order.discount = parseInt(order.discount) - parseInt(this.settings.refererBonus)
            this.isReferral = false
            order.referralCode = ''
             order.membershipDiscount = 0
            order.membershipDiscountAmount = 0
            order.refferalDiscount = 0
            order.refferalDiscountAmount = 0
            order.promoDiscount= 0
            order.promoDiscountAmount = 0
            this.$store.commit('order',order);
        },
        clearGiftVoucherCode(){
             let order = this.order;
            order.giftVoucherCode = ''
            order.giftVoucherAmount = 0
            this.isGiftVoucher = false
            this.$store.commit('order',order);
        },
        clearDGMoney(){
            let order = this.order;
            order.dgAmount = 0
            order.isDGMoney = 0
            this.isDGMoney = false
            this.$store.commit('order',order);
        },
        autoRound(value){
            let reminder = (value%10)
            this.order.roundAmount = reminder;
            return value - reminder;
        },
        checkMemberShip(){
             let order = this.order;
            if(this.isLoggedIn){
                if(this.authInfo.customer && this.authInfo.customer.barcode) {
                    console.log("Yes")
                    order.discount = 10
                    order.membershipDiscount = 10
                    order.refferalDiscount = 0
                    order.refferalDiscountAmount = 0
                    order.promoDiscount= 0
                    order.promoDiscountAmount = 0
                    order.discountType = "Membership Discount"
                    this.ismember = true
                }
            }
            this.$store.commit('order',order);
        },
        goToCheckout(){
            let order = this.order;
            if(this.cartItem.length == 0) return this.i('Your cart is empty!')
            if(!this.isCoupon) order.coupon = ''
            if(!this.isGiftVoucher) order.giftVoucherCode = ''
            if(this.order.isDGMoney==0) order.dgAmount = 0
            this.$store.commit('order',order);
            this.$router.push('/checkout')
        }
    },
    computed:{
        totalCost(){
            let cost = this.subTotalCost
            if(this.order.membershipDiscount >0){
              var totalOld = cost
              var discountAmount = (this.order.membershipDiscount * totalOld) / 100
              discountAmount = Math.ceil(discountAmount);
              var afterDiscount = totalOld - discountAmount
              this.order.membershipDiscountAmount = discountAmount
              afterDiscount = (afterDiscount)
              cost = afterDiscount
            }
            else if(this.order.refferalDiscount >0){
              var totalOld = cost
              var discountAmount = (this.order.refferalDiscount * totalOld) / 100
              discountAmount = Math.ceil(discountAmount);
              var afterDiscount = totalOld - discountAmount
              this.order.refferalDiscountAmount = discountAmount
              afterDiscount = (afterDiscount)
              cost = afterDiscount
            }
            else if(this.order.promoDiscount >0){
              var totalOld = cost
              var discountAmount = (this.order.promoDiscount * totalOld) / 100
              discountAmount = Math.ceil(discountAmount);
              var afterDiscount = totalOld - discountAmount
              this.order.promoDiscountAmount = discountAmount
              afterDiscount = (afterDiscount)
              cost = afterDiscount
            }
            // if(this.order.discount) cost = parseFloat(cost) -  parseFloat((cost*this.order.discount)/100)
            // if(this.order.billingCity) cost = parseFloat(cost) + parseFloat(this.order.shippingPrice)
            if(this.order.giftVoucherAmount > 0) cost = (cost) - (this.order.giftVoucherAmount)
            if(this.order.isDGMoney) cost = (cost) - (this.order.dgAmount)
            cost = Math.floor(cost)
            return  cost
        },
        totalCostWithShipping(){
            let cost = this.subTotalCost;
            if(this.order.membershipDiscount >0){
              var totalOld = cost
              var discountAmount = (this.order.membershipDiscount * totalOld) / 100
              discountAmount = Math.ceil(discountAmount);
              var afterDiscount = totalOld - discountAmount
              this.order.membershipDiscountAmount = discountAmount
              afterDiscount = (afterDiscount)
              cost = afterDiscount
            }
            else if(this.order.refferalDiscount >0){
              var totalOld = cost
              var discountAmount = (this.order.refferalDiscount * totalOld) / 100
              discountAmount = Math.ceil(discountAmount);
              var afterDiscount = totalOld - discountAmount
              this.order.refferalDiscountAmount = discountAmount
              afterDiscount = (afterDiscount)
              cost = afterDiscount
            }
            else if(this.order.promoDiscount >0){
              var totalOld = cost
              var discountAmount = (this.order.promoDiscount * totalOld) / 100
              discountAmount = Math.ceil(discountAmount);
              var afterDiscount = totalOld - discountAmount
              this.order.promoDiscountAmount = discountAmount
              afterDiscount = (afterDiscount)
              cost = afterDiscount
            }
            // if(this.order.discount) cost = parseFloat(cost) -  parseFloat((cost*this.order.discount)/100)
            // if(this.order.billingCity) cost = parseFloat(cost) + parseFloat(this.order.shippingPrice)
             if(this.order.giftVoucherCode != '') cost = parseFloat(cost) - parseFloat(this.order.giftVoucherAmount)
             if(this.order.isDGMoney==1) cost = parseFloat(cost) - parseFloat(this.order.dgAmount)
             if(this.order.shippingPrice>0) cost  = parseFloat(cost) + parseFloat(this.order.shippingPrice)
             cost = Math.floor(cost)
             cost = this.autoRound(cost);
            return  cost
        },
        discountShow(){
            let cost =this.order.discount
            if(this.isReferral) cost += -parseInt(this.settings.refererBonus)

            return  Math.floor(cost)
        },
    },
    mounted(){
        setTimeout(
            () =>{

                this.checkMemberShip();
                // this.changeShippingPrice();
                console.log("calling settimeout");
                console.log(this.authInfo)
                if(this.isLoggedIn){
                    let order = this.order;


                if(this.authInfo.customer && this.authInfo.customer.zoneId){
                    let index = this.zones.findIndex(d => d.id == this.authInfo.customer.zoneId )
                    order.billingCity = this.zones[index].zoneName
                    if(this.settings.isShippingFree == 0){
                        order.shippingPrice = parseFloat(this.zones[index].delivery)
                    }
                    else if(this.settings.isShippingFree == 1){
                        console.log("order 2")
                        if(this.settings.shippingFreeAfter >= this.totalCost){
                            console.log('index')
                            console.log(index)
                            order.shippingPrice = parseFloat(this.zones[index].delivery);

                            console.log("yes yes yes ")
                        }
                    }
                }

                    this.$store.commit('order',order);
                }
                else {
                    this.i('Region Name is empty!')
                }
            }
        , 2000);
    },
    async created(){
        let order ={
            billingCity:'',
            shippingPrice:0,
            coupon:'',
            discountType:'',
            discount:0,
            postCode:'',
            referralCode:'',
            giftVoucherCode:'',
            giftVoucherAmount:0,
            isDGMoney:0,
            dgAmount:0,
            roundAmount:0,
            refferalDiscount:0,
            membershipDiscount:0,
            promoDiscount:0,
            refferalDiscountAmount:0,
            membershipDiscountAmount:0,
            promoDiscountAmount:0,

            totalSellingPrice:0,
            subTotal:0,
            grandTotal:0,
            billingAddress:'',
            paymentType:'',
            name:'',
            contact:'',
        }
        console.log('order',order)
        const [res,res1,res2] = await Promise.all([
            this.callApi('get','app/zones'),
            this.callApi('get','/app/getOutstandingCustomer'),
            this.callApi('get','/app/settings')
        ])
        if(res.status == 200){
            this.zones = res.data.zones
        }
    if(res1.status == 200){
             this.userBonus = res1.data.bonus.total
        }
        if(res2.status == 200){
             this.settings = res2.data.settings
        }
        //  if(this.isLoggedIn){
        //     if(this.authInfo.customer && this.authInfo.customer.zoneId){

        //         let index = this.zones.findIndex(d => d.id == this.authInfo.customer.zoneId )
        //         order.billingCity = this.zones[index].zoneName
        //     }



        // }
        this.$store.commit('order',order);
    }
}
</script>
