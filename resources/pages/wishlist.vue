
<template>
    <div id="main-wrapper">
        <div class="_cart_page">
            <div class="container">
                <!-- dektop -->
                <div class="_wishlist_table">
                    <div class="cart-table table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="pro-thumbnail">Image</th>
                                    <th class="pro-title">Product</th>
                                    <th class="pro-price">Price</th>
                                    <th class="pro-stock">Stock Status</th>
                                    <th class="pro-addtocart">Add to cart</th>
                                    <th class="pro-remove">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in wishList.data" :key="index" >
                                    <td class="pro-thumbnail">
                                        <nuxt-link :to="`/single-product/${item.productId}`"><img :src="item.product.productImage" alt="Product"></nuxt-link>
                                    </td>
                                    <td class="pro-title">
                                        <nuxt-link :to="`/single-product/${item.productId}`">{{item.product.productName}}</nuxt-link>
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
                                        <span class="in-stock" v-if="item.product.stock>0">in stock</span>
                                        <span class="out-stock" v-else>Stock out</span>
                                    </td>
                                    <td class="pro-addtocart"> 
                                        <button class="btn" v-if="item.product.stock>0" @click="showQuickItemOn(item.product)">Add to cart</button>
                                        <button class="btn" v-else @click="showQuickItemOn(item.product)" >Pre-Order</button>
                                    </td>
                                    <td class="pro-remove">
                                        <a @click="deleteWishlist(item,index)"><i class="fa fa-trash-o"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- dektop -->

                <!-- ========== Cart mobile  Section ========== -->
                <div class="_cart_table_mbl">
                    <div class="">
                        <h2 class="_cart_form_title">Shopping Wishlist</h2>
                    </div>

                    <!-- Card item -->
                    <div class="_2card">
                        <div class="_2card_pic">
                        <img class="_2card_img" src="https://admin.dreamsgallerybd.com/uploads/2pAynjpwnSwTaKOv3EpeEwo1gS7gSii5LiQjY1hc.jpeg" alt="" title="">
                        </div>

                        <div class="_2card_details">
                        <p class="_2card_close"><i class="far fa-trash-alt"></i></p>

                        <a class="_2card_title">Finesse Large Duffel Bag Black</a>
                        <p class="_2card_price">৳ 120</p>
                        </div>
                    </div>
                    <!-- Card item -->
                </div>
                <!-- ========== Cart mobile  Section ========== -->
            </div>
        </div>
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
        async deleteWishlist(item,index){
            let ob={
                id:item.id
            }
            const res = await this.callApi('post','app/deleteWishlist',ob)
            if(res.status == 200){
                this.wishList.data.splice(index,1)
                this.s("Product remove from your wishlist")
            }
            else{
                this.swr()
            }
        },
        addToCartfooter(product){
            product.img = this.quickItem.productImage
            this.addToCartServer(product);
        }

    },
    mounted(){
        if (!this.isLoggedIn) this.$router.push('/')
            
    },
    async created(){
        const [res] = await Promise.all([
            this.callApi('get','/app/wishList')
        ])
        if(res.status == 200){
            this.wishList = res.data.wishlist
        }

    }
}
</script>