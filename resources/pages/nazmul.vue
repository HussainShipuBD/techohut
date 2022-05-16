<template>
    <div id="main-wrapper">
        <!--Cart section start-->
        <div class="cart-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50  _crt_sec2">
            <div class="container sb-border pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20">
                <div class="row">

                    <div class="col-12">
                        <!-- Cart Table -->
                        <div class="cart-table table-responsive mb-30 cart_table1" v-if="cartItem.length>0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="pro-thumbnail">Image</th>
                                        <th class="pro-title">Product</th>
                                        <th class="pro-price">Price</th>
                                        <th class="pro-quantity">Quantity</th>
                                        <th class="pro-subtotal">Total</th>
                                        <th class="pro-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in cartItem" :key="index" >
                                        <td class="pro-thumbnail">
                                            <nuxt-link :to="{name:'single-product-id', params: { id:item.mproductId } }">
                                                <img :src="item.mproduct.productImage"  alt="Image">
                                            </nuxt-link>
                                        </td>
                                        <td class="pro-title">
                                            <nuxt-link :to="{name:'single-product-id', params: { id:item.mproductId } }">{{item.mproduct.productName}}  {{item.vproduct.color}}  {{item.vproduct.size}}</nuxt-link>
                                        </td>
                                        <td class="pro-price">
                                            <template v-if="item.mproduct.discount>0">
                                                <div class="_dis_flex _price">
                                                    <span class="_price_text">৳ {{item.mproduct | disountPrice}}</span>
                                                    <span><del> ৳ {{item.mproduct.sellingPrice}} </del></span>
                                                </div>
                                            </template>
                                            <template v-else><span class="_price_text">৳ {{item.mproduct.sellingPrice}}</span></template>

                                        </td>
                                        <td class="pro-quantity _pro_qty3">
                                            <div class="_pro_qty">
                                                <span @click="decreaseQuantityServer(item,index)"><i class="fas fa-minus"></i></span>
                                                <input type="number" min="1" :max="item.vproduct.stock" v-on:change="addItemQuantityInServer(item,index)" v-model="item.quantity">
                                                <span @click="increaseQuantityServer(item,index)"><i class="fas fa-plus"></i></span>
                                            </div>
                                        </td>
                                        <td class="pro-subtotal"><span>৳ {{(item.quantity * (item.mproduct.sellingPrice-((item.mproduct.sellingPrice*item.mproduct.discount)/100))) | toFixedNum}}</span></td>
                                        <td class="pro-remove"><a @click="removeItemServer(item.id,index)"><i class="fa fa-trash-o"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                         <!-- Cart Table for Mobile-->
                         <div class="_cart_table_mbl">
                             <div class="_cart_table_mbl_top">
                                 <p>Shopping Cart</p>
                             </div>

                             <div class="_cart_table_all">
                                 <!-- CART TABLE ITEM -->
                                 <div class="_cart_table_itm" v-for="(item,index) in cartItem" :key="index">
                                     <div class="_cart_table_itm_lft">
                                         <nuxt-link :to="{name:'single-product-id', params: { id:item.mproductId } }">
                                             <img :src="item.mproduct.productImage" alt="image">
                                         </nuxt-link>
                                     </div>
                                     <div class="_cart_table_itm_r8">


                                         <div class="_cart_table_itm_mdl">
                                             <div class="_cart_table_itm_mdl_one">
                                                <div class="_cart_table_itm_one_txt">
                                                     <p class="_cart_table_itm_r8_txt">
                                                      {{item.mproduct.productName}}  {{item.vproduct.color}}  {{item.vproduct.size}}
                                                   </p>
                                                </div>

                                                <div class="_cart_table_itm_one_price">
                                                     <p>
                                                       {{item.quantity}} <span>x</span> {{(item.mproduct.sellingPrice-((item.mproduct.sellingPrice*item.mproduct.discount)/100))}}
                                                     </p>
                                                    <p>৳ {{(item.quantity * (item.mproduct.sellingPrice-((item.mproduct.sellingPrice*item.mproduct.discount)/100))) | toFixedNum}}</p>
                                                </div>

                                             </div>
                                             <div class="_cart_table_itm_mdl_two">

                                                 <div class="_pro_qty _pro_qty1 _pro_qty_crt">
                                                    <span @click="decreaseQuantityServer(item,index)"><i class="fas fa-minus"></i></span>
                                                   <input type="number" min="1" :max="item.vproduct.stock" v-on:change="addItemQuantityInServer(item,index)" v-model="item.quantity">
                                                    <span @click="increaseQuantityServer(item,index)"><i class="fas fa-plus"></i></span>
                                                </div>

                                                <div class="_cart_table_itm_mdl_dlt">
                                                    <span @click="removeItemServer(item.id,index)"><i class="fa fa-trash-o"></i></span>
                                                </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <!-- CART TABLE ITEM -->

                                   <!-- CART TABLE ITEM -->
                                 <!-- <div class="_cart_table_itm">
                                     <div class="_cart_table_itm_lft">
                                         <a href="">
                                             <img src="https://admin.dreamsgallerybd.com/uploads/3tOFT4Ese8O2msqdFPMAM0W6vlbX9XM6KS3AjhSg.png" alt="image">
                                         </a>
                                     </div>
                                     <div class="_cart_table_itm_r8">


                                         <div class="_cart_table_itm_mdl">
                                             <div class="_cart_table_itm_mdl_one">
                                                <div class="_cart_table_itm_one_txt">
                                                     <p class="_cart_table_itm_r8_txt">
                                                      Focallure Liquid Matte Lipstick 01 - FAF24
                                                   </p>
                                                </div>

                                                <div class="_cart_table_itm_one_price">
                                                     <p>
                                                       2 <span>x</span> 150
                                                     </p>
                                                    <p>300</p>
                                                </div>

                                             </div>
                                             <div class="_cart_table_itm_mdl_two">

                                                 <div class="_pro_qty _pro_qty1">
                                                    <span><i class="fas fa-minus"></i></span>
                                                    <input type="number">
                                                    <span><i class="fas fa-plus"></i></span>
                                                </div>

                                                <div class="_cart_table_itm_mdl_dlt">
                                                    <span><i class="fa fa-trash-o"></i></span>
                                                </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div> -->
                                 <!-- CART TABLE ITEM -->

                                   <!-- CART TABLE ITEM -->
                                 <!-- <div class="_cart_table_itm">
                                     <div class="_cart_table_itm_lft">
                                         <a href="">
                                             <img src="https://admin.dreamsgallerybd.com/uploads/3tOFT4Ese8O2msqdFPMAM0W6vlbX9XM6KS3AjhSg.png" alt="image">
                                         </a>
                                     </div>
                                     <div class="_cart_table_itm_r8">


                                         <div class="_cart_table_itm_mdl">
                                             <div class="_cart_table_itm_mdl_one">
                                                <div class="_cart_table_itm_one_txt">
                                                     <p class="_cart_table_itm_r8_txt">
                                                      Focallure Liquid Matte Lipstick 01 - FAF24
                                                   </p>
                                                </div>

                                                <div class="_cart_table_itm_one_price">
                                                     <p>
                                                       2 <span>x</span> 150
                                                     </p>
                                                    <p>300</p>
                                                </div>

                                             </div>
                                             <div class="_cart_table_itm_mdl_two">

                                                 <div class="_pro_qty _pro_qty1">
                                                    <span><i class="fas fa-minus"></i></span>
                                                    <input type="number">
                                                    <span><i class="fas fa-plus"></i></span>
                                                </div>

                                                <div class="_cart_table_itm_mdl_dlt">
                                                    <span><i class="fa fa-trash-o"></i></span>
                                                </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div> -->
                                 <!-- CART TABLE ITEM -->
                             </div>
                         </div>

                        <div class="row">

                            <div class="col-lg-6 col-12 mb-5">
                                <!-- Calculate Shipping -->
                                <div class="calculate-shipping">
                                    <h4>Calculate Shipping</h4>
                                    <form v-on:submit.prevent>
                                        <div class="row">
                                            <div class="col-md-6 col-12 mb-25">
                                                <!-- <Select class="_2select" v-model="country" placeholder="Select Your Country">
                                                    <Option value="Bangladesh" >Bangladesh</Option>
                                                </Select> -->
                                                 <select class="_2select" v-model="country" v-on:change="getVariableProduct"  >
                                                    <option selected value="Bangladesh" >Bangladesh</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-12 mb-25 _noborder">
                                                <!-- <Select placeholder="Select Your District" class="_2select" v-model="order.billingCity" @on-change="changeShippingPrice"  filterable>
                                                    <Option value="" disabled selected >Choose Your District </Option>
                                                    <Option v-for="(item,index) in zones" :key="index" :value="item.zoneName" >{{item.zoneName}}</Option>
                                                </Select> -->
                                                 <select class="_2select" v-model="order.billingCity" v-on:change="changeShippingPrice"  >
                                                    <option selected value="" disabled  >Select Your District</option>
                                                    <option v-for="(item,index) in zones" :key="index" :value="item.zoneName">{{item.zoneName}}</option> 
                                                </select>
                                            </div>
                                            <!-- <div class="col-md-6 col-12 mb-25">
                                               <input type="text" v-if="!isCoupon" placeholder="Postal / Zip Code" v-model="order.postCode">
                                            </div> -->
                                            <!-- <div class="col-md-6 col-12 mb-25">
                                                <input type="text" placeholder="Postcode / Zip">
                                            </div>
                                            <div class="col-md-6 col-12 mb-25">
                                                <button class="btn">Estimate</button>
                                            </div> -->
                                        </div>
                                    </form>
                                </div>
                                <!-- Discount Coupon -->
                                <div class="discount-coupon _dsnt_cpn" v-if=" !isReferral">
                                    <h4>Promo Code</h4>
                                    <form v-on:submit.prevent>
                                        <div class="row">
                                            <div class="col-md-6 col-6 mb-25">
                                                <input type="text" v-if="!isCoupon" placeholder="Promo Code" v-model="order.coupon">
                                                <input type="text" v-else disabled style="background: #d5d5d5;" placeholder="Promo Code" v-model="order.coupon">
                                            </div>
                                            <div class="col-md-6 col-6 mb-25">
                                                <button class="btn _btn1 _w_100" v-if="!isCoupon" @click="checkCoupon">Apply Code</button>
                                                <button class="btn _btn1" v-else @click="clearCoupon">Clear</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="discount-coupon _dsnt_cpn" v-if="!ismember && !isCoupon">
                                    <h4>Referral Code</h4>
                                    <form v-on:submit.prevent>
                                        <div class="row">
                                            <div class="col-md-6 col-6 mb-25">
                                                <input type="text" v-if="!isReferral" placeholder="Referral Code" v-model="order.referralCode">
                                                <input type="text" v-else disabled style="background: #d5d5d5;" placeholder="Referral Code" v-model="order.referralCode">
                                            </div>
                                            <div class="col-md-6 col-6 mb-25">
                                                <button class="btn _btn1 _w_100" v-if="!isReferral" @click="checkreferralCode">Apply Code</button>
                                                <button class="btn _btn1" v-else @click="clearreferralCode">Clear</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                                <div class="discount-coupon _dsnt_cpn" v-if="userBonus>0 && order.giftVoucherAmount==0 && authInfo.customer.barcode != null" >
                                    <h4>DG PAY (৳ {{userBonus}})</h4>
                                    <form v-on:submit.prevent="checkDGMoney">
                                        <div class="row">
                                            <template v-if="!isDGMoney">
                                                <div class="col-md-6 col-12 mb-25">
                                                    <button class="btn _w_100 "  @click="isDGMoney=true">Add</button>
                                                </div>
                                            </template >
                                            <template v-else-if="isDGMoney">
                                                <div class="col-md-6 col-12 mb-25">
                                                    <input type="number" v-if="order.isDGMoney == 0" v-model="order.dgAmount" min="1" :max="userBonus" required>
                                                    <input type="number" v-else-if="order.isDGMoney == 1" disabled style="background: #d5d5d5;"  v-model="order.dgAmount">
                                                </div>
                                                <div class="col-md-6 col-12 mb-25">
                                                    <button class="btn"  v-if="order.isDGMoney == 0" >Apply</button>
                                                    <button class="btn _btn1" v-else-if="order.isDGMoney == 1" @click="clearDGMoney">Clear</button>
                                                </div>
                                            </template>
                                        </div>
                                    </form>
                                </div>
                                <div class="discount-coupon _dsnt_cpn" v-if="order.isDGMoney==0" >
                                    <h4>Gift Voucher</h4>
                                    <form v-on:submit.prevent>
                                        <div class="row">
                                            <template v-if="!isGiftVoucher">
                                                 <div class="col-md-6 col-6 mb-25">
                                                    <input type="text" placeholder="Gift Voucher">
                                                </div>
                                                <div class="col-md-6 col-6 mb-25">
                                                    <button class="btn _btn1 _w_100"  @click="isGiftVoucher=true">Apply Code</button>
                                                </div>

                                            </template>
                                            <template v-else-if="isGiftVoucher">
                                                <div class="col-md-6 col-6 mb-25">
                                                    <input type="text" v-if="order.giftVoucherAmount == 0" placeholder="Gift Voucher Code" v-model="order.giftVoucherCode">
                                                    <input type="text" v-else disabled style="background: #d5d5d5;"  v-model="order.giftVoucherCode">
                                                </div>
                                                <div class="col-md-6 col-6 mb-25">
                                                    <button class="btn _btn1 _w_100" v-if="order.giftVoucherAmount == 0" @click="checkGiftVoucherCode">Apply Code</button>
                                                    <button class="btn _btn1" v-else @click="clearGiftVoucherCode">Clear</button>
                                                </div>
                                            </template>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <!-- Cart Summary -->
                            <div class="col-lg-6 col-12 mb-30 d-flex">
                                <div class="cart-summary">
                                    <div class="cart-summary-wrap">
                                        <h4>Cart Summary</h4>
                                        <p>Sub Total <span>৳ {{subTotalCost}}</span></p>
                                        <p v-if="order.refferalDiscount >0  && order.referralCode !=0 && isReferral">Referral Discount <span> {{parseInt(this.settings.refererBonus)}}%</span></p>
                                        <p v-if="order.promoDiscount >0 && order.coupon !=0 && order.discountType == 'Promo Code' " >Promo Code Discount <span> {{order.promoDiscount}}%</span></p>
                                        <p  v-else-if="order.membershipDiscount  >0 && order.discountType == 'Membership Discount'">Membership Discount <span> {{order.membershipDiscount}}%</span></p>
                                        <p  v-if="order.giftVoucherAmount  >0">Gift Voucher ({{order.giftVoucherCode}}) <span> - ৳ {{order.giftVoucherAmount}}</span></p>
                                        <p  v-if="order.isDGMoney">DG Money <span> - ৳ {{order.dgAmount}}</span></p>
                                        <p style="border-top: 1px solid #292929;">Total <span>৳ {{totalCost}}</span></p>
                                        <p v-if="order.roundAmount>0">Rounding(+-)  <span>৳ -{{order.roundAmount}}</span></p>
                                        <p v-if="order.billingCity">Shipping Cost <span>৳ {{order.shippingPrice}}</span></p>
                                        <h2>Grand Total <span>৳ {{totalCostWithShipping}}</span></h2>
                                    </div>
                                    <div class="cart-summary-button _cart_btn_a">
                                        <button class="btn" @click="goToCheckout()" >Checkout</button>
                                        <!-- <button class="btn">Update Cart</button> -->
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <!--Cart section end-->
    </div>
</template>
<script>
import { parse } from 'upath'
import {mapGetters} from 'vuex';
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
