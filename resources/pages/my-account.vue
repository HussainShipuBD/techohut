

<template>

    <div id="main-wrapper">
        <!-- Mobile -->
        <div class="_pro_all _pro_all_mob">
          <div class="_pro_top">
            <div class="_pro_pic_main">
              <div class="_pro_pic">
                <img class="_pro_img" src="https://finesse.dreamsgallerybd.com/uploads/NuS7PcOdacP4Xhlm59jRKuzZHit6WYFdLTGuZJKk.jpg" alt="" title="">
              </div>
              <p class="_pro_pic_icon"><i class="fas fa-camera"></i></p>
            </div>

            <p class="_pro_name">Bokor Talukdar</p>

            <p class="_pro_check" @click="changeTab('Dashboard')"><span>Dashboard</span></p>

            <ul class="_pro_list">
              <li @click="changeTab('Orders')">
                <div class="_pro_list_icon"><i class="fas fa-list-alt"></i></div>
                <p class="_pro_list_text" >My Orders</p>
              </li>
              <li  @click="changeTab('Account Details')">
                <div class="_pro_list_icon"><i class="far fa-user"></i></div>
                <p class="_pro_list_text">Account</p>
              </li>
              <li @click="changeTab('Address')">
                <div class="_pro_list_icon"><i class="far fa-comment-dots"></i></div>
                <p class="_pro_list_text">Address</p>
              </li>
              <li>
                <div class="_pro_list_icon"><i class="fas fa-list-ul"></i></div>
                <p class="_pro_list_text">Pre Orders</p>
              </li>
            </ul>

            <ul class="_pro_menu" >
              <li @click="changeTab('notification')"><i class="fas fa-bell"></i>Notifications</li>
              <!-- <li><i class="fas fa-newspaper"></i>Payment History</li>
              <li><i class="fas fa-phone"></i>Contact Us</li>
              <li><i class="fas fa-file-alt"></i>Terms & Conditions</li> -->
              <li @click="changeTab('Report Issue')"><i class="fas fa-exclamation-triangle"></i>Report Issue</li>
              <li @click="logout"><i class="fas fa-sign-out-alt"></i>Sign Out</li>
            </ul>
          </div>
        </div>
        <!-- Mobile -->

        <!--My Account section start-->
        <div class="my-account-section _my_account section pt-md-70">
            <div class="container sb-border pb-100 pb-lg-80 pb-md-70 pb-sm-60 pb-xs-50">
                <div class="row">
                    
                    <div class="col-12">
                        <div class="row">
                            <!-- My Account Tab Menu Start -->
                            <div class="col-lg-3 col-12">
                                <div class="myaccount-tab-menu nav" role="tablist">
                                    <div class="dashboard-menu_pro">
                                        <div class="dashboard-menu_pro_pic">
                                            <img src="https://finesse.dreamsgallerybd.com/uploads/NuS7PcOdacP4Xhlm59jRKuzZHit6WYFdLTGuZJKk.jpg" alt="" title="" class="dashboard-menu_pro_img">
                                        </div> 
                                        
                                        <p class="dashboard-menu_pro_text">Nazmul Chowdhury</p>
                                    </div>

                                    <a @click="tab = 'Dashboard'" :class="(tab == 'Dashboard')? 'active' : ''" ><i class="fa fa-dashboard"></i>Dashboard</a>
                                    <a @click="tab = 'Orders'" :class="(tab == 'Orders')? 'active' : ''"  ><i class="fa fa-cart-arrow-down"></i>My Orders</a>
                                    <a @click="tab = 'notification'" :class="(tab == 'notification')? 'active' : ''"  ><Icon type="ios-notifications" />  Notification</a>
                                    <a @click="tab = 'Address'" :class="(tab == 'Address')? 'active' : ''"  ><i class="fa fa-map-marker"></i> Address</a>
                                    <a @click="tab = 'Account Details'" :class="(tab == 'Account Details')? 'active' : ''"  ><i class="fa fa-user"></i> Account Details</a>
                                    <a @click="tab = 'Report Issue'"  :class="(tab == 'Report Issue')? 'active' : ''"  ><i class="fa fa-credit-card"></i> Report Issue</a>
                                    <a @click="logout"  ><i class="fa fa-sign-out"></i> Sign out</a>
                                </div>
                            </div>
                            <!-- My Account Tab Menu End -->
    
                            <!-- My Account Tab Content Start -->
                            <div class="col-lg-9 col-12">
                                <div class="tab-content _tab_content" >
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade show active" v-if="tab=='Dashboard'">
                                        <div class="myaccount-content">
                                            <h3>Dashboard</h3>
    
                                            <div class="welcome mb-20">
                                                <p v-if="authInfo.customer">
                                                    Hello, <strong>{{authInfo.name}}</strong> <strong v-if="authInfo.customer.barcode !=null">(Platinum Member)</strong>
                                                    <!-- (If Not <strong>Tuntuni !</strong><a href="login-register.html" class="logout"> Logout</a>) -->
                                                </p>
                                            </div>
    
                                            <p class="mb-0 _text_justify">From your account dashboard. you can easily check &amp; view your
                                                recent orders, manage your shipping and billing addresses and edit your
                                                password and account details.</p>
                                            <!-- <p v-if="userBonus>0" class="mb-0"><strong>You have ৳ {{userBonus}} DG Money.</strong></p> -->


                                            <ul class="_dash_box">
                                                <li v-if="userBonus>0">
                                                    <p class="_dash_box_title">DG Money</p>
                                                    <p class="_dash_box_text">৳ {{userBonus}}</p>
                                                </li>
                                                <!-- <li>
                                                    <p class="_dash_box_title">Dashh</p>
                                                    <p class="_dash_box_text">7398745</p>
                                                </li>

                                                <li>
                                                    <p class="_dash_box_title">Dashh</p>
                                                    <p class="_dash_box_text">7398745</p>
                                                </li> -->
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- Single Tab Content End -->
    
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active" v-if="tab=='Orders'">
                                        <div class="myaccount-content">
                                            <h3>Orders</h3>
    
                                            <div class="myaccount-table table-responsive text-center">
                                                <table class="table table-bordered">
                                                    <thead class="thead-light">
                                                    <tr>
                                                        <th>SN</th>
                                                        <th>Order Date</th>
                                                        <th>Order ID</th>
                                                        <th>Sub Total</th>
                                                        <th>Shipping Cost</th>
                                                        <th>Discount</th>
                                                        <th>Grand Total</th>
                                                        <th>Refarence</th>
                                                        <th>Discount Type</th>
                                                        <th>Payment Type</th>
                                                        <th>Payment status</th>
                                                        <th>Invoice</th>
                                                        <th>Track Order</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
    
                                                    <tbody>
                                                    <tr v-for="(item,index) in orders" :key="index">
                                                        <td>{{(index+1) + ((pages.page-1)*(pages.perPage))}}</td>
                                                        <td>{{ item.created_at}}</td>
                                                        <td>PX{{ item.id }}</td>
                                                        <td>{{ item.subTotal }}</td>
                                                        <td>{{ item.shippingPrice }}</td> 
                                                        <td>{{ item.discount }}</td>
                                                        <td>{{ (parseInt(item.grandTotal) + parseInt(item.shippingPrice)) - (parseInt(item.dgAmount) +  parseInt(item.giftVoucherAmount)) }}</td>
                                                        <td>{{ item.referralCode? item.referralCode:''  }}</td>
                                                        <td>{{ item.discountType? item.discountType : '' }}</td>
                                                        <td>{{ item.paymentType | fixedPaymentType }}</td>
                                                        <td class="_text_center">{{ item.paymentStatus }} <br/>
                                                            <template v-if="item.paymentStatus == 'Pending' && item.paymentType=='sslcommerz'">
                                                                <Button class="_mar_t5" type="success" @click="payNow(item)">Pay Now</Button>
                                                            </template>
                                                        </td>

                                                        <template v-if="item.status == 'Canceled'">
                                                            <td><Button type="success" disabled >view</Button></td>
                                                        </template>
                                                        <template v-else>
                                                            <td><Button type="success" @click="viewInvoice(item)">view</Button></td>
                                                        </template>
                                                        <template v-if="item.status == 'Exchange' || item.status == 'Returned' || item.status == 'Canceled'  ">
                                                            <td><Button type="error" disabled >view</Button></td>
                                                        </template>
                                                        <template v-else>
                                                            <td><Button type="error" @click="viewTracking(item)">view</Button></td>
                                                        </template>
                                                        <td>{{ item.status }}</td>
                                                        <td>
                                                            <Icon v-if="item.status == 'Order Placed'" @click="beforeCancelOrder(item)" class="del_icon" style="" type="md-trash" />
                                                            <Tooltip v-else-if="item.status == 'Canceled'" placement="top">
                                                                <Icon  style="font-size: 25px;" type="md-trash" />
                                                                <div slot="content">
                                                                    <p>This order already Canceled </p>
                                                                    <!-- <p><i>Can customize the style</i></p> -->
                                                                </div>
                                                            </Tooltip>
                                                            <Tooltip v-else placement="top">
                                                                <Icon  style="font-size: 25px;" type="md-trash" />
                                                                <div slot="content">
                                                                    <p>This order already in {{item.status}} </p>
                                                                    <!-- <p><i>Can customize the style</i></p> -->
                                                                </div>
                                                            </Tooltip>
                                                            
                                                            <!-- <Button type="error" @click="viewInvoice(item)">Cancel</Button> -->
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="text-align: center;" class="_mar_t20">
                                                <Page :current="pages.page" :total="pages.total" @on-change="getOrders" :page-size="parseInt(pages.perPage)" />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Single Tab Content End --> 
    
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active" v-if="tab=='notification'">
                                        <div class="myaccount-content">
                                            <div class="myaccount-table table-responsive text-center">

                                                <div class=" ">
                                                    <div class="_noti_top">
                                                        <p class="_noti_title">Notifications</p> <a href="" class="_noti_read">Mark All as Read</a></div>
                                                    <div class="_noti_main">
                                                        <div class="_noti_items " v-for="(item,index) in notiDetails" :key="index" :class="(item.seen==false)? 'active' : ''">
                                                            <div class="_noti_pic"> <span class="_noti_img"><i class="fas fa-bell" ></i></span>
                                                                <!-- <img src="https://admin.bahrainunique.com//uploads/notification.png" alt="" title="" class="_noti_img"> -->
                                                            </div>
                                                            <div class="_noti_details" @click="updateNoti(index)">
                                                                <p class="_noti_details_title _text_overflow">{{item.title}}</p>
                                                                <p class="_noti_message">{{item.msg}}</p>
                                                                <p class="_noti_details_text _text_overflow">{{item.created_at}}</p>
                                                            </div>
                                                            <div class="_noti_unseen"><i class="fas fa-ellipsis-h"  @click="openNotiOptionMenu"></i>
                                                            <!-- <ul class="_noti_unseen_list" v-if="isNotiOptionMenu && isNotiOptionMenuIndex==index" v-on-clickaway="closeNotiOptionMenu" >
                                                                <li @click="updateNoti(index)">seen</li>
                                                                <li @click="deleteNoti(index)">Delete</li>
                                                            </ul> -->
                                                                <!---->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <!-- <table class="table table-bordered">
                                                    <thead class="thead-light">
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Date</th>
                                                        <th>Expire</th>
                                                        <th>Download</th>
                                                    </tr>
                                                    </thead>
    
                                                    <tbody>
                                                    <tr>
                                                        <td>Mostarizing Oil</td>
                                                        <td>Aug 22, 2018</td>
                                                        <td>Yes</td>
                                                        <td><a href="#" class="btn">Download File</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Katopeno Altuni</td>
                                                        <td>Sep 12, 2018</td>
                                                        <td>Never</td>
                                                        <td><a href="#" class="btn">Download File</a></td>
                                                    </tr>
                                                    </tbody>
                                                </table> -->
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Single Tab Content End -->
    
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active" v-if="tab=='Report Issue'">
                                        <reports/>
                                    </div>
                                    <!-- Single Tab Content End -->
    
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active" v-if="tab=='Address'">
                                        <div class="myaccount-content">
                                            <h3>Billing Address</h3>
    
                                            <address>
                                                <p><strong>{{ authInfo.name }}</strong></p>
                                                <p>{{ authInfo.customer.address }} <br>
                                                    {{ authInfo.customer.zone }}</p>
                                                <p>Mobile: {{ authInfo.contact }}</p>
                                            </address>
    
                                            <a @click="tab = 'Account Details'" class="btn _txt_wht d-inline-block edit-address-btn"><i class="fa fa-edit"></i>Edit Address</a>
                                        </div>
                                    </div>
                                    <!-- Single Tab Content End -->
    
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active" v-if="tab=='Account Details'">
                                        <div class="myaccount-content">
                                            <h3>Account Details</h3>
    
                                            <div class="account-details-form">
                                                <form v-on:submit.prevent>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-12 mb-30">
                                                            <label>Name*</label>
                                                            <input v-model="from.name" placeholder="Name" type="text">
                                                        </div>
                                                        
                                                        <div class="col-lg-6 col-12 mb-30">
                                                            <label>Email*</label>
                                                            <input v-model="from.email" placeholder="Email" type="email">
                                                        </div>

                                                        <div class="col-lg-6 col-12 mb-30">
                                                             <label>Contact*</label>
                                                            <input v-model="from.contact" placeholder="Contact" type="text" disabled>
                                                        </div>
                                                        
                                                        <div class="col-lg-6 col-12 mb-30"> 
                                                            <label>District *</label>
                                                            <Select v-model="from.customer.zoneId" class="only">
                                                                <Option value="" disabled="disabled" selected="selected">Choose a Region</Option> 
                                                                <Option v-for="(item, index) in zones" :key="index" :value="item.id">{{ item.zoneName }}</Option>
                                                            </Select>
                                                        </div>
                                                        <div class="col-lg-6 col-12 mb-30">
                                                            <label>Postal Code *</label>
                                                            <input v-model="from.customer.postCode" placeholder="Postal / Zip Code*" type="text" >
                                                        </div>

                                                        <div class="col-12 mb-30">
                                                             <label>Address*</label>
                                                            <input v-model="from.customer.address" placeholder="Address" type="text">
                                                        </div>
    
                                                        <div class="col-12 mb-30">
                                                             <label>Facebook Profile*</label>
                                                            <input v-model="from.customer.facebook" placeholder="Facebook" type="text">
                                                        </div>
    
                                                        <div class="col-12 mb-30">
                                                             <label>Instagram Profile*</label>
                                                            <input v-model="from.customer.instagram" placeholder="Instagram" type="text">
                                                        </div>
                                                        
    
                                                        <div class="col-12 mb-30">
                                                            <div class="check-box style=" style="display: flex; align-items: center;">
                                                                <input v-model="isPasswordChange" style="width:inherit" type="checkbox" id="shiping_address" data-shipping>
                                                                <h4 style="padding-left:4px;">Password change</h4>
                                                                <!-- <label for="shiping_address"></label> -->
                                                            </div>
                                                            
                                                        </div>
                                                        <template v-if="isPasswordChange">
                                                            <div class="col-12 mb-30">
                                                                <label>Current Password*</label>
                                                                <input id="current-pwd" placeholder="Current Password" type="password" v-model="password.oldPassword">
                                                            </div>
        
                                                            <div class="col-lg-6 col-12 mb-30">
                                                                <label>New Password*</label>
                                                                <input id="new-pwd" placeholder="New Password" type="password" v-model="password.password">
                                                            </div>
        
                                                            <div class="col-lg-6 col-12 mb-30">
                                                                <label>Confirm Password*</label>
                                                                <input id="confirm-pwd" placeholder="Confirm Password" type="password" v-model="password.cpassword">
                                                            </div>
                                                        </template>
                                                        
    
                                                        <div class="col-12">
                                                            <button @click="formSubmit" class="save-change-btn">Save Changes</button>
                                                        </div>
    
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Single Tab Content End -->
                                </div>
                            </div>
                            <!-- My Account Tab Content End -->
                        </div>
    
                    </div>
                    
                </div> 
            </div>           
        </div>
        <!--My Account section end-->
        <invoice/>
        <tracking/>
        


    </div>

</template>

<script>
import invoice from '~/components/invoice.vue'
import tracking from '~/components/tracking.vue'
import reports from '~/components/reports.vue'
export default {
    //middleware: 'authenticated',
    components: {
        invoice,
        tracking,
        reports,
    },
    data(){
        return{
            tab:'Dashboard',
            
            isPasswordChange:false,
            orders:[],
            notiDetails:[],
            isNotiOptionMenuIndex:-1,
            isNotiOptionMenu:false,
            zones:[],
            userBonus:0,
            from:{
                name:'',
                email:'',
                contact:'',
                username:'',
                customer:{
                    address:'',
                    zone : '',
                    postCode : '',
                    zoneId : '',
                    facebook : '',
                    instagram : '',
                }
            },
            password:{
                oldPassword:'',
                password:'',
                cpassword:''
            },
            pages:{
                lastPage: 1,
                page: 1,
                perPage: 5,
                total: 0,
                data:[]
            }
        }
    },
    
    methods:{
        async formSubmit(){
            if(this.from.name.trim() == '') return this.i("Name is Empty!") 
            // if(this.from.email.trim() == '') return this.i("Email is Empty!")
            if(this.from.contact.trim() == '') return this.i("Contact is Empty!")

            if(this.from.customer.address === '') return this.i("Address is Empty!")
            if(this.from.customer.zoneId == '') return this.i("Zone Id is Empty!")
            if(this.from.customer.facebook.trim() == '') return this.i("Facbook is Empty!")
            if(this.from.customer.instagram.trim() == '') return this.i("Instagram is Empty!")
            if(this.isPasswordChange){
                 if(this.password.oldPassword.trim() == '') return this.i("Current Password is Empty!")
                 if(this.password.password.trim() == '') return this.i("New Password is Empty!")
                 if(this.password.cpassword.trim() !== this.password.password.trim()) return this.i(" Password Doesn't match!")
                 this.from.password = this.password
            }
            else{
                delete this.from.password
            }
            this.from.customer.customerName = this.from.name
            this.from.customer.contact = this.from.contact
            this.from.customer.email = this.from.email
            let index = this.zones.findIndex(d => d.id == this.from.customer.zoneId)
            this.from.customer.zone = this.zones[index].zoneName
            const res = await this.callApi('post','app/user/edit', this.from)
            if(res.status == 200){
                this.s("Profile updated Successfully!");
                this.$store.commit('setAuthInfo', this.from)
            }
            else if(res.status == 401){
                this.e(res.data.message)

            }
            else{
                this.swr();
            }
        },
        async beforeCancelOrder(item){
            await this.$Modal.confirm({
                    title: 'Confimation',
                    content: '<p>Are you sure you want cancel this order!!</p>',
                    okText: 'OK',
                    cancelText: 'Cancel',
                    onCancel: () => {
                        return;
                    },
                    onOk: () => { 
                       this.cancelOrder(item)
                    },
                });
        },
        async cancelOrder(item){
            const res = await this.callApi('post','/app/cancelOrder',item) 
            if(res.status == 200){
                item.status = 'Canceled'
            }
            else this.swr();
        },
        async payNow(item){
            const res = await this.callApi('post','/app/payNow',item) 
            if(res.status == 200){
                window.location = res.data.ssldata.GatewayPageURL
            }
            else this.swr();
        },
        async logout() {
                try {
                   
                    this.$store.commit("updateAuthUser", false);
                     this.$ls.set('token', '')
                    window.location = '/'
                } catch (error) {
                    console.log(error);
                }
        },
        viewInvoice(item){
            this.$store.dispatch("setInvoiceModal", true);
            this.$store.dispatch("setInvoiceItem", item);
           
           
        },
        viewTracking(item){
            this.$store.dispatch("setTrackModal", true);
            this.$store.dispatch("setInvoiceItem", item);
        },
        openNotiOptionMenu(index){
            if(!this.isNotiOptionMenu) this.isNotiOptionMenuIndex = index
            this.isNotiOptionMenu = !this.isNotiOptionMenu
        },
        closeNotiOptionMenu(){
            this.isNotiOptionMenu = false
        },
        async updateNoti(index){
            // this.isNotificationMenu = true
            const res = await this.callApi('post','/app/updateNoti',{id:this.notiDetails[index].id})
            if(res.status == 200){
                // this.notiDetails = res.data.data
                this.notiDetails[index].seen = true
            }
            else{
                this.swr()
            }
            
        },
        async deleteNoti(index){
            // this.isNotificationMenu = true
            const res = await this.callApi('post','/app/deleteNoti',{id:this.notiDetails[index].id})
            if(res.status == 200){
                this.notiDetails = res.data.data
            }
            else{
                this.swr()
            }
            
        },
        async getOrders(page){
            // this.isNotificationMenu = true
            const res = await this.callApi('get',`/app/order?page=${page}`)
            if(res.status == 200){
                this.pages = res.data.order
                this.orders = res.data.order.data
            }
            else{
                this.swr()
            }
            
        },
    },
    watch: { 
      '$route.query': function(newVal, oldVal) { // watch it
        // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        if(newVal.tab){
            this.tab = newVal.tab
        }
      } 
    },
    async created(){
        if(this.$route.query.tab) this.tab = this.$route.query.tab
        const [res, res1,res2,res4] = await Promise.all([
            this.callApi('get', 'app/order'),
             this.callApi('get','app/zones'),
             this.callApi('get','/app/getNotiDetails'),
             this.callApi('get','/app/getOutstandingCustomer')
        ]) 
        if (res.status == 200 && res1.status == 200) {
            this.pages = res.data.order
            this.orders = res.data.order.data
            this.zones = res1.data.zones
            this.notiDetails = res2.data.notiDetails
            this.userBonus = res4.data.bonus.total

        }
        if (this.isLoggedIn) {
            this.from = _.clone(this.authInfo)
        }else{
           this.$router.push('/')
        }

    }
}
</script>

<style  scoped>
.del_icon{
    font-size: 25px;
    
    cursor: pointer;
}
.del_icon:hover{
    color: #ee3333;
}
</style>
