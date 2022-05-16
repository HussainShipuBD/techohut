<template>
    <div>
        <div class="myaccount-content">
            <h3>Report Issue</h3>

            <div class="account-details-form">
                <form v-on:submit.prevent>
                    <div class="row">
                        <div class="col-lg-12 col-12 mb-30">
                            <label>Select Reason*</label>
                            <Select class="only" v-model="from.reason" style="width:100%">
                                <Option value="" disabled="disabled" selected="selected">--Reason--</Option> 
                                <Option v-for="(item, index) in reasons" :key="index" :value="item">{{ item }}</Option>
                            </Select>
                        </div>
                        
                        <div class="col-lg-12 col-12 mb-30">
                            <label>Order ID</label>
                            <input v-model="from.orderId" placeholder="Order ID" type="text">
                        </div>

                        <div class="col-12 mb-30">
                                <label>Description*</label>
                                <textarea class="_textarea" rows="6" v-model="from.description" placeholder="Description"></textarea>
                        </div>

                        <div class="col-12 col-md-6 mb-30">
                            <Upload
                                ref="upload"
                                type="drag"
                                :show-upload-list="false"
                                :with-credentials="true"
                                :on-success="handleSuccess"
                                v-if="from.image == ''"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                action="/app/upload-review-file">
                                <Button style="width: 100%;" icon="ios-cloud-upload-outline">Upload the Attchtment</Button>
                            </Upload>
                            <Card  span="10" offset="1" v-if="from.image">
                                <div class="addImageClass" >
                                    <img  style="width: 100%;height: auto;"  :src="from.image" >
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-trash-outline" @click.native="from.image=''"></Icon>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        

                        <div class="col-12">
                            <button @click="formSubmit" class="save-change-btn">Save Changes</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
         <div class="myaccount-content _mar_t20" v-if="pages.data.length>0">
            <h3>Report History</h3>
            <div class="myaccount-table table-responsive text-center">
                <table class="table table-bordered">
                    <thead class="thead-light">
                    <tr>
                        <th>SN</th>
                        <th>Report ID</th>
                        <th>Date</th>
                        <th>Order ID</th>
                        <th>Reason</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Response</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="(item,index) in pages.data" :key="index"> 
                        <td>{{ index + 1 }}</td>
                        <td>RX{{ item.id }}</td>
                        <td>{{ item.created_at | dateFixed }}</td>
                        <td>{{ item.orderId ? 'PX':'' }}{{ item.orderId }}</td>
                        <td>{{ item.reason }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.status }}</td>
                        <td>
                             <template v-if="item.response">
                                <Button size='small' @click="showResponse(item)"  type="info">View</Button>
                            </template>
                            <template v-else>
                                <Button size='small' type="info" disabled >View</Button>
                            </template>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align: center;" class="_mar_t20">
                <Page :current="pages.page" :total="pages.total" @on-change="getReports" :page-size="parseInt(pages.perPage)" />
            </div>
        </div>
        <Modal
            v-model="showResponseModal"
            title= "Response"
            @on-ok="showResponseModal=false">
            <p>{{showResponseValue}}</p>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showResponseModal:false,
            showResponseValue:'',
            from:{
                reason:'',
                orderId:'',
                description:'',
                image:'',
                userId:'',
            },
            pages:{
                lastPage: 1,
                page: 1,
                perPage: 5,
                total: 0,
                data:[],
            },
            reasons:[
                'Delivery agent took Extra/Less money',
                'Issue with delivery agent',
                'I want to cancel my order',
                'I want to change the delivery information',
                'I want to change my registered mobile number',
                'Mistakenly place a double order',
                'Order status wrong',
                'Payment status wrong',
                'Put the delivery on hold',
                'Request to Exchage my order',
                'Requesting deliver on a fixed time and date',
                'The product was damange',
                'The product has not been delivered yet',
            ]
        }
    },
    
    methods:{
        async formSubmit(){
            if(this.from.reason == '') return this.i("Reason is Empty!") 
            if(this.from.description == '') return this.i("description is Empty!")
            this.from.userId = this.authInfo.id
            let res = await this.callApi('post','app/reports', this.from)
            if(res.status == 200){
                this.s("Your Report Submitted!");
                res.data.report.status = "Pending"
                this.pages.data.push(res.data.report)
                let from ={
                    reason:'',
                    orderId:'',
                    description:'',
                    image:'',
                    userId:'',
                }
                this.from = from

            }
            
            else{
                this.swr();
            }
        },
         showResponse(row){
            this.showResponseValue = row.response
            this.showResponseModal = true
        },
        handleSuccess (res, file) {
            this.from.image = res.file 
        },
        async getReports(page){
            // this.isNotificationMenu = true
            const res = await this.callApi('get',`/app/reports?page=${page}`)
            if(res.status == 200){
                this.pages = res.data.data
            }
            else{
                this.swr()
            }
            
        },
       
        
       
    },
    async created(){
        this.getReports(1)
        // if(this.$route.query.tab) this.tab = this.$route.query.tab
        // const [res, res1,res2] = await Promise.all([
        //     this.callApi('get', 'app/order'),
        //      this.callApi('get','app/zones'),
        //      this.callApi('get','/app/getNotiDetails')
        // ]) 
        // if (res.status == 200 && res1.status == 200) {
        //     this.pages = res.data.order
        //     this.orders = res.data.order.data
        //     this.zones = res1.data.zones
        //     this.notiDetails = res2.data.notiDetails

        // }
        // if (this.isLoggedIn) {
        //     this.from = _.clone(this.authInfo)
        // }else{
        //    this.$router.push('/')
        // }

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
    .addImageClass{
        text-align:center
    }
    .addImageClass:hover .demo-upload-list-cover{
        display: block;
    }
        .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
      .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
</style>
                                   