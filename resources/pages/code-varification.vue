

<template>

    <div >
      <div class="_1content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-5 col-lg-5">
                        <div class="_login_main">
                            <h1 class="_login_title">Password Reset Code</h1>

                            <div class="_1input_group">
                                <p class="_1label">Please enter the OTP</p>
                                <input type="text" placeholder="Please enter the OTP " class="_account_input"  v-model="form_data.token" @keyup.enter="onSubmit">
                            </div>
                            <div class="_1input_button">
                                <button class="_1btn" @click="onSubmit" style="margin-bottom: 10px;">{{sendLoading? 'SENDING...' : 'SEND'}}</button>
                                <button class="_1btn" @click="sendCodeAgain">{{sendCodeAgainLoading? 'SENDING...' : 'SEND CODE AGAIN'}}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

              <!-- New -->
        <div class="_1login" v-if="previous_design">
            <div class="_1login_con">
                <div class="_1login_logo">
                    <nuxt-link to="/"><img  src="/img/mainLogo.svg" alt="" title=""></nuxt-link>
                </div>

                <h1 class="_login_title">Password Reset Code</h1>

                <div class="_1login_main">
                    <div class="_1login_group">
                        <div class="_1input_main">
                            <p class="_pre_icon">
                                <i style="transform: rotate(90deg);"  class="fas fa-lock"></i>
                            </p>
                            <input type="text" placeholder="Please enter the OTP "  v-model="form_data.token" @keyup.enter="onSubmit">
                        </div>
                    </div>
                    <div class="_1login_button">
                        <button type="button" @click="onSubmit" style="margin-bottom: 10px;">{{sendLoading? 'SENDING...' : 'SEND'}}</button>
                        <button type="button" @click="sendCodeAgain">{{sendCodeAgainLoading? 'SENDING...' : 'SEND CODE AGAIN'}}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- New -->

        <!--Login Register section start-->
        <div class="login-register-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50" v-if="previous_design">
            <div class="container sb-border pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20">
                <div class="row justify-content-center">
                        <!--Login Form Start-->
                        <div class="col-md-6 col-sm-6">
                            <div class="customer-login-register">
                                <div class="form-login-title ">
                                    <h2 class="text-center">Password Reset Code</h2>
                                </div>
                                <div class="login-form">
                                    <form v-on:submit.prevent>
                                        <div class="form-fild">
                                            <p><label>Please enter the OTP below <span class="required">*</span></label></p>
                                            <input name="username" value="" type="text" v-model="form_data.token">
                                        </div>
                                        <div class="login-submit">
                                            <button type="submit" class="btn" @click="onSubmit" >{{sendLoading? 'Sending...' : 'Send'}}</button>
                                            <button style="float: right;"  class="btn" @click="sendCodeAgain" >{{sendCodeAgainLoading? 'Sending...' : 'Send Code Again'}}</button>
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
            sendCodeAgainLoading:false,
        }
    },
    methods:{
        async onSubmit(){
            if(this.sendLoading) return
            if(this.form_data.token == '') return this.i("Phone Number is empty!")
            if(this.form_data.email.trim() == '') return this.i("Contact is empty!")
            this.sendLoading = true;

            const res = await this.callApi('post','/app/getResetMessage',this.form_data)
            console.log("is this is ok")
            if(res.status == 200){

                this.i(" Please Reset your password")
                this.$router.push(`/reset-password?contact=${this.form_data.email}&token=${this.form_data.token}`)
            }
            else if(res.status == 404) this.w(res.data.message)

             this.sendLoading = false;
        },
         async sendCodeAgain(){
            if(this.sendCodeAgainLoading) return
            let data= {
                contact : this.$route.query.contact
            }

            if(data.contact.trim() == '') return this.i("Contact is empty!")

            this.sendCodeAgainLoading = true

            const res = await this.callApi('post','/app/sendActivationCode',data)
            if(res.status == 200){

                this.i("A One-Time Password (OTP) has been sent to your registered mobile number ...")

            }
            else{
                this.swr();
            }
            this.sendCodeAgainLoading = false
        }

    },
    created(){
        this.form_data.email = this.$route.query.contact
    }
}
</script>
