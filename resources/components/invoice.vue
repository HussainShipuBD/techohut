<template>
        <Modal
            v-model="invoiceModal"
            fullscreen
            :closable="false"
            class="print_all"
            >

            <div class="print" style="width: 793.7px;margin: 0 auto;" >
                <header class="invoice-main-head">
                    <div class="container">
                        <div class="invoice-header-part">
                            <div class="invoice-logo">
                                <!-- <h2>invoice</h2> -->
                                <img style="width:90px; height:auto;" src="/assets/logo.png" alt="" title=""/>
                            </div>
                            <div class="invoice-head-right-content">
                                <div class="invoice-head-right-list">
                                    <i class="fas fa-envelope"></i>
                                    <a href="mailto:example@gmail.com">support@dreamsgallerybd.com</a>
                                </div>
                                <div class="invoice-head-right-list">
                                    <i style="transform: rotate(84deg);" class="fas fa-phone"></i>
                                    <a href="tel:01679168540">016 1114 1115</a>
                                </div>
                                <div class="invoice-head-right-list">
                                    <i class="fas fa-globe"></i>
                                    <a href="">www.dreamsgallerybd.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section class="invoice-to-area">
                    <div class="container">
                        <div class="invoice-to-main-part">
                            <div class="invoice-to-left-part">
                                <div class="invoice-to-left-part-head">
                                    <i class="fas fa-file-invoice"></i>
                                    <h3>invoice to</h3>
                                </div>
                                <p>{{invoiceItem.name}}</p>
                                <p>{{invoiceItem.billingAddress}}</p>
                                <p>{{invoiceItem.billingCity}}</p>
                                <div class="invoice-to-left-head-bottom">
                                    <p v-if="invoiceItem.email">Email - {{invoiceItem.email}}</p>
                                    <p v-if="invoiceItem.contact">phone - +88{{invoiceItem.contact}}</p>
                                </div>
                            </div>
                            <div class="invoice-to-right-part">
                                <div class="invoice-to-rigth-box-1">
                                    <ul>
                                        <li>total amount</li>
                                        <li>invoice date</li>
                                        <li>invoice #</li>
                                    </ul>
                                </div>
                                <div class="invoice-to-rigth-box-2">
                                    <ul>
                                        <li>{{grandTotal}} BDT</li>
                                        <li>{{invoiceItem.created_at | formatDate}}</li>
                                        <li>INV{{invoiceItem.id}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="invoice-table-area">
                    <div class="container">
                        <div class="table-responsive">
                            <table class="invoice-main-table">
                                <thead>
                                    <tr>
                                        <th style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff;">SN</th>
                                        <th style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff;">Item Description</th>
                                        <th style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff;">Price</th>
                                        <th style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff;">Qty</th>
                                        <th style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff; text-align:right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in invoiceItem.orderdetails" :key="index">
                                        <td>{{index+1}}</td>
                                        <td class="text-overflow2">{{item.product.productName}} {{item.product.size}} {{item.product.color}}</td>
                                        <td>
                                          <span v-if="item.price != item.sellingPrice"><del>{{item.sellingPrice}}</del></span>
                                          <span>{{item.price}}</span>
                                        </td>
                                        <td>{{item.quantity}}</td>
                                        <td style="text-align:right;">{{item.quantity*item.price}}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff;" colspan="3"></td>
                                        <td style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff;" >sub total</td>
                                        <td style="border-top: 1px solid #000; border-bottom: 1px solid #000; background:#fff; text-align:right">{{invoiceItem.subTotal}}</td>
                                    </tr>
                                    <!-- <tr v-if="invoiceItem.discount>0">
                                        <td colspan="3"></td>
                                        <td>Discount(%)</td>
                                        <td style="text-align:right;">{{invoiceItem.discount}}</td>
                                    </tr> -->
                                    <tr v-if="invoiceItem.coupon && invoiceItem.discountType == 'Promo Code'" >
                                        <td colspan="3"></td>
                                        <td>Coupon Discount(%)</td>
                                        <td style="text-align:right;">
                                            <span v-if="invoiceItem.referralCode">{{invoiceItem.discount - 5}}</span>
                                            <span v-else>{{invoiceItem.discount}}</span>
                                        </td>
                                    </tr>

                                    <tr v-if="invoiceItem.referralCode">
                                        <td colspan="3"></td>
                                        <td>Referral Discount(%)</td>
                                        <td style="text-align:right;">5</td>
                                    </tr>
                                    <tr v-if="invoiceItem.discountType == 'Membership Discount'" >
                                        <td colspan="3"></td>
                                        <td>Loyalty Discount(%)</td>
                                        <td style="text-align:right;">{{invoiceItem.discount}}</td>
                                    </tr>


                                    <tr>
                                        <td colspan="3"></td>
                                        <td>Delivery Charge</td>
                                        <td style="text-align:right;">{{invoiceItem.shippingPrice}}</td>
                                    </tr>
                                         <tr v-if="invoiceItem.isDGMoney" >
                                        <td colspan="3"></td>
                                        <td>DG Pay</td>
                                        <td style="text-align:right;">- {{parseInt(invoiceItem.dgAmount)}}</td>
                                    </tr>
                                    <tr v-if="invoiceItem.giftVoucherAmount>0" >
                                        <td colspan="3"></td>
                                        <td>Gift Voucher({{invoiceItem.giftVoucherCode}})</td>
                                        <td style="text-align:right;">{{invoiceItem.giftVoucherAmount}}</td>
                                    </tr>
                                    <tr  style="border-bottom: 1px solid #000; background:#fff;">
                                        <td colspan="3"></td>
                                        <td>Grand Total</td>
                                        <td style="text-align:right;">
                                            <span >{{grandTotal}}</span>
                                        </td>
                                    </tr>

                                </tfoot>
                            </table>
                            <!-- <table class="invoice-main-table">
                                <tr>
                                    <td  style="border-top: 1px solid #000; background:#fff;padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455;" colspan="3"></td>
                                    <td  style="border-top: 1px solid #000; background:#fff;padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455; text-align:right;">Note : Vat included in price</td>
                                </tr>
                            </table> -->

                             <table class="invoice-main-table" style="margin-top:60px;">
                                <tr>
                                    <th  style="border-top: 1px solid #000;border-bottom: 1px solid #000; background:#fff;padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455;">Total Due</th>
                                    <th  style="border-top: 1px solid #000;border-bottom: 1px solid #000; background:#fff;padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455; text-align:center;">Payment Type</th>
                                    <th  style="border-top: 1px solid #000;border-bottom: 1px solid #000; background:#fff;padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455; text-align:right">Payment Status</th>
                                </tr>

                                <td style="padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455;">
                                    BDT <span v-if="invoiceItem.paymentStatus == 'Paid'" >0</span> <span v-else>{{grandTotal}}</span>
                                </td>
                                <td style="padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455; text-align:center">{{invoiceItem.paymentType | fixedPaymentType}}</td>
                                <td style="padding: 10px 5px;font-size: 14px; text-transform: capitalize; color: #575455; text-align:right">{{invoiceItem.paymentStatus}}</td>
                            </table>
                        </div>
                    </div>
                </section>
                <div class="terms-condition-area">
                    <div class="container">
                        <div class="terms-condition-sub-area">
                            <div class="terms-left">
                                <p class="return">Return Policy</p>
                                <ul class="_list">
                                    <li>Exchange of Refund within 7 days from the date of delivery.</li>
                                    <li>The product must be unused and intact with tags.</li>
                                    <li>Additional terms and conditions may apply.</li>
                                    <!-- <li>Note : Vat included in price</li> -->
                                    <li>Vat included in price.</li>
                                </ul>
                                <!-- <p>terms and condition:</p>
                                <p>payment should be made within 24 hour by bank or mobile banking</p> -->
                            </div>
                            <div class="terms-right">
                                <p>this is a computer genrated invoice and required no signature</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary"  @click="showPrint">Print</Button>
                <Button type="info"  @click="invoiceModalOff">Close</Button>
            </div>
        </Modal>

</template>
<script>
export default {
    methods:{
        invoiceModalOff(){
            this.$store.dispatch("setInvoiceModal", false);
            this.$store.dispatch("setInvoiceItem", {});
        },
         async showPrint () {
               // this.viewModal= false
                await new Promise(resolve => setTimeout(resolve, 500));
                // console.log("Print")
                window.print();
		},
    },
    computed:{
        grandTotal(){
            let total = parseFloat (this.invoiceItem.grandTotal);
            total += parseFloat(this.invoiceItem.shippingPrice);
            // if(this.invoiceItem.isDGMoney) total -= parseFloat(this.invoiceItem.dgAmount)
            total -= parseFloat(this.invoiceItem.giftVoucherAmount)
            total -= parseFloat(this.invoiceItem.dgAmount)
            return total;


        },
    },
    filters:{
        formatDate(date){
            let today = new Date(date)
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var m = parseInt(mm,10) - 1;
            var allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return allMonth[m] + ' ' + dd + ', ' + yyyy;
        }
    },
}
</script>


<style  scoped>
.print_all .ivu-modal-body {
    padding: 16px 0px;
}
*{
    margin: 0px;
    /* padding: 0px; */
    box-sizing: border-box;
  }
  ul,ol{
      list-style: none;
  }
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
  p,h1,h2,h3,h4, h5,h6{
    margin: 0px;
  }
  /* button, select{
    cursor: pointer;
  } */
  a,a:hover{
    text-decoration: none;
  }
  a{
    transition: .3s all ease-in-out;
  }
  .text-overflow2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 2;
    width: 370px;
}
  .container{
      width: 1240px;
      margin: 0 auto;
      max-width: 96%;
      padding: 0 2%;
  }
  /* main css */
  .return{
      color: #333;
    font-weight: bold;
    font-size: 17px;
    margin: 0 0 11px;
  }
  ._list{}
  ._list li{
      list-style: square;
    margin-left: 19px;
    font-size: 14px;
    padding: 0 0 8px;
  }
  .invoice-header-part{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      margin: 40px 0;
  }
  .invoice-head-right-content{
      display: flex;
      height: 100%;
  }
  .invoice-head-right-list{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80px;
      padding: 0px 15px;
      position: relative;
  }
  .invoice-head-right-list:after{
      position: absolute;
      right: 0;
      top: 23%;
      height: 80%;
      content: "";
      border-right: 1px solid #778084;
  }
  .invoice-head-right-list:last-child:after{
    display: none;
  }
  .invoice-head-right-list i{
      color: #000;
      margin-bottom: 10px;
      font-size: 16px;
 }
 .invoice-head-right-list a{
     color: #575455;
     letter-spacing: 1px;
     font-size: 14px;
 }
 .invoice-logo{
    width: 250px;
 }
 .invoice-logo h2{
     font-size: 45px;
     text-transform: uppercase;
     color: #fff;
     font-weight: 300;
     letter-spacing: 3px;
 }
 /* invoice-to-area */
 .table-responsive{
     overflow-x: auto;
 }
 .invoice-to-area{
     padding: 40px 0;
 }
 .invoice-to-main-part{
     display: flex;
     justify-content: space-between;
 }
 .invoice-to-left-part p{
     text-transform: capitalize;
     font-size: 16px;
     color: #575455 ;
     line-height: 22px;
 }
 .invoice-to-left-part-head{
     display: flex;
     text-transform: uppercase;
     margin-bottom: 10px;
 }
 .invoice-to-left-part-head i{
     color: #E14747;
     font-size: 26px;
 }
 .invoice-to-left-part-head h3{
     font-size: 18px;
     display: flex;
     align-items: flex-end;
     letter-spacing: 2px;
     font-weight: 400;
     margin-left: 10px;
 }
 .invoice-to-left-head-bottom{
     margin-top: 20px;
 }
 .invoice-to-right-part {
    display: flex;
    height: 110px;
    width: 279px;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #778084;
    position: relative;
}
.invoice-to-right-part:after{
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    border-left: 1px solid #778084;
}
.invoice-to-right-part li{
    text-transform: capitalize;
    color: #575455;
    line-height: 35px;
}
.invoice-to-right-part li:nth-child(1),
.invoice-to-right-part li:nth-child(3){
    background: #F2F3F4;
}
 .invoice-to-rigth-box-1{
     width: 50%;
     text-align: center;
 }
 .invoice-to-rigth-box-2{
    width: 50%;
    text-align: center;
 }
 /* invoice table   */
 .invoice-main-table{
     width: 100%;
     border-spacing: 0px;
 }
 .invoice-main-table thead{
     text-align: left;
     background: #F2F3F4;
 }
 .invoice-main-table thead tr th,
 .invoice-main-table tbody tr td,
 .invoice-main-table tfoot tr td{
     padding: 10px 5px;
     font-size: 14px;
     text-transform: capitalize;
     color: #575455;
 }
 .invoice-main-table tbody tr td{
     letter-spacing: 1px;
 }
 .invoice-main-table tfoot tr:nth-child(1){
     background: #F2F3F4;
 }
 /* terms-condition */
 .terms-condition-sub-area{
     display: flex;
     justify-content: space-between;
     padding: 80px 0;
     text-transform: capitalize;
     color: #575455;
     font-size: 14px;
 }
 .terms-left{
 }
 .terms-right{
    width: 200px;
 }

 /* query */
 @media (max-width: 768px){
    .invoice-head-right-content {
        flex-direction: column;
    }
    .invoice-head-right-list:after{
        display: none;
    }
    .invoice-head-right-list {
        flex-direction: row;
        text-align: right;
        display: block;
    }
    .invoice-head-right-list i {
        margin-bottom: 0px;
        margin-right: 15px;
    }

 }
 @media (max-width:576px){
    .invoice-logo {
        width: 160px;
    }
    .invoice-logo h2 {
        font-size: 28px;
    }
    .invoice-head-right-list {
        flex-direction: column;
        display: flex;
    }
    .invoice-head-right-list {
        align-items: flex-end;
        margin-top: 10px;
    }
    .invoice-header-part {
        margin: 10px 0;
    }
    .invoice-to-main-part {
        flex-direction: column;
    }
    .invoice-to-right-part {
        margin-top: 35px;
    }
    .terms-condition-sub-area {
        flex-direction: column;
    }
    .terms-left {
        margin-bottom: 40px;
    }
 }
</style>
