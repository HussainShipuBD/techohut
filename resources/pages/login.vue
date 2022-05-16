

<template>
    <div>
        <div class="_1content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-5 col-lg-5">
                        <div class="_login_main">
                            <h1 class="_login_title">Login</h1>
                            
                            <div class="_1input_group">
                                <p class="_1label">Phone</p>
                                <input v-model="form_data.contact" class="_account_input" placeholder="Phone">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Password</p>
                                <input class="_account_input" :type="isPasswordShow == true ? 'text' : 'password'" placeholder="Password" v-model="form_data.password"  @keyup.enter="login">

                                <!-- <p class="_sufix_icon" @click="isPasswordShow=!isPasswordShow">
                                    <i class="far fa-eye" v-if="!isPasswordShow"></i>
                                    <i  class="far fa-eye-slash" v-if="isPasswordShow"></i>
                                </p> -->

                                <p class="_forget"><nuxt-link style="color: green;" to="/forget-password">Forgot password?</nuxt-link></p>
                            </div>
                            <div class="_1input_button">
                                <button  @click="login" class="_1btn">Login</button>
                            </div>
                            
                            <p class="_login_dont">Don't have an account? <nuxt-link to="/registration">Signup</nuxt-link></p>
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
            form_data:{
                contact:'',
                password:'',
            },
             isPasswordShow:false,
        }
    },
    methods:{
        async login(){
            if(this.form_data.contact.trim() == '') return this.i("Phone Number is empty!")
            if(this.form_data.password.trim() == '') return this.i("Password is empty!")

            const res = await this.callApi('post','/app/login',this.form_data)
            console.log("is this is ok")
            if(res.status == 200){
                this.$store.dispatch('setAuthInfo', res.data.user)
                this.$store.dispatch('setToken', res.data.token)
                this.$ls.set('token', res.data.token)
                // this.$store.dispatch('setAuthInfo', res.data.user)
                // this.$store.dispatch('setToken', res.data.token)
                // this.setCookie("token", res.data.token);
                this.s("Login successful !")
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
            else if (res.status == 401){
                // for(let d of res.data)
                 this.e(res.data.message)
            }
            else if (res.status == 402){
                // this.i("Account varification required!")
                this.i("A One-Time Password (OTP) has been sent to your registered mobile number")
                this.$router.push(`/account-activation?contact=${this.form_data.contact}&callback=${this.$route.query.callback? this.$route.query.callback : ''}`)
            }
            else{
                this.swr()
            }
        }

    },
    created(){

        if(this.authInfo) this.$router.push('/')

    }
}
</script>
