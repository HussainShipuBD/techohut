<template>
    <div id="main-wrapper">  
        <div class="_single_page">
            <client-only>
                <div  v-if="product" class="container">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="_product_slider">
                                <div class="product-slider-thumb">
                                    <figure>
                                        <image-magnifier
                                        :src="mainImage"
                                        :zoom-src="mainImage"
                                        width="400"
                                        height="400"
                                        zoom-width="555"
                                        zoom-height="555"
                                        ></image-magnifier>
                                    </figure>
                                </div>
                                <div class="product-hooper">
                                    <hooper style="height:auto" :itemsToShow="4" :infiniteScroll="isInfiniteScroll" :autoPlay="false">
                                        <slide v-for="(item,index) in product.allImages " :key="index">
                                            <div class="hooper-slider-item andu" >
                                                <figure
                                                :class="(mainImageIndex == index) ? 'hooper-slider-item slider-active' : ''"
                                                @click="mainImage = item.url, mainImageIndex = index">
                                                    <img :src="item.url" alt=""/>
                                                </figure>
                                            </div>
                                        </slide>
                                        <hooper-navigation v-if="isInfiniteScroll" slot="hooper-addons"></hooper-navigation>
                                    </hooper>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="_productDeta">
                                <p class="_productDeta_title">{{product.productName}}  {{product.model}}</p>
                                
                                <div v-if="product.avgRating == null" class="_rating">
                                    <span class="_rating_icon">3.5 <i class="ivu-icon ivu-icon-md-star"></i></span> 
                                    <span v-if="product.__meta__" class="_rating_text">{{product.__meta__.allreviews_count}}</span>
                                </div>
                                <div v-else class="_rating">
                                    <span class="_rating_icon">3.5 <i class="ivu-icon ivu-icon-md-star"></i></span> 
                                    <span v-if="product.__meta__" class="_rating_text">{{product.__meta__.allreviews_cout}}</span>
                                </div>

                                <div class="single-product-price" v-if="product.discount>0">
                                    <span class="price new-price">৳ {{product | disountPrice}}</span>
                                    <span class="regular-price">৳ {{product.sellingPrice}}</span>
                                </div>
                                <div class="single-product-price"  v-else>
                                    <span class="price new-price">৳ {{product.sellingPrice}}</span>
                                </div>

                                <div class="_pro_des_all"  v-if="product.description">
                                    <div v-if="product.description.material" class="_pro_des">
                                        <p class="_pro_des_title">Material</p>
                                        <p class="_pro_des_val">{{product.description.material}}</p>
                                    </div>
                                    <div v-if="product.description.size" class="_pro_des">
                                        <p class="_pro_des_title">Size</p>
                                        <p class="_pro_des_val">{{product.description.size}}</p>
                                    </div>
                                    <div v-if="product.description.color" class="_pro_des">
                                        <p class="_pro_des_title">Colour</p>
                                        <p class="_pro_des_val">{{product.description.color}}</p>
                                    </div>
                                </div>
                 
                                                
                                <div class="single-product-quantity">
                                    <form class="add-quantity" v-on:submit.prevent> 
                                        <div class="productSelectall">
                                            <div  class="productSelectBox _mr_b22" v-if="allColour.length>0">
                                                <Select class="wide only _wide_2"  v-model="colour" @on-change="getVariableProduct" placeholder="Colour" >
                                                    <Option selected value="" disabled>Select Colour</Option>
                                                    <Option v-for="(item,index) in allColour" :key="index" :value="item.color">{{item.color}}</Option> 
                                                </Select>
                                            </div>
                                            <div  class="productSelectBox _mr_b22" v-if="allSize.length>0">
                                                <Select class="wide only _wide_2" v-model="size" @on-change="getVariableProduct" placeholder="Size" > 
                                                    <Option selected value="" disabled>Select Size</Option>
                                                    <Option v-for="(item,index) in allSize" :key="index" :value="item.size">{{item.size}}</Option>
                                                </Select>
                                            </div>
                                        </div>
                                            
                                        <div class="add-to-link" v-if="loading" >
                                            <button  class="btn"  >
                                                <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span>Please wait...</span>
                                            </button>
                                        </div>


                                        <div class="_qui_all" v-else>
                                            <div class="_qui_main">
                                                <span @click="deQuantity"><Icon type="md-add" /></span>
                                                <input v-model="quantity" min="1"  type="number">
                                                <span @click="inQuantity"><Icon type="md-remove" /></span>
                                            </div> 

                                            <div class="_productDeta_button_group">
                                                <div class="_productDeta_button">
                                                    <button v-if=" variableProduct && variableProduct.id==0" class="_1btn _w_100" @click="getVariableProduct"><i class="ion-bag"></i>Add to cart</button>
                                                    <button v-else-if="  variableProduct.stock >= quantity"  class="_1btn _w_100" @click="addToCartMain()" ><i class="ion-bag"></i>Add to cart</button>
                                                    <button  v-else-if=" variableProduct.stock < quantity" class="_1btn _w_100" @click="addToPreOrder(variableProduct,quantity)"><i class="ion-bag"></i>Pre order</button>
                                                </div>

                                                <div class="_productDeta_button">
                                                    <button @click="storeWishList(product)" class="_2btn" type="button"><Icon type="md-heart" /> Add to Wishlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="_pro_des_all" v-if="product.allgroup">
                                    <div class="_pro_des">
                                        <p class="_pro_des_title">Brand</p>
                                        <p class="_pro_des_val">{{product.allbrand.name}}</p>
                                    </div>
                                    <div class="_pro_des">
                                        <p class="_pro_des_title">Categories</p>
                                        <p class="_pro_des_val">{{product.allgroup.groupName}}</p>
                                    </div>
                                    <div class="_pro_des">
                                        <p class="_pro_des_title">Subcategories</p>
                                        <p class="_pro_des_val">{{product.allcategory.catName}}</p>
                                    </div>
                                </div>

                                <div class="_pro_des_all">
                                    <div class="_pro_des">
                                        <p class="_pro_des_title">Share this product</p>
                                        <ul class="_pro_des_share">
                                            <li><a :href="`https://twitter.com/share?ref_src=${location}`" target="_blank"><i class="fa fa-twitter"></i></a></li>
                                            <li :data-href="location"><a :href="'https://www.facebook.com/sharer/sharer.php?u='+location" target="_blank"><i class="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                            <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                            <li><a href="#"><i class="fa fa-vimeo"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </client-only>

            <div class="_product_details">
                <div class="container">
                    <Tabs class="_product_details_tab" type="card">
                        <TabPane class="_product_details_tab_main" label="Description" name="tab1" context-menu>
                            <div class="">
                                <div v-if="product.description" class="row">
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Product Name</p> 
                                            <p class="_pro_des_val">{{product.productName}}</p>
                                        </div> 
                                    </div>
                                    <div v-if="product.description.material" class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Material</p> 
                                            <p class="_pro_des_val">{{product.description.material}}</p>
                                        </div> 
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Model</p> 
                                            <p class="_pro_des_val">{{product.model}}</p>
                                        </div> 
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Brand</p> 
                                            <p class="_pro_des_val">{{product.allbrand.name}}</p>
                                        </div> 
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Category</p> 
                                            <p class="_pro_des_val">{{product.allgroup.groupName}}</p>
                                        </div> 
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Subcategory</p> 
                                            <p class="_pro_des_val">{{product.allcategory.catName}}</p>
                                        </div> 
                                    </div>
                                    <div v-if="product.description.size" class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Size</p> 
                                            <p class="_pro_des_val">{{product.description.size}}</p>
                                        </div> 
                                    </div>
                                    <div v-if="product.description.color" class="col-12 col-md-6 col-lg-6">
                                        <div class="_pro_des">
                                            <p class="_pro_des_title">Colour</p> 
                                            <p class="_pro_des_val">{{product.description.color}}</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane class="_product_details_tab_main" label="Review" name="tab2" context-menu>
                            <div class="review-form-wrapper" v-if="isLoggedIn" style="margin-bottom: 20px;">
                                <div class="review-form">
                                    <h3>Add a review </h3>
                                    <form v-on:submit.prevent>
                                        <div class="comment-form-rating">
                                            <label>Your rating</label>
                                            <div class="rating" v-if="onHover">
                                                <span class="_pointer" @mouseleave="onHover=false" @mouseover="changeOnHoverRating(1)" @click="setReviewRating(1)" ><i :class="(onHoverRating>0)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseleave="onHover=false" @mouseover="changeOnHoverRating(2)" @click="setReviewRating(2)" ><i :class="(onHoverRating>1)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseleave="onHover=false" @mouseover="changeOnHoverRating(3)" @click="setReviewRating(3)" ><i :class="(onHoverRating>2)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseleave="onHover=false" @mouseover="changeOnHoverRating(4)" @click="setReviewRating(4)" ><i :class="(onHoverRating>3)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseleave="onHover=false" @mouseover="changeOnHoverRating(5)" @click="setReviewRating(5)" ><i :class="(onHoverRating>4)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                            </div>
                                            <div class="rating" v-else>
                                                <span class="_pointer" @mouseover="changeOnHoverRating(1)" ><i :class="(reviewForm.rating>0)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseover="changeOnHoverRating(2)" ><i :class="(reviewForm.rating>1)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseover="changeOnHoverRating(3)" ><i :class="(reviewForm.rating>2)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseover="changeOnHoverRating(4)" ><i :class="(reviewForm.rating>3)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                <span class="_pointer" @mouseover="changeOnHoverRating(5)" ><i :class="(reviewForm.rating>4)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                            </div>
                                        </div>
                                        <div class="input-element">
                                            <div class="comment-form-comment">
                                                <label>Comment</label>
                                                <textarea name="message" v-model="reviewForm.content" cols="40" rows="8"></textarea>
                                            </div>
                                            <div class="comment-submit">
                                                <button type="submit" @click="reviewSubmit" class="form-button">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="review-page-comment">
                                <h2>{{reviews.length}} {{(reviews.length > 1)? 'reviews' : 'review'}} for {{product.productName}}</h2>
                                <ul>
                                    <li v-for="(item,index) in reviews" :key="index">
                                        <div class="product-comment">
                                            <img src="/img/user.png" alt="">
                                            <div class="product-comment-content">
                                                <div class="product-reviews">
                                                    <i  :class="(item.rating>0)? 'fa fa-star active' : 'fa fa-star-o'"></i>
                                                    <i  :class="(item.rating>1)? 'fa fa-star active' : 'fa fa-star-o'"></i>
                                                    <i  :class="(item.rating>2)? 'fa fa-star active' : 'fa fa-star-o'"></i>
                                                    <i  :class="(item.rating>3)? 'fa fa-star active' : 'fa fa-star-o'"></i>
                                                    <i  :class="(item.rating>4)? 'fa fa-star active' : 'fa fa-star-o'"></i>
                                                    
                                                </div>
                                                <p class="meta" v-if="item.user">
                                                    <strong>{{item.user.name}}</strong> - <span>{{item.created_at | formatDate}}</span>
                                                <div class="description">
                                                    <p>{{item.content}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>

        <!-- Related products -->
        <div class="_bestSec">
         <div class="container">
            <div class="_bestSec_con" v-if="!isLoading && relatedProduct.length>0">
               <div class="_bestSec_top">
                  <h1 class="_bestSec_title">Related <span>Products</span></h1>
               </div>

               <div class="_bestSec_cards">
                  <div class="row">
                     <hooper style="height:auto" class="_1hooper" :infiniteScroll="true" :settings="hooperSettings">
                        <slide  v-for="(p,i)  in  relatedProduct" :key="i">
                           <div class="_5card">
                              <div class="_5card_pic">
                                 <nuxt-link :to="{name:'single-product-id', params: { id:p.id } }">
                                    <img :src="p.productImage" class="_5card_img"  alt="" title=""/>
                                 </nuxt-link>
                                 <span v-if="p.discount>0" class="_5card_dis">-{{p.discount}}%</span>
                                 <span v-if="p.isNew" class="_5card_new">New</span>
                                 <span v-if="p.stock<0" class="_5card_out">Stock out</span>
                              </div>

                              <div class="_5card_details">
                                 <div class="_5card_details_top">
                                    <nuxt-link class="_5card_details_type" :to="{ name: 'shop', query: { categoryId: p.categoryId }}">
                                       {{p.allcategory.catName}}
                                    </nuxt-link>

                                    <div class="_rating">
                                       <span class="_rating_icon">3.5 <Icon type="md-star" /></span>
                                       <span class="_rating_text">800</span>
                                    </div>
                                 </div>
                                 <nuxt-link  class="_5card_title" :to="{name:'single-product-id', params: { id:p.id } }">{{p.productName}}  {{p.model}}</nuxt-link>

                                 <div class="_5card_details_bottom">
                                    <div class="_5card_details_bottom_main">
                                       <div class="_5card_details_bottom_left">
                                          <template v-if="p.discount>0">
                                             <h1 class="_5card_details_price">
                                                <span class="discounted">৳ {{p | disountPrice}}444</span>
                                                ৳ {{p.sellingPrice}}
                                             </h1>
                                          </template>
                                          <template v-else>
                                             <h1 class="_5card_details_price">৳ {{p.sellingPrice}}</h1>
                                          </template>
                                       </div>

                                       <div class="_5card_details_bottom_right">
                                          <template v-if="p.stock>0">
                                             <a  @click="showQuickItemOn(p)" class="_5card_add_card">Add to card</a>
                                          </template>
                                          <template v-else>
                                             <a  @click="showQuickItemOn(p)" class="_5card_add_card">Pre order</a>
                                          </template>

                                          <ul class="_5card_details_icon_list">
                                             <li @click="storeWishList(p,i)" :class="(p.isWishList==true)? '_active' : ''"><Icon type="md-heart" /></li>
                                             <li @click="showQuickItemOn(p)" data-toggle="modal"><Icon type="md-eye" /></li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </slide>

                        <hooper-navigation slot="hooper-addons"></hooper-navigation>
                     </hooper>
                  </div>
               </div>
            </div>
            
            <div v-else class="_no_data">
               <Icon type="md-folder" />
               <p>No data found</p>
            </div>
         </div>
      </div>
        <!-- Related products -->
    </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper';;
import 'hooper/dist/hooper.css';


export default {
    components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation
  },
    data(){
        return{
             hooperSettings: {
                padding:15,
                itemsToShow: 2,
                breakpoints: {
                800: {
                    itemsToShow: 3
                },
                1000: {
                    itemsToShow: 4,
                }
                }
            },
            loading:false,
            mainImageIndex: 0,
            mainImage: "",
            tabs:'description',
            preMsg:false,
            isInfiniteScroll: false,
            // product:{id:0},
            // allSize:[],
            // allColour:[],
            relatedProduct:[],
            reviews:[],
            quantity:1,
            size:'',
            colour:'',
            location:{},
            variableProduct:{id:0},
            isLoading:true,
            newSlider:{
                style:{
                    transform: 'translate3d(0px, 0px, 0px)'
                },
                t:0,
                left:false,
                right:true,
                bestGroupFeaturedIndex:0,
            },
            onHover : false,
            onHoverRating : 0,
            reviewForm:{
                rating:0,
                content:'',
                productId:0,
                userId:0,
            },
            title:'',
            // allMonth : ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        }
    },
    head () {
        return {
        title: this.title,
        }
    },
    methods:{
        deQuantity(){
            if(this.quantity - 1 == 0) return
            this.quantity--
        },
        inQuantity(){
           
            this.quantity++
        },
        addToCartMain(){
            this.variableProduct.img = this.product.productImage
            this.variableProduct.discount = this.product.discount
            this.addToCartServer(this.variableProduct,this.quantity);
        },
        async getVariableProduct(){
            if(this.allColour.length>0 && this.colour == '') {

                this.variableProduct = {id:0}
                this.i("Please select a color")
                return
            } 
            if(this.allSize.length>0 && this.size == ''){

                 this.variableProduct = {id:0}
                this.i("Please select a size")
                return
            }
            let ob = {
                quantity: this.quantity,
                mproductId: this.product.id,
                size:this.size,
                colour:this.colour
            }
            this.loading = true;
            const res = await this.callApi('post',`/app/getVariableProduct`,ob)
            if(res.status == 200){
                this.variableProduct = res.data.finalProduct
            }
           
            else{
                this.swr(); 
            }
            this.loading = false

        },
        async AddProductVariableToCart(){
            if(this.allColour.length>0 && this.colour == '') return this.i('Please Select a colour!')
            if(this.allSize.length>0 && this.size == '') return this.i('Please Select a Size!')
            let ob = {
                quantity: this.quantity,
                mproductId: this.quickItem.id,
                size:this.size,
                colour:this.colour
            }
            const res = await this.callApi('post',`/app/checkVariableStock`,ob)  
            if(res.status == 200){

            }
            else if(res.status == 401){
                this.i("Product Stock Out ")

                
            }
            else{
                this.swr(); 
            }

        },
        async reviewSubmit(){
            if(this.reviewForm.content.trim() == '') return this.i("Review Comment is empty!") 
            if(this.reviewForm.rating == 0) return this.i("Rating is empty!")
            this.reviewForm.userId = this.authInfo.id
            const res = await this.callApi('post','/app/reviews',this.reviewForm)
            if(res.status == 200){
                this.s("Review has been submitted successfully! ")
                this.reviews.unshift(res.data.review)
                let reviewForm ={
                    rating:0,
                    content:'',
                    productId:this.$route.params.id,
                    userId:0,
                }
                this.reviewForm = reviewForm

            }
            else if (res.status == 401){
                this.e(res.data.message)
                let reviewForm ={
                    rating:0,
                    content:'',
                    productId:this.$route.params.id,
                    userId:0,
                }
                this.reviewForm = reviewForm
            }
            else{
                this.swr()
            }
        },
        changeOnHoverRating(index){
            this.onHover = true
            
            this.onHoverRating = index
        },
        setReviewRating(index){
            this.reviewForm.rating = index
        },
        moveNewSlider(flag){
            console.log('flag')
           
            console.log(flag)
            if(flag == 2){
                
                if( parseInt(this.newSlider.bestGroupFeaturedIndex)-1 < 0) return
                this.newSlider.bestGroupFeaturedIndex = this.newSlider.bestGroupFeaturedIndex -1
                this.newSlider.t = parseInt(this.newSlider.t) + 300
                this.newSlider.style.transform = `translate3d(${this.newSlider.t}px, 0px, 0px)`
            }
           else if(flag == 1){
                 if( parseInt(this.newSlider.bestGroupFeaturedIndex)+5 > this.relatedProduct.length) return
                 this.newSlider.bestGroupFeaturedIndex = this.newSlider.bestGroupFeaturedIndex +1
                this.newSlider.t = parseInt(this.newSlider.t)  - 300
                 this.newSlider.style.transform = `translate3d(${this.newSlider.t}px, 0px, 0px)`
            }
            this.newSlider.right =( parseInt(this.newSlider.bestGroupFeaturedIndex)+5 > this.relatedProduct.length)? false : true
            this.newSlider.left =( parseInt(this.newSlider.bestGroupFeaturedIndex)-1 < 0)? false : true
            console.log(this.newSlider.style.transform)
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
    mounted(){
        console.log("mounted")
        if(window.innerWidth < 767){
            this.isFilterOption = false
        }
    },
    watch: {  

        quantity: function(newVal,oldVal){
            if(newVal > this.variableProduct.stock && !this.preMsg ){
                this.preMsg = true;
                this.i("Stock Limit Exceeded. You can Pre Order your desire products.")
            }
            else if(newVal < this.variableProduct.stock) {
                this.preMsg = false;
            }
        }
    },
    async asyncData({app,redirect,params}){
        try {
            let res = await app.$axios.get(`/app/getSingleproduct/${params.id}`)
            if(res.status == 200){
                res.data.product.description = JSON.parse(res.data.product.description)
                return {
                    product:res.data.product,
                    allColour: res.data.colour,
                    allSize : res.data.size,
                }
            }

        } catch (error) {
            console.log('asyncData-error',error)
            redirect(`/`)
        }

    },
    async created(){
        
        this.reviewForm.productId = this.$route.params.id
        this.location = window.location.href
        this.allColour = _.sortBy(this.allColour, o => o.color)
        this.allSize = _.sortBy(this.allSize, o => o.size)
        // const response = await this.callApi('get',`/app/getSingleproduct/${this.$route.params.id}`)
        // if(response.status == 200){
        //     if(response.data.product.description){
        //         response.data.product.description = JSON.parse(response.data.product.description)
        //         console.log(response.data.product.description)
        //         // if(!response.data.product.description.size){
        //         //     console.log("yes yes")
        //         //     response.data.product.description = JSON.parse(response.data.product.description)
        //         // }
        //      }
        //      console.log("created")
        //     this.product = response.data.product
        //     this.allColour = response.data.colour
        //     this.allSize = response.data.size
        // }
        // this.mainImage = this.product.productImage;
        // let obb = {
        //     created_at:"2020-12-05 14:02:37",
        //     id:44,
        //     productId:30,
        //     updated_at:"2020-12-05 14:02:37",
        //     url:this.product.productImage
        // }
        // this.product.allImages.unshift(obb);
        this.mainImage = this.product.allImages[0].url;
        this.title = this.product.productName+' '+this.product.model
        if(this.allColour.length == 0 && this.allSize.length == 0) await this.getVariableProduct()
        if(this.product.allImages.length > 3) this.isInfiniteScroll = true
        const [res,res3]= await Promise.all([
            this.callApi('get',`/app/relatedProduct/${this.$route.params.id}`),
            this.callApi('get',`/app/reviews/${this.$route.params.id}`)
        ])
        
        if(res.status == 200 && res3.status == 200){
            this.relatedProduct = res.data.product
            this.reviews = res3.data.reviews
            
        }
        else{
            this.swr()
        }
        this.isLoading = false
        this.newSlider.right =( parseInt(this.newSlider.bestGroupFeaturedIndex)+5 > this.relatedProduct.length)? false : true
        this.newSlider.left =( parseInt(this.newSlider.bestGroupFeaturedIndex)-1 < 0)? false : true
       
    }
}
</script>
<style  scoped>
._pointer{
    cursor: pointer;
}
.andu{
    font-size: 14px;
}
.add-to-link {
    padding-top: 30px;
}
</style>