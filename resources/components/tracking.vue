<template>
    <Modal
        v-model="trackModal" 
        :footer-hide="true"
        :mask-closable="false"
        width="740px"
        >
        <div slot="close">
             <span style="font-size: 20px;color: #a8a8a8dd;" @click="invoiceModalOff" ><i class="fas fa-times"></i></span>
            </div>
              <div class="card-main-area">
                <div class="part-two">
                    <div class="big-head" style="padding-bottom: 60px;">
                        <h2>Order Tracking - PX{{invoiceItem.id}}</h2>
                    </div>
                    <div class="icon-delivery-are">
                        <div class="delivery-1 delivery-all " :class="status>0? 'active' : ''">
                           <div class="deliver_all2">
                            <span class="color_four"><i class="fas fa-file-alt"></i></span>
                                <span class="round">
                                    <i v-if="status>0" class="fas fa-check"></i>
                                </span>
                           </div>
                           <span class="btm_text color_three">Order Placed</span>
                        </div>
                        <div class="delivery-2 delivery-all" :class="status>1? 'active' : ''">
                             <div class="deliver_all2">
                              <span class="color_four">
                                     <i class="fas fa-truck-loading"></i>
                              </span>
                              <span class="round">
                                    <i v-if="status>1" class="fas fa-check"></i>
                                </span>
                             </div>
                             <span class="btm_text">Processing</span> 
                        </div>
                        <div class="delivery-3 delivery-all" :class="status>2? 'active' : ''">
                           <div class="deliver_all2">
                            <span class="color_four">
                                <i class="fas fa-box"></i>
                            </span>
                                <span class="round">
                                    <i v-if="status>2" class="fas fa-check"></i>
                                </span>
                           </div>
                            <span class="btm_text">Preparing for Ship</span>
                        </div>
                        <div class="delivery-4 delivery-all" :class="status>3? 'active' : ''">
                                 <div class="deliver_all2">
                                  <span class="color_four">
                                       <i class="fas fa-shipping-fast"></i>
                                  </span>
                                       <span class="round">
                                        <i v-if="status>3" class="fas fa-check"></i>
                                      </span>
                                 </div>
                          
                            <span class="btm_text">Shipped</span>
                        </div>

                        <div class="delivery-4 delivery-all" :class="status>4? 'active' : ''">
                                 <div class="deliver_all2"> 
                                  <span class="color_four">
                                         <i class="fas fa-home"></i>
                                  </span>
                                       <span class="round">
                                        <i v-if="status>4" class="fas fa-check"></i>
                                      </span>
                                 </div>
                          
                            <span class="btm_text">Delivered</span>
                        </div>
                    </div>
                </div>
                <div class="btm_copyright" style="text-align: center;"><p class="btm_copyright_text">Delivery Partner</p>
                <a href="https://pathao.com/courier" target="_blank" rel="noopener noreferrer"><img class="_poa" src="/uploads/pathao.svg" alt="" title=""> </a>
                    
                </div>
                <!-- <div class="card_color"></div> -->
            </div>
        </Modal>
</template>
<script>
export default {
    data(){
        return{
            status :1
        }
    },
    methods:{
        invoiceModalOff(){
            this.$store.dispatch("setTrackModal", false);
            this.$store.dispatch("setInvoiceItem", {});
        },
    },
    watch: { 
        trackModal: function(newVal, oldVal) { // watch it
            // console.log('setTrackModal changed: ', newVal, ' | was: ', oldVal)
            if(newVal == true){
               if(this.invoiceItem.status == 'Order Placed') this.status = 1
               else if(this.invoiceItem.status == 'Processing') this.status = 2
               else if(this.invoiceItem.status == 'Preparing for ship') this.status = 3
               else if(this.invoiceItem.status == 'Shipped') this.status = 4
               else if(this.invoiceItem.status == 'Delivered') this.status = 5
            }
            

        }
    },

}
</script>
<style scoped>
    .container{
        width: 1040px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
    }
    .card-main-area{
        width: 700px;
        margin: 0 auto;
        background: #fff;
        border-radius: 5px;
    }
    .top-part ul{
        display: flex;

    }
    .top-part{
        background: #E9E9E9;
        padding: 10px;
    }
    .top-part ul li{
        width: 10px;
        height: 10px;
        background: #A3A3A3;
        border-radius: 50%;
        margin: 0px 5px;
    }
    .part-two{}
    .part-two .big-head{
        padding-bottom: 20px !important;
    }
    .part-two .big-head h2{
        font-size: 38px;
        text-align: center;
        padding: 30px 0;
    }
    .icon-delivery-are {
        display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
        padding-bottom: 70px;
        width: 600px;          
        margin: 0 auto;
    }                
    .delivery-all {                      
        display: flex;
        flex-direction: column;
        flex: 1 1;
    }   
    .big-head{
        padding-bottom: 20px !important;
    }         
    .card_color {
        height: 45px;
        background-color: #fed563;
        margin-top: 36px;            
    }                           
    .delivery-all i {
        padding-bottom: 20px;            
        font-size: 37px;
    }
    @media only screen and (max-width: 767px) {
    .delivery-all i {        
         font-size: 32px;
     }
    }
    .deliver_all2 {
        display: flex;         
        flex-direction: column;
        position: relative;
        align-items: center;
    }
    .aftr_line:after {
        position: absolute;
        content: '';
        height: 3px;
        background: #8c8585;
        width: 132px;
        bottom: 7px;
        right: -66px;
    }

    .btm_text{
        text-align: center;
        padding-top:20px;
    }
    .btm_copyright{
       font-size: 13px;
    }
    .btm_copyright_text{

    }
    .btm_copyright span {
        font-weight: bold;
    }
    ._poa{
        width: auto;
    height: 182px;
    margin: -44px auto 0;
    cursor: pointer;
    }
    .round {
            width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #515a6e;
    border-radius: 50%;
    flex: 0 0 auto;
    }
    .round i {
        font-size: 11px;
        padding-bottom: 0;
    }
    .pad60{
        padding-right: 60px;
        padding-left: 60px;
    }
    .color_one{color: #ebf38b;}
    .color_two{  color: #d3de35;}
    /* .color_three{    color: #26a8d4;} */
    .color_four{}
    .delivery-all.active .btm_text{
        /* color: #ee3333; */
    }
    .delivery-all.active .color_four{
        color: #ee3333;
    }
    .delivery-all.active .round{
        /* color: #ee3333;
        border: 2px solid #ee3333; */
    }
@media only screen and (min-width: 767px) and (max-width: 1050px) {
.card-main-area {
width: auto;
}
.icon-delivery-are {
    width: auto;
}

}

@media only screen and (max-width: 767px) {
.delivery-all {
    flex-direction: column;
    /*flex: 0 0 100%;*/
}
.card-main-area {
    width: auto;
}
.icon-delivery-are {
    width: auto;
}
.delivery-all {
    margin-bottom: 42px;
}
}
</style>

