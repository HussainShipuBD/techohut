
<template>
    <div class="_1content">
        <div class="_checkOut_page">
            <div class="container">
                <div class="_checkOut_main">
                    <div class="row">
                        <div class="col-12 col-md-8 col-lg-8">
                            <div v-if="!isLoggedIn" class="_checkOut_form">
                                <h1 class="_checkOut_form_title">SECURE EXPRESS CHECKOUT</h1>

                                <div class="_checkOut_log_button">
                                    <button class="_1btn" :class="(loginSystem==1)? 'active' : ''" @click=" loginSystem = 1">Sign up</button>
                                    <button class="_2btn" :class="(loginSystem==2)? 'active' : ''" @click=" loginSystem = 2">Sign in</button>
                                </div>

                                <div v-if="loginSystem==2" class="row">
                                    <div class="col-12 col-md-12 col-lg-12">
                                        <div class="_1input_group">
                                            <p class="_1label">Phone number</p> 
                                            <input v-model="form_login.contact" placeholder="Phone number" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-12 col-lg-12">
                                        <div class="_1input_group">
                                            <p class="_1label">Password</p> 
                                            <input v-model="form_login.password" placeholder="Password" type="password" class="_account_input">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-12 col-lg-12">
                                        <div class="_1input_group">
                                            <button class="_1btn"  @click="login">Sign in</button>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="row">
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">First name</p> 
                                            <input v-model="firstName" required placeholder="First name" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Last name</p> 
                                            <input v-model="lastName" required placeholder="Last name" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Email address</p> 
                                            <input v-model="form_data.email" required placeholder="Email address" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Phone number</p> 
                                            <input v-model="form_data.contact" required placeholder="Phone number" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Password</p> 
                                            <input v-model="form_data.password" type="password" required placeholder="Password" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Confirm password</p> 
                                            <input v-model="form_data.cpassword" type="password" required placeholder="Confirm password" class="_account_input">
                                        </div>
                                    </div>

                                    <div class="col-12 col-md-12 col-lg-12">
                                        <div class="_1input_group">
                                            <button class="_1btn"  @click="registar">Signup</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div v-if="isLoggedIn" class="_checkOut_form">
                                <h1 class="_checkOut_form_title">Shipping Address</h1>

                                <div class="row">
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Full name</p> 
                                            <input v-model="order.name" placeholder="Full name" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Email address</p> 
                                            <input v-model="order.email" placeholder="Email address" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Phone no</p> 
                                            <input v-model="order.contact" disabled placeholder="Phone no" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Address</p> 
                                            <input v-model="order.billingAddress" placeholder="Address" class="_account_input">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Country</p> 
                                            <Select class="_2select" v-model="country">
                                                <Option value="Bangladesh" >Bangladesh</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">District</p> 
                                            <Select class="_2select" v-model="order.billingCity" @on-change="changeShippingPrice" placeholder="Choose Your District">
                                                <Option v-for="(item,index) in zones" :key="index" :value="item.zoneName" >{{item.zoneName}}</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_1input_group">
                                            <p class="_1label">Postal Code</p> 
                                            <input v-model="order.postCode" placeholder="Postal Code" class="_account_input">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-4 col-lg-4">
                            <div class="_cart_details">
                                <div class="_cart_details_top">
                                    <h4 class="_cart_form_title">Cart Summary</h4>
                                    <ul class="_cart_details_list">
                                        <li v-for="(item,index) in cartItem" :key="index" >{{item.mproduct.productName}} X {{item.quantity}} <span>৳ {{(item.quantity * (item.mproduct.sellingPrice-((item.mproduct.sellingPrice*item.mproduct.discount)/100))) | toFixedNum}}</span></li>
                                    </ul>

                                    <p>Sub Total <span>৳ {{subTotalCost}}</span></p>
                                    <p  v-if="order.promoDiscount  >0 && order.discountType == 'Promo Code' && order.coupon != ''">Promo Code Discount <span> {{order.promoDiscount}}%</span></p>
                                    <p  v-if="order.membershipDiscount  >0 && order.discountType == 'Membership Discount'">Membership Discount <span> {{order.membershipDiscount}}%</span></p>
                                    <p  v-if="order.refferalDiscount  >0 && order.referralCode != ''">Referral Discount <span> {{parseInt(this.settings.refererBonus)}}%</span></p>
                                    <p  v-if="order.giftVoucherAmount  >0">Gift Voucher ({{order.giftVoucherCode}}) <span> - ৳ {{order.giftVoucherAmount}}</span></p>
                                    <p  v-if="order.isDGMoney">DG Money <span> - ৳ {{order.dgAmount}}</span></p>
                                    <p style="border-top: 1px solid #292929;">Grand Total <span>৳ {{totalCost}}</span></p>
                                    <p v-if="order.roundAmount>0">Rounding(+-)  <span>৳ -{{order.roundAmount}}</span></p>
                                    <p v-if="order.shippingPrice>0">Shipping Fee <span>৳ {{order.shippingPrice}}</span></p>
                                    <h2>Total <span>৳ {{totalCostWithShipping}}</span></h2>
                                    
                                    <br/>

                                    <h4 class="_cart_form_title">Payment Method</h4>

                                    <div class="checkout-payment-method">
                                        <div class="single-method" >
                                            <Tooltip :max-width="300" content="Pay with cash upon delivery">
                                                <input type="radio" id="payment_cash" name="payment-method" value="Cash on delivery" v-model="order.paymentType">
                                                <label for="payment_cash">
                                                        Cash on Delivery

                                                </label>
                                            </Tooltip>
                                            <!-- <p data-method="cash">Please send a Check to Store name with Store Street, Store Town, Store State, Store Postcode, Store Country.</p> -->
                                        </div>

                                        <div class="single-method"  >
                                            <Tooltip :max-width="300" content="Pay securely by Credit or Debit card or internet banking through SSLCommerz Secure Servers">
                                                <input type="radio"  id="payment_paypal" name="payment-method" value="sslcommerz" v-model="order.paymentType" >
                                                <label for="payment_paypal">Payment Gateway</label>
                                            </Tooltip>

                                        </div>
                                        <div class="single-method" v-if="authInfo && authInfo.id && authInfo.id == 43">
                                            <Tooltip :max-width="300" content="Pay securely by Bkash">
                                                <input type="radio" id="payment_bkash" name="payment-method" value="Bkash" v-model="order.paymentType">
                                                <label for="payment_bkash">
                                                        Bkash

                                                </label>
                                            </Tooltip>
                                            <!-- <p data-method="cash">Please send a Check to Store name with Store Street, Store Town, Store State, Store Postcode, Store Country.</p> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-summary-button _cart_btn_a">
                                    <button class="_1btn _w_100" :disabled="loading"  @click="placeOrder">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            firstName:'',
            lastName:'',
            form_data:{
                name:'',
                email:'',
                contact:'',
                username:'',
                password:'',
                cpassword:'',
            },
            settings:{
                refererBonus:0,
                isShippingFree:0,
            },
            country:'Bangladesh',
            form_login:{
                contact:'',
                password:'',
            },
            // order:{
            //     billingCity:'',
            //     shippingPrice:0,
            //     coupon:'',
            //     discount:0,
            //     subTotal:0,
            //     grandTotal:0,
            //     discountType:'',
            //     billingAddress:'',
            //     discountType:'',
            //     paymentType:'',
            //     name:'',
            //     contact:'',
            //     postCode:'',
            //     isDGMoney:0,
            //     dgAmount:0,
            //     giftVoucherAmount:0,
            //     giftVoucherCode:'',
            // },
            isLogin:false,
            loading:false,
            zones:[],
            loginSystem:1,
            buttons:{
                bkash:1,
                gift:0,
                dGpay:0,
                voucher:0
            }
        }
    },
    methods:{
        changeShippingPrice(){

            let order  = this.order;
            if(order.billingCity == undefined || order.billingCity == '') return this.i('Region Name is empty!')
            if(this.zones.length  ==0) return this.i('Region Name is empty!')
            let index = this.zones.findIndex(d => d.zoneName == order.billingCity )
             if(this.settings.isShippingFree == 0){
                order.shippingPrice = parseFloat(this.zones[index].delivery)
            }
            else if(this.settings.isShippingFree == 1){
                if(this.settings.shippingFreeAfter >= this.totalCost)
                order.shippingPrice = parseFloat(this.zones[index].delivery)
            }
            console.log(order.shippingPrice)

            this.$store.commit('order',order)
        },
        async login(){
            let order = this.order;
            if(this.form_login.contact.trim() == '') return this.w("Phone Number is empty!")
            if(this.form_login.password.trim() == '') return this.w("Password is empty!")

            const res = await this.callApi('post','/app/login',this.form_login)
            if(res.status == 200){
                // this.$store.dispatch('setAuthInfo', res.data.user)
                // this.$store.dispatch('setToken', res.data.token)
                // this.$ls.set('token', res.data.token)
                this.$store.dispatch('setAuthInfo', res.data.user)
                this.$store.dispatch('setToken', res.data.token)
                this.setCookie("token", res.data.token);
                this.s("Login successful !")
                order.name = this.authInfo.name
                order.contact = this.authInfo.contact
                if(this.authInfo.customer){

                    order.name = this.authInfo.name
                    order.email = this.authInfo.email
                    order.contact = this.authInfo.contact
                    order.billingAddress = this.authInfo.customer.address ? this.authInfo.customer.address : ''
                    order.postCode = this.authInfo.customer.postCode ? this.authInfo.customer.postCode : ''
                    let index = this.zones.findIndex(d => d.id == this.authInfo.customer.zoneId )
                    order.billingCity = this.zones[index].zoneName
                }
                this.checkMemberShip()
                this.changeShippingPrice()

            }
            else if (res.status == 401){
                for(let d of res.data) this.e(d.message)
            }
            else if (res.status == 402){
                this.i("Account varification required!")
                this.$router.push(`/account-activation?contact=${this.form_login.contact}&callback=/checkout`)
            }
            this.$store.commit('order',order)
        },
        async registar(){
            if(this.firstName == '' || this.firstName.trim() == '') return this.i("First Name is empty!")
            if(this.lastName == '' || this.lastName.trim() == '') return this.i("Last Name is empty!")
            this.form_data.name = this.firstName+' '+this.lastName
           if(this.form_data.contact == '' || this.form_data.contact.trim() == '') return this.i("Phone Number is empty!")
            if(this.form_data.contact.length !== 11 ) return this.i("Phone Number digit is not 11 !")
            if(this.form_data.password == '' || this.form_data.password.trim() == '') return this.i("Password is empty!")
            if(this.form_data.cpassword == '') return this.i("Password doesn't match!")
            if(this.form_data.cpassword.trim() != this.form_data.password.trim()) return this.i("Password doesn't match!")
            this.form_data.username = this.form_data.contact
            let t_data = _.clone(this.form_data);
            delete t_data.cpassword
            const res = await this.callApi('post','/app/registration',t_data)
            if(res.status == 200){
                // this.$store.dispatch('setAuthInfo', res.data.user)
                // this.$store.dispatch('setToken', res.data.token)
                // this.$ls.set('token', res.data.token)
                this.s("Registration successful! Please Active you account by varified you phone number.")
                this.$router.push(`/account-activation?contact=${res.data.user.contact}&callback=/checkout`)

            }
            else if (res.status == 400){
                for(let d of res.data){
                    this.e(d.message)
                }
            }
            else {
                this.swr()
            }
        },
        async  placeOrder(){
            let order = this.order;
            if(!this.isLoggedIn) return this.w("Please login or registar first.")
            if(order.billingAddress.trim() == '') return this.w("Shipping Address is Empty!")
            if(order.contact.trim() == '') return this.w("Phone number is Empty!")
            if(order.name.trim() == '') return this.w("Name is Empty!")
            if(order.billingCity.trim() == '') return this.w("District is Empty!")
            if(order.name.trim() == '') return this.w("Name is Empty!")
            if(order.postCode.trim() == '') return this.w("Postal / Zip Code is Empty!")
            if(order.paymentType.trim() == '') return this.w("Select a payment Method !")
            this.loading = true;
            let zindex = this.zones.findIndex(o => o.zoneName == order.billingCity);
            order.zoneId = this.zones[zindex].id

            order.subTotal = (this.subTotalCost)
            order.totalSellingPrice = (this.totalSellingPrice)
            order.grandTotal = (this.totalCost - order.roundAmount)
             order.grandTotal += parseFloat(order.dgAmount);
            order.grandTotal += parseFloat(order.giftVoucherAmount);
            order.cartItems = this.cartItem
            let start = new Date();
            order.date = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();

            const res = await this.callApi('post','app/order',order)
            if(res.status == 200){
                this.s('Your order submitted sucessfully !')
                this.loading = false;
                this.removeAll();
                this.removeAllorder();
                if(res.data.order.paymentType=='sslcommerz'){

                    window.location = res.data.ssldata.GatewayPageURL
                }
                else if(res.data.order.paymentType=='Bkash'){

                    window.location = res.data.bkash_data.bkashURL
                }

                else{
                    window.location = `/order-submitted/${res.data.order.id}`
                }

            }
            else if (res.status == 422){
                   this.e(res.data.message)
            }
            else this.swr()
            this.loading = false;
        },
        removeAllorder(){
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

                subTotal:0,
                grandTotal:0,
                billingAddress:'',
                paymentType:'',
                name:'',
                contact:'',

            }
            this.$store.commit('order',order)
        },
        checkMemberShip(){
             if(this.cartItem.length == 0){
                this.$router.push('/');
                return
            }
            let order = this.order;
            if(this.isLoggedIn){

                if(this.authInfo.customer.barcode) {
                    console.log("Yes")
                    this.order.discount = 10
                    this.order.discountType = "Membership Discount"
                    this.ismember = true

                }

            }
            this.$store.commit('order',order);
        },
        autoRound(value){
            let reminder = (value%10)
            this.order.roundAmount = reminder;
            return value - reminder;
        },
        checkPayment(){
            // if(this.order.giftVoucherAmount == this.totalCost){
            //     this.buttons.gift=1
            //     this.buttons.bkash=0
            //     this.order.paymentType='Gift Voucher'
            // }
            // else if(this.order.dgAmount == this.totalCost){
            //     this.buttons.dGpay=1
            //     this.buttons.bkash=0
            //     this.order.paymentType='DG Pay'
            // }
        },

          checkbillingCity(){
            let order = this.order;
            console.log(order.order);
            if(this.isLoggedIn){
                if(!order.name) order.name = this.authInfo.name
                if(!order.email) order.email = this.authInfo.email
                if(!order.contact) order.contact = this.authInfo.contact
                if(!order.billingAddress) order.billingAddress = this.authInfo.customer.address ? this.authInfo.customer.address : ''
                if(!order.billingCity) order.billingCity = this.authInfo.customer.zone ? this.authInfo.customer.zone : ''
                if(!order.postCode) order.postCode = this.authInfo.customer.postCode ? this.authInfo.customer.postCode : ''
            }
            else{
                console.log("not login")
            }
            this.$store.commit('order',order)
             this.changeShippingPrice()
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
            let cost = parseInt(this.order.discount)
            if(this.order.referralCode) cost += -parseInt(this.settings.refererBonus)

            return  cost
        },


    },
    async created(){

        const [res,res2] = await Promise.all([
            this.callApi('get','app/zones'),
            this.callApi('get','/app/settings')
        ])
        if(res.status == 200){
            this.zones = res.data.zones
        }
          if(res2.status == 200){
             this.settings = res2.data.settings
        }

        this.checkbillingCity();
        if(this.order.discount == 0) this.checkMemberShip()
        // this.order.billingCity = (this.$route.query.billingCity)? this.$route.query.billingCity : ''
        // this.order.shippingPrice = (this.$route.query.shippingPrice)? this.$route.query.shippingPrice : 0
        // this.order.coupon = (this.$route.query.coupon)? this.$route.query.coupon : ''
        // this.order.discount = (this.$route.query.discount)? this.$route.query.discount : 0
        // this.order.postCode = (this.$route.query.postCode)? this.$route.query.postCode : ''
        // this.order.referralCode = (this.$route.query.referralCode)? this.$route.query.referralCode : ''
        // this.order.discountType = (this.$route.query.discountType)? this.$route.query.discountType : ''
        // this.order.dgAmount = (this.$route.query.dgAmount)? this.$route.query.dgAmount : 0
        // this.order.giftVoucherAmount = (this.$route.query.giftVoucherAmount)? this.$route.query.giftVoucherAmount : 0

        //  if(this.order.giftVoucherAmount == this.totalCost){
        //         this.buttons.gift=1
        //         this.buttons.bkash=0
        //         this.order.paymentType='Gift Voucher'
        //         this.order.paymentStatus='Paid'
        //     }
        //     else if(this.order.dgAmount == this.totalCost){
        //         this.buttons.dGpay=1
        //         this.buttons.bkash=0
        //         this.order.paymentType='DG Pay'
        //         this.order.paymentStatus='Paid'
        //     }
        // this.order.giftVoucherCode = (this.$route.query.giftVoucherCode)? this.$route.query.giftVoucherCode : ''
        // this.order.isDGMoney = (this.$route.query.isDGMoney && this.$route.query.isDGMoney == 1)? this.$route.query.isDGMoney : 0





        // setTimeout(
        //         () => this.checkPayment()
        //     ,5000);
    }
}
</script>

<style  >
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
