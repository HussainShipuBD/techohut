

<template>

    <div id="main-wrapper">

            <div class="_1login">
            <div class="_1login_con">
                <div class="_1login_logo">
                    <nuxt-link to="/"><img src="/img/mainLogo.svg" alt="" title=""></nuxt-link>
                </div>

                <h1 class="_login_title">Account Activation Code</h1>

                <div class="_1login_main">
                    <div class="_1login_group">
                        <div class="_1input_main _otp_group">
                            <div class="_otp">
                                <div class="_otp_item">
                                    <input type="text" placeholder="Activation Code..."  v-model="form_data.token" @keyup.enter="onSubmit">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="_1login_button _1login_button_group">
                        <button type="button" @click="onSubmit" style="margin-bottom:10px;">{{sendLoading?'Please wait...' :'Confirm'}} </button>
                        <button type="button" @click="sendCodeAgain">Send Code Again</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Login Register section start-->
        <div class="login-register-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50" v-if="previous_design" >
            <div class="container sb-border pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20">
                <div class="row justify-content-center">
                        <!--Login Form Start-->
                        <div class="col-md-6 col-sm-6">
                            <div class="customer-login-register">
                                <div class="form-login-title ">
                                    <h2 class="text-center">Account Activation Code</h2>
                                </div>
                                <div class="login-form">
                                    <form v-on:submit.prevent>
                                        <div class="form-fild">
                                            <p><label>Please enter the OTP below to verify your account<span class="required">*</span></label></p>
                                            <input name="username" value="" type="text" v-model="form_data.token">
                                        </div>
                                        <div class="login-submit">
                                            <button type="submit" class="btn" @click="onSubmit" >varified</button>
                                            <button style="float: right;"  class="btn" @click="sendCodeAgain" >Send Code Again</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!--Login Form End-->

                    </div>
            </div>
        </div>
        <!--Login Register section end-->


    </div>



</template>
<script>
export default {
    data(){
        return{
            form_data:{
                token:'',
                email:'',
            },
              previous_design:false,
             sendLoading:false,
        }
    },
    methods:{
        async onSubmit(){
          if(this.sendLoading) return
            if(this.form_data.token == '') return this.i("Code is empty!")
            if(this.form_data.email.trim() == '') return this.i("Contact is empty!")
            this.sendLoading = true
            const res = await this.callApi('post','/app/activeAccount',this.form_data)
            if(res.status == 200){

                this.$store.dispatch('setAuthInfo', res.data.user)
                this.$store.dispatch('setToken', res.data.token)
                this.$ls.set('token', res.data.token)
                // this.$store.dispatch('setAuthInfo', res.data.user)
                // this.$store.dispatch('setToken', res.data.token)
                // this.setCookie("token", res.data.token);
                this.s("Login successful !")
                 this.sendLoading = false
                this.getCartItemsServer()
                if(this.callCartOb){
                    let product = this.callCartOb;
                    let quantity = product.quantity
                    delete product.quantity;
                    this.addToCartServer(this.callCartOb,quantity)
                    this.$store.commit('setCallCartOb',null)
                    this.$router.push('/cart')
                    return
                }
                if(this.$route.query.callback) return this.$router.push(this.$route.query.callback)
                else this.$router.push('/')
            }
            else{

                if(res.status == 404) this.w(res.data.message)
                else this.swr()
            }

            this.sendLoading = false


        },
        async sendCodeAgain(){
            let data= {
                contact : this.$route.query.contact
            }

            if(data.contact.trim() == '') return this.i("Contact is empty!")

            const res = await this.callApi('post','/app/sendActivationCode',data)
            if(res.status == 200){

                this.i("A One-Time Password (OTP) has been sent to your registered mobile number ...")

            }
            else if(res.status == 422){

                this.e(res.data.message)

            }
            else{
                this.swr();
            }
        }

    },
    created(){
        this.form_data.email = this.$route.query.contact
    }
}
</script>
