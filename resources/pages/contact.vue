

<template>
    <div id="main-wrapper">
        <!--Contact section start-->
        <div class="">
            <div class="container">
                <div class="_contact">
                    <div class="row">
                        <div class="col-lg-3 col-12">
                            <div class="contact-information">
                                <h3>Contact Us</h3>
                                <ul>
                                    <li>
                                        <span class="icon"><i class="fa fa-home"></i></span>
                                        <h4 class="text">Address</h4>
                                        <p class="sha_title">Showroom 1</p>
                                        <p class="_mar_b20">#904, City Centre, 9th floor, Zindabazar, Sylhet</p>

                                        <p class="sha_title">Showroom 2</p>
                                        <p>#Shop 04, Ground Floor, Elegant Shopping Mall, Zindabazar, Sylhet</p>
                                    </li>
                                    <li>
                                        <span class="icon"><i class="fa fa-envelope-open-o"></i></span>
                                        <h4 class="text">Email</h4>
                                        <p>info@dreamgallerybd.com<br>
                                            support@dreamgallerybd.com</p>
                                    </li>
                                    <li>
                                        <span class="icon"><i class="fa fa-phone"></i></span>
                                        <h4 class="text">Phone</h4>
                                        <!-- <p>Mobile: (+88) 01611141115</p> -->
                                        <p>Mobile: +09678120120</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-9 col-12">
                            <div class="contact-form-wrap">
                                <h3 class="contact-title">Tell Us Your Message</h3>
                                <form id="contact-form" v-on:submit.prevent >
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="contact-form-style mb-20">
                                                <input name="con_name" placeholder="Name*" v-model="form_data.name" type="text">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="contact-form-style mb-20">
                                                <input name="con_email" placeholder="Email" v-model="form_data.email" type="email">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="contact-form-style mb-20">
                                                <input name="con_email" placeholder="Contact" v-model="form_data.contact" type="text">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="contact-form-style mb-20">
                                                <input name="subject" placeholder="Subject*" v-model="form_data.subject" type="text">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="contact-form-style">
                                                <textarea name="con_message" placeholder="Type your message here.." v-model="form_data.content"></textarea>
                                                <button class="btn" type="submit" @click="onSubmit"><span>Send message</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <p class="form-messege"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Contact section end-->

       

    </div>
</template>

<script>
export default {
    data(){
        return{
            form_data:{
                name:'',
                email:'',
                contact:'',
                subject:'',
                content:'',
            }
        }
    },
    methods:{
        async onSubmit(){
            if(this.form_data.name.trim() == '') return this.i("Name is empty!");
            if(this.form_data.contact.trim() == '') return this.i("Contact is empty!");
            if(this.form_data.contact.length !== 11) return this.i("Contact format is incorrect!");
            if(this.form_data.subject.trim() == '') return this.i("Subject is empty!");
            if(this.form_data.content.trim() == '') return this.i("Message is empty!");
            
            const res = await this.callApi('post','/app/contactus',this.form_data)
            if(res.status == 200){
                this.s("Message Submitted!")
                let form_data={
                    name:'',
                    email:'',
                    contact:'',
                    subject:'',
                    content:'',
                }
                this.form_data = form_data
            }
        }
    }
}
</script>