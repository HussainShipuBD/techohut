<template>
    <div>
        <div v-if="previous_design" class="_1content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-5 col-lg-5">
                        <div class="_login_main">
                            <h1 class="_login_title">Reset password</h1>
                            
                            <div class="_1input_group">
                                <p class="_1label">New password</p>
                                <input v-model="form_data.password" class="_account_input" type="password" placeholder="New password">
                            </div>
                            <div class="_1input_group">
                                <p class="_1label">Confirm Password</p>
                                <input v-model="form_data.cpassword" class="_account_input" type="password" @keyup.enter="reset" placeholder="Confirm Password">
                            </div>

                            <div class="_1input_button">
                                <button  @click="reset" class="_1btn">Signup</button>
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
            form_data:{
                contact:'',
                password:'',
                cpassword:'',
                token:'',
            },
             previous_design:false,
             sendLoading:false,
        }
    },
    methods:{
        async reset(){
          if(this.sendLoading) return;
            if(this.form_data.password.trim() == '') return this.i("Password is empty!")
            if(this.form_data.cpassword.trim() !== this.form_data.password.trim()) return this.i("Password doestn't match!")

            this.sendLoading = true;
            const res = await this.callApi('post','/app/reset-password',this.form_data)

            if(res.status == 200){
                this.s("Password has been reset! Please Login !")
                 this.$router.push('/login')
            }
            else if(res.status == 404){ this.w(res.data.message)

            }
            else{
                this.swr();
            }
            this.sendLoading = false;
        }

    },
    created(){
          this.form_data.contact = this.$route.query.contact
          this.form_data.token  = this.$route.query.token
    }
}
</script>
