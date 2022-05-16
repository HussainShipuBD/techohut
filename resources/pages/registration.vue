

<template>
    <div>
        <div class="_1content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-5 col-lg-5">
                        <div class="_login_main">
                            <h1 class="_login_title">Signup</h1>
                            
                            <div class="_1input_group">
                                <p class="_1label">First name</p>
                                <input  v-model="firstName" class="_account_input" placeholder="First name">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Last name</p>
                                <input v-model="form_data.lastName" class="_account_input" placeholder="Last name">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Phone</p>
                                <input v-model="form_data.contact" class="_account_input" placeholder="Phone">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Email</p>
                                <input v-model="form_data.email" class="_account_input" placeholder="Email">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Password</p>
                                <input v-model="form_data.password" class="_account_input" :type="isPasswordShow == true ? 'text' : 'password'" placeholder="Password">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Confirm password</p>
                                <input v-model="form_data.cpassword" class="_account_input" :type="isPasswordShow == true ? 'text' : 'password'" placeholder="Confirm password" @keyup.enter="registar">
                            </div>

                            <div class="_1input_button">
                                <button  @click="registar" class="_1btn">Signup</button>
                            </div>
                            
                            <p class="_login_dont">Already have an account? <nuxt-link to="/login">Login</nuxt-link></p>
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
            }
        }
    },
    methods:{
        async registar(){
            if(this.firstName == '' || this.firstName.trim() == '') return this.i("First Name is empty!")
            if(this.lastName == '' || this.lastName.trim() == '') return this.i("Last Name is empty!")
            if(this.form_data.email == '' || this.form_data.email.trim() == '') return this.i("Email is empty!")
            this.form_data.name = this.firstName+' '+this.lastName
            if(this.form_data.contact == '' || this.form_data.contact.trim() == '') return this.i("Phone Number is empty!")
            if(this.form_data.contact.length !== 11 ) return this.i("Phone Number digit is not 11 !")
            if(this.form_data.password == '' || this.form_data.password.trim() == '') return this.i("Password is empty!")
            if(this.form_data.cpassword == '') return this.i("Password doesn't match!")
            if(this.form_data.cpassword.trim() != this.form_data.password.trim()) return this.i("Password doesn't match!")
            this.form_data.username = this.form_data.contact
            let t_data = _.clone(this.form_data)
            delete t_data.cpassword
            const res = await this.callApi('post','/app/registration',t_data)
            if(res.status == 200){
                // this.$store.dispatch('setAuthInfo', res.data.user)
                // this.$store.dispatch('setToken', res.data.token)
                // this.$ls.set('token', res.data.token)
                this.s("Registration successful! A One-Time Password (OTP) has been sent to your registered mobile number.")
                // if(this.$route.query.callback) return this.$router.push(this.$route.query.callback)
                this.$router.push(`/account-activation?contact=${res.data.user.contact}&callback=${this.$route.query.callback? this.$route.query.callback : ''}`)
                // else this.$router.push('/')
            }
            else if (res.status == 400){
              console.log(res.data.error.messages)
                for(let d of res.data.error.messages){
                    this.e(d.message)
                }
            }
            else if (res.status == 401){

                    this.e(res.data.message)

            }
            else {
                this.swr()
            }
        }

    },
    created(){
        if(this.authInfo) this.$router.push('/')
    }
}
</script>

<style  scoped>
span.textbox {
	    /* background-color: #FFF;
	    color: #888;
	    line-height:20px;
	    height:20px;
	    padding:3px;
	    border:1px #888 solid;
	    font-size:9pt; */
        width: 100%;
        padding: 0 15px;
        height: 45px;
        border: 1px solid #dddddd;
        color: #929292;
        border-radius: 5px;
}

span.textbox input {
      /* border: 0px; */
	    background-color: #FFF;
  }
  input[type="number"]:focus {

  }
</style>
