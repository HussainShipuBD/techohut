

<template>
    <div>
        <div class="_1content" v-if="previous_design">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-5 col-lg-5">
                        <div class="_login_main">
                            <h1 class="_login_title">Password Reset</h1>

                            <div class="_1input_group">
                                <p class="_1label">Phone number</p>
                                <input v-model="form_data.contact" @keyup.enter="onSubmit" class="_account_input" placeholder="Phone number">
                            </div>

                            <div class="_1input_button">
                                <button type="submit" class="btn" @click="onSubmit" >{{sendLoading? 'Sending...' : 'Send'}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="_1content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-5 col-lg-5">
                        <div class="_login_main">
                            <h1 class="_login_title">Password Reset</h1>

                            <div class="_1input_group">
                                <p class="_1label">Phone number</p>
                                <input v-model="form_data.contact" @keyup.enter="onSubmit" class="_account_input" placeholder="Phone number">
                            </div>
                            <div class="_1input_button">
                                <button class="_1btn" @click="onSubmit">{{sendLoading? 'SENDING...' : 'SEND'}}</button>
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
            },
            previous_design:false,
             sendLoading:false,
        }
    },
    methods:{
        async onSubmit(){
          if(this.sendLoading) return
            if(this.form_data.contact.trim() == '') return this.i("Phone Number is empty!")
            this.sendLoading = true;
            const res = await this.callApi('post','/app/sendResetMessage',this.form_data)
            console.log("is this is ok")
            if(res.status == 200){

                this.s(" A varification code is sent to your number.")
                this.$router.push(`/code-varification?contact=${this.form_data.contact}`)
            }
            else if(res.status == 404) this.w(res.data.message)
            this.sendLoading = false;
        }

    },
    created(){

    }
}
</script>

<style >

</style>
