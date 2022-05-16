
<template>
    <div id="main-wrapper">
        <!--Wishlist section start-->
        <div class="wishlist-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 _crt_sec2">
            <div class="container sb-border pb-70 pb-lg-50 pb-md-40 pb-sm-30 pb-xs-20">
                <div class="row">
                    
                    <div class="col-12">            
                        <!-- Cart Table -->
                        <div class="cart-table table-responsive mb-30">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="pro-thumbnail">Image</th>
                                        <th class="pro-title">Product</th>
                                        <th class="pro-price">Price</th>
                                        <th class="pro-stock">Stock Status</th>
                                        <th class="pro-stock">Quantity</th>
                                        <th class="pro-addtocart">Add to cart</th>
                                        <th class="pro-addtocart">Request Status</th>
                                        <th class="pro-remove">Update</th>
                                        <th class="pro-remove">Remove</th>
                                    </tr>       
                                </thead>                                        
                                <tbody>                                                 
                                    <tr v-for="(item,index) in wishList.data" :key="index" >
                                        <td class="pro-thumbnail">
                                            <nuxt-link :to="`/single-product/${item.product.mainproduct.id}`"><img :src="item.product.mainproduct.productImage" alt="Product"></nuxt-link>
                                        </td>
                                        <td class="pro-title">
                                            <nuxt-link :to="`/single-product/${item.product.mainproduct.id}`">{{item.product.mainproduct.productName  }}-{{item.product.mainproduct.model}}-{{item.product.color ? item.product.color: '' }} -{{item.product.size ? item.product.size: '' }} </nuxt-link>
                                        </td>
                                        <td class="pro-price">
                                           <template v-if="item.productdiscount>0">
                                                <div class="_dis_flex _price">
                                                    <span class="_price_text">৳ {{item.product | disountPrice}}</span>
                                                    <span><del> ৳ {{item.product.sellingPrice}} </del></span>
                                                </div>
                                            </template>
                                            <template v-else><span class="_price_text">৳ {{item.product.sellingPrice}}</span></template>
                                        </td>
                                        <td class="pro-stock">
                                            <span class="in-stock" v-if="item.product.mainproduct.stock>0">in stock</span>
                                            <span class="out-stock" v-else>Stock out</span>
                                        </td>
                                        <td class="pro-quantity _pro8">
                                        <!--     <div class="pro-qty" v-if="item.status == 'Pending'">
                                                <input type="number"  v-model="item.quantity">
                                            </div>
                                            <div class="pro-qty" style="width: 90%;" v-else>
                                                <p style="font-size: 18px;font-weight: 500;">{{item.quantity}}</p>
                                                <input type="number"  v-model="item.quantity">
                                            </div> -->
                                             <div class="_pro_qty  ">
                                                <span @click="deQuantity"><i class="fas fa-minus"></i></span>
                                                <input v-model="quantity" min="1"  type="number">
                                                <span @click="inQuantity"><i class="fas fa-plus"></i></span>
                                            </div>
                                        </td>
                                        <td class="pro-addtocart">
                                            <button class="btn" v-if="item.product.stock >= item.quantity" @click="addToCart(item.product,item.quantity)">Add to cart</button>
                                            <button class="btn disable" v-else disabled>Add to cart</button>
                                        </td>
                                        <td class="pro-price"><span>{{item.status}}</span></td>
                                        <td class="pro-remove"><a @click="updatePreOrder(item,index)"><i class="fas fa-save"></i></a></td>
                                        <td class="pro-remove"><a @click="deletePreOrder(item,index)"><i class="fa fa-trash-o"></i></a></td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                    
                </div>      
            </div>
        </div>
        <!--Wishlist section end-->

       
    </div>
</template>
<script>
export default {
    data(){
        return{
            wishList:{
                total:0,
                data:[]
            }
        }
    },
    methods:{
        async updatePreOrder(item,index){
            let ob = {
                id:item.id,
                quantity:item.quantity,
                status:'Pending'
            }
            const res = await this.callApi('post','app/updatePre-order',ob)
            if(res.status == 200){
                this.s("Order Updated ! Please wait for admin confirmation!")
                this.wishList.data[index].status = 'Pending'

            }
            else{
                this.swr()         
            }
        },
        async deletePreOrder(item,index){
            let ob={
                id:item.id
            }
            const res = await this.callApi('post','app/deletePre-order',ob)
            if(res.status == 200){
                this.wishList.data.splice(index,1)
                this.s("Product remove from your Pre-Order list")
            }
            else{
                this.swr()
            }
        }
    },
    mounted(){
        if (!this.isLoggedIn) this.$router.push('/')
            
    },
    async created(){
        const [res] = await Promise.all([
            this.callApi('get','/app/pre-order')
        ])
        if(res.status == 200){
            this.wishList = res.data.reservation
        }
    }
}
</script>