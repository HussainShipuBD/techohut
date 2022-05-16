<template>
<div>
   <div id="main-wrapper">
      <!--slider section start-->
      <div class="_hero_section" v-if="landingPageSetting && landingPageSetting.mainHeader==1"> 
         <Carousel autoplay loop :autoplay-speed="5000">
            <!-- <CarouselItem v-for="(item,index) in headerSlider " :key="index">
               <div style="cursor:pointer;" @click="goToProductLink(item.link)">
                  <div class="_hero_section_items">
                     <div class="_hero_section_all">
                        <div class="container">
                           <div class="_hero_section_main">
                              <p class="_hero_section_title" :style="{color: item.color}">{{item.subHeader}}</p>
                              <h1 class="_hero_section_text" :style="{color: item.color}">{{item.header}}</h1>
                           </div>
                        </div>
                     </div>
                     <img :src="item.image" alt title />
                     
                  </div>
               </div>
            </CarouselItem> -->
            <CarouselItem>
               <img src="https://techohut.com/wp-content/uploads/elementor/thumbs/1-2-phur0qoyda901mleki8vl903z3k0nmg7npnb8i8ine.jpg" alt="" title=""> 
            </CarouselItem> 
            <CarouselItem>
               <img src="https://techohut.com/wp-content/uploads/elementor/thumbs/3-1-phur0tigxscv0ghb41graqahr964apreo3lroc4c4q.jpg" alt="" title=""> 
            </CarouselItem> 
            <CarouselItem>
               <img src="https://techohut.com/wp-content/uploads/elementor/thumbs/4-1-phur0ugb4me5c2fxyjvdv81ycn1hiev508995m2xyi.jpg" alt="" title=""> 
            </CarouselItem> 
         </Carousel>
      </div>
      <!--slider section start-->

      <!--Banner section start-->
      <!-- <div>
         <div class="banner-section section pt-30" v-if=" middleCards  && middleCards.length>0">
            <div class="container-fluid pl-20 pr-20 pl-lg-15 pr-lg-15 pl-md-15 pr-md-15 pl-sm-15 pr-sm-15 pl-xs-15 pr-xs-15">
               <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item,index) in middleCards" :key="index">
                     <div class="single-banner-item mb-30">
                        <div class="banner-image">
                               <a :href="item.link"  target="_blank" rel="noopener noreferrer"><img :src="item.image" alt /></a>
                        </div>
                        <div class="banner-content">
                           <h4 class="title-light" :style="{color: item.color}">{{item.subHeader}}</h4>
                           <h3 class="title" :style="{color: item.color}">{{item.header}}</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div v-else class="_no_data">
            <Icon type="md-folder" />
            <p>No data found</p>
         </div>
      </div> -->
      <!--Banner section end-->

      <!-- Category -->
      <div class="_homeCat">
         <div class="container">
            <div class="_homeCat_con">
               <div class="row align-item-center">
                  <div class="col-12 col-md-3 col-lg-3">
                     <h1 class="_homeCat_title">Find Exactly What You Need</h1>

                     <p class="_homeCat_text">TECHOHUT is the World’s largest online marketplace connecting buyers with suppliers.</p>
                  </div>

                  <div class="col-6 col-md col-lg">
                     <a href="" class="_homeCat_card">
                        <div class="_homeCat_card_pic">
                           <img class="_homeCat_card_img" src="electronic.jpg" alt="" title="">
                        </div>

                        <p class="_homeCat_card_text">Electronic</p>
                     </a>
                  </div>
                  <div class="col-6 col-md col-lg">
                     <a href="" class="_homeCat_card">
                        <div class="_homeCat_card_pic">
                           <img class="_homeCat_card_img" src="kitchen.jpg" alt="" title="">
                        </div>

                        <p class="_homeCat_card_text">Kitchen</p>
                     </a>
                  </div>
                  <div class="col-6 col-md col-lg">
                     <a href="" class="_homeCat_card">
                        <div class="_homeCat_card_pic">
                           <img class="_homeCat_card_img" src="console.jpg" alt="" title="">
                        </div>

                        <p class="_homeCat_card_text">Console</p>
                     </a>
                  </div>
                  <div class="col-6 col-md col-lg">
                     <a href="" class="_homeCat_card">
                        <div class="_homeCat_card_pic">
                           <img class="_homeCat_card_img" src="apparels.jpg" alt="" title="">
                        </div>

                        <p class="_homeCat_card_text">Apparels</p>
                     </a>
                  </div>
                  <div class="col-6 col-md col-lg">
                     <a href="" class="_homeCat_card">
                        <div class="_homeCat_card_pic">
                           <img class="_homeCat_card_img" src="furniture.jpg" alt="" title="">
                        </div>

                        <p class="_homeCat_card_text">Furniture</p>
                     </a>
                  </div>
                  <div class="col-6 col-md col-lg">
                     <a href="" class="_homeCat_card">
                        <div class="_homeCat_card_pic">
                           <img class="_homeCat_card_img" src="computer.jpg" alt="" title="">
                        </div>

                        <p class="_homeCat_card_text">Computer</p>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- Category -->

      <!--Best Product section start-->
      <div class="_bestSec" v-if="landingPageSetting && landingPageSetting.bestProducts==1">
         <div class="container">
            <div class="_bestSec_con"  v-if="!isLoading && bestGroup && bestGroup.length>0">
               <div class="_bestSec_top">
                  <h1 class="_bestSec_title">Best <span>Products</span></h1>

                  <ul class="_bestSec_list">
                     <li  v-for="(item,index) in bestGroup" :key="index">
                        <a :class="(best.bestGroupIndex == index)? 'active _bestSec_list_text' : '_bestSec_list_text'" data-toggle="tab" href="#furniture" @click="best.bestGroupIndex = index">{{item.groupName}}</a>
                     </li>
                  </ul>
               </div>

               <div class="_bestSec_cards">
                  <div class="row">
                     <hooper style="height:auto" class="_1hooper" :infiniteScroll="true" :settings="hooperSettings">
                        <slide v-for="(p,i)  in  bestProducts" :key="i">
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

            <div v-else-if="isLoading && bestGroup && bestGroup.length == 0 ">
               <h2 class="text-center"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;" >Content Loading...</span>.</h2>
            </div>
            <div v-else class="_no_data">
               <Icon type="md-folder" />
               <p>No data found</p>
            </div>
         </div>
      </div>
      <!--Best Product section end-->

      <!-- Featured Products -->
      <div class="_bestSec" v-if="landingPageSetting && landingPageSetting.newProducts==1">
         <div class="container">
            <div class="_faut_con" v-if="!isLoading && featuredProducts && featuredProducts.length>0">
               <div class="_bestSec_top">
                  <h1 class="_bestSec_title">Featured <span>Products</span></h1>
               </div>

               <div class="_bestSec_cards">
                  <div class="row">
                     <hooper style="height:auto" class="_1hooper" :infiniteScroll="true" :settings="hooperSettings">
                        <slide v-for="(p,i)  in  featuredProducts" :key="i">
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

            <div v-else-if="isLoading && featuredProducts && featuredProducts.length == 0 ">
               <h2 class="text-center"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;" >Content Loading...</span>.</h2>
            </div>
            <div v-else class="_no_data">
               <Icon type="md-folder" />
               <p>No data found</p>
            </div>
         </div>
      </div>
      <!-- Featured Products -->
      
      <!--Banner section start-->
      <div v-if="landingPageSetting && landingPageSetting.promotionalCards==1">
         <div class="banner-section section" v-if="!isLoading && promotionalCards && promotionalCards.length>0">
            <div class="container-fluid pl-20 pr-20 pl-lg-15 pr-lg-15 pl-md-15 pr-md-15 pl-sm-15 pr-sm-15 pl-xs-15 pr-xs-15">
               <div class="row">
                  <div class="col-md-6" v-for="(item,index) in promotionalCards " :key="index">
                     <!-- Single Banner Start -->
                     <div class="single-banner-item">
                        <div class="banner-image">
                            <a :href="item.link"  target="_blank" rel="noopener noreferrer"><img :src="item.image" alt /></a>
                        </div>
                        <div class="banner-content banner-content-two">
                           <h4 class="title-light" :style="{color: item.color}">{{item.subHeader}}</h4>
                           <h3 class="title" :style="{color: item.color}">{{item.header}}</h3>
                            <!-- <a :href="item.link" :style="{color: item.color}" target="_blank" rel="noopener noreferrer">{{item.buttonText}} <i class="fas fa-chevron-circle-right"></i></a> -->
                        </div>
                     </div>
                     <!-- Single Banner End -->
                  </div>
               </div>
            </div>
         </div>
         <div v-else-if="isLoading && promotionalCards && promotionalCards.length == 0 ">
            <h2 class="text-center"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;" >Content Loading...</span>.</h2>
         </div>
         <!-- <div v-else>
            <h4 class="text-center">No Data Found...</h4>
         </div> -->
      </div>
      <!--Banner section end-->

      <!-- Poster -->
      <div class="_poster">
         <a href="https://dreamsgallerybd.com/shop">
            <img class="_poster_img" src="https://admin.dreamsgallerybd.com/uploads/mr8b0Mn5SpHo4qJusrafmaF8fHeaPjeFcTq0vGh4.jpeg" alt="" title="">
         </a>
      </div>
      <!-- Poster -->

      <!-- Latest Arrivals -->
      <div class="_bestSec" v-if="landingPageSetting && landingPageSetting.bestProducts==1">
         <div class="container">
            <div class="_bestSec_con"  v-if="!isLoading && bestGroup && bestGroup.length>0">
               <div class="_bestSec_top">
                  <h1 class="_bestSec_title">Latest <span>Arrivals</span></h1>
               </div>

               <div class="_bestSec_cards">
                  <div class="row">
                     <hooper style="height:auto" class="_1hooper" :infiniteScroll="true" :settings="hooperSettings">
                        <slide v-for="(p,i)  in  bestProducts" :key="i">
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

            <div v-else-if="isLoading && bestGroup && bestGroup.length == 0 ">
               <h2 class="text-center"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;" >Content Loading...</span>.</h2>
            </div>
            <div v-else class="_no_data">
               <Icon type="md-folder" />
               <p>No data found</p>
            </div>
         </div>
      </div>
      <!-- Latest Arrivals -->

      <!-- Poster -->
      <div class="_poster">
         <a href="https://dreamsgallerybd.com/shop">
         <img class="_poster_img" src="https://admin.dreamsgallerybd.com/uploads/SoysJ1ueqMX62gGFsGsKpNMPHimnAzwuoIfIy4LC.jpeg" alt="" title="">
         </a>
      </div>
      <!-- Poster -->

      <!-- Ads -->
      <div class="_add_all">
         <div class="container">
            <div class="_ads">
               <div class="section-title mb-20 pt-20">
                  <h2>Discount Privilege</h2>
               </div>

               <div class="_1slider _2slider">
                  <!-- Next Pervious -->
                  <div class="_1slider_pr_next_main">
                     <div class="_1slider_pr_next _1next" :class="(!restaurantSlider.left)? 'disable': ''" @click="moverestaurantSliderSlider(2)">
                        <i class="fa fa-angle-left"></i>
                     </div>
                     <div class="_1slider_pr_next _1pre" :class="(!restaurantSlider.right)? 'disable': ''" @click="moverestaurantSliderSlider(1)">
                        <i class="fa fa-angle-right"></i>
                     </div>
                  </div>
                  <!-- Next Pervious -->
                  <div class="_1slider_all">
                     <div class="_1slider_items_all" :style="restaurantSlider.style">
                        <!-- Items -->
                        <div class="slider_items slider_active" v-for="(p,i)  in  restaurants" :key="i">
                           <div class="item">
                              <div class="single-grid-product">
                                 <div class="_ads_main">
                                    <img class="_ads_img" :src="p.img" alt="" title="">

                                    <a :href="p.link" class="_ads_title" target="_blank" rel="noopener noreferrer">{{p.title}}</a>
                                    <p class="_ads_text">{{p.subtitle}}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <!-- Items -->
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- Ads -->

      
   </div>
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

   data() {
   return {
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
      restaurants: [],
      extraPixel:0,
      bestGroup: [],
      headerSlider: [],
      middleCards: [],
      promotionalCards: [],
      landingPageSetting: {
        mainHeader: 0,
        middleCards: 0,
        promotionalCards: 0,
        bestProducts: 0,
        newProducts: 0,
        featuredProducts: 0,
      },
      newProducts: [],
      featuredProducts: [],
      best: {
        style: {
          transform: "translate3d(0px, 0px, 0px)"
        },
        t: 0,
        left: false,
        right: true,
        bestGroupIndex: 0,
        bestGroupProductIndex: 0
      },
      featured: {
        style: {
          transform: "translate3d(0px, 0px, 0px)"
        },
        t: 0,
        left: false,
        right: true,
        bestGroupFeaturedIndex: 0
      },
      newSlider: {
        style: {
          transform: "translate3d(0px, 0px, 0px)"
        },
        t: 0,
        left: false,
        right: true,
        bestGroupFeaturedIndex: 0
      },
      restaurantSlider: {
        style: {
          transform: "translate3d(0px, 0px, 0px)"
        },
        t: 0,
        left: false,
        right: true,
        bestGroupFeaturedIndex: 0
      },
      isLoading: true,
      value1: 10
    };
  },
  methods: {
     goToProductLink(link){
        location.href = link
     },
    moveBestSlider(flag) {
      console.log("flag");

      console.log(flag);
      if (flag == 2) {
        if (parseInt(this.best.bestGroupProductIndex) - 1 < 0) return;
        this.best.bestGroupProductIndex = this.best.bestGroupProductIndex - 1;
        this.best.t = parseInt(this.best.t) + 300 + this.extraPixel;
        this.best.style.transform = `translate3d(${this.best.t}px, 0px, 0px)`;
      } else if (flag == 1) {
        if (
          parseInt(this.best.bestGroupProductIndex) + 4 >
          this.bestGroup[this.best.bestGroupIndex].products.length
        )
          return;
        this.best.bestGroupProductIndex = this.best.bestGroupProductIndex + 1;
        this.best.t = parseInt(this.best.t) - 300 - this.extraPixel;
        this.best.style.transform = `translate3d(${this.best.t}px, 0px, 0px)`;
      }
      this.best.right =
        parseInt(this.best.bestGroupProductIndex) + 4 >
        this.bestGroup[this.best.bestGroupIndex].products.length
          ? false
          : true;
      this.best.left =
        parseInt(this.best.bestGroupProductIndex) - 1 < 0 ? false : true;
      console.log(this.best.style.transform);
    },
    moveFeaturedSlider(flag) {
      console.log("flag");

      console.log(flag);
      if (flag == 2) {
        if (parseInt(this.featured.bestGroupFeaturedIndex) - 1 < 0) return;
        this.featured.bestGroupFeaturedIndex =
          this.featured.bestGroupFeaturedIndex - 1;
        this.featured.t = parseInt(this.featured.t) + 300 + this.extraPixel;
        this.featured.style.transform = `translate3d(${this.featured.t}px, 0px, 0px)`;
      } else if (flag == 1) {
        if (
          parseInt(this.featured.bestGroupFeaturedIndex) + 5 >
          this.featuredProducts.length
        )
          return;
        this.featured.bestGroupFeaturedIndex =
          this.featured.bestGroupFeaturedIndex + 1;
        this.featured.t = parseInt(this.featured.t) - 300 - this.extraPixel;
        this.featured.style.transform = `translate3d(${this.featured.t}px, 0px, 0px)`;
      }
      this.featured.right =
        parseInt(this.featured.bestGroupFeaturedIndex) + 5 >
        this.featuredProducts.length
          ? false
          : true;
      this.featured.left =
        parseInt(this.featured.bestGroupFeaturedIndex) - 1 < 0 ? false : true;
      console.log(this.featured.style.transform);
    },
    moveNewSlider(flag) {
      console.log("flag");

      console.log(flag);
      if (flag == 2) {
        if (parseInt(this.newSlider.bestGroupFeaturedIndex) - 1 < 0) return;
        this.newSlider.bestGroupFeaturedIndex =
          this.newSlider.bestGroupFeaturedIndex - 1;
        this.newSlider.t = parseInt(this.newSlider.t) + 300 + this.extraPixel;
        this.newSlider.style.transform = `translate3d(${this.newSlider.t}px, 0px, 0px)`;
      } else if (flag == 1) {
        if (
          parseInt(this.newSlider.bestGroupFeaturedIndex) + 5 >
          this.featuredProducts.length
        )
          return;
        this.newSlider.bestGroupFeaturedIndex =
          this.newSlider.bestGroupFeaturedIndex + 1;
        this.newSlider.t = parseInt(this.newSlider.t) - 300 - this.extraPixel;
        this.newSlider.style.transform = `translate3d(${this.newSlider.t}px, 0px, 0px)`;
      }
      this.newSlider.right =
        parseInt(this.newSlider.bestGroupFeaturedIndex) + 5 >
        this.featuredProducts.length
          ? false
          : true;
      this.newSlider.left =
        parseInt(this.newSlider.bestGroupFeaturedIndex) - 1 < 0 ? false : true;
      console.log(this.newSlider.style.transform);
    },
    moverestaurantSliderSlider(flag) {
      console.log("flag");

      console.log(flag);
      if (flag == 2) {
        if (parseInt(this.restaurantSlider.bestGroupFeaturedIndex) - 1 < 0) return;
        this.restaurantSlider.bestGroupFeaturedIndex =
          this.restaurantSlider.bestGroupFeaturedIndex - 1;
        this.restaurantSlider.t = parseInt(this.restaurantSlider.t) + 300 + this.extraPixel;
        this.restaurantSlider.style.transform = `translate3d(${this.restaurantSlider.t}px, 0px, 0px)`;
      } else if (flag == 1) {
        if (
          parseInt(this.restaurantSlider.bestGroupFeaturedIndex) + 5 >
          this.restaurants.length
        )
          return;
        this.restaurantSlider.bestGroupFeaturedIndex =
          this.restaurantSlider.bestGroupFeaturedIndex + 1;
        this.restaurantSlider.t = parseInt(this.restaurantSlider.t) - 300 - this.extraPixel;
        this.restaurantSlider.style.transform = `translate3d(${this.restaurantSlider.t}px, 0px, 0px)`;
      }
      this.restaurantSlider.right =
        parseInt(this.restaurantSlider.bestGroupFeaturedIndex) + 5 >
        this.restaurants.length
          ? false
          : true;
      this.restaurantSlider.left =
        parseInt(this.restaurantSlider.bestGroupFeaturedIndex) - 1 < 0 ? false : true;
      console.log(this.restaurantSlider.style.transform);
    },
    checkButtons() {
      this.newSlider.right =
        parseInt(this.newSlider.bestGroupFeaturedIndex) + 5 >
        this.featuredProducts.length
          ? false
          : true;
      this.newSlider.left =
        parseInt(this.newSlider.bestGroupFeaturedIndex) - 1 < 0 ? false : true;

      this.featured.right = parseInt(this.featured.bestGroupFeaturedIndex) + 5 > this.featuredProducts.length? false: true;
      this.featured.left = parseInt(this.featured.bestGroupFeaturedIndex) - 1 < 0 ? false : true;
      this.restaurantSlider.right = parseInt(this.restaurantSlider.bestGroupFeaturedIndex) + 5 > this.restaurants.length? false: true;
      this.restaurantSlider.left = parseInt(this.restaurantSlider.bestGroupFeaturedIndex) - 1 < 0 ? false : true;

      this.best.right = parseInt(this.best.bestGroupProductIndex) + 4 >this.bestGroup[this.best.bestGroupIndex].products.length ? false : true;
      this.best.left = parseInt(this.best.bestGroupProductIndex) - 1 < 0 ? false : true;

    }
  },
  computed: {
    bestProducts() {
      let pp = JSON.stringify(this.bestGroup[this.best.bestGroupIndex]);
      pp = JSON.parse(pp);

      let p = pp.products.splice(0, 6);
      for (let d of p) d.isWishList = false;
      console.log(p);
      return p;
    }
  },
  async asyncData({ app, store, redirect, params }) {
    try {
      let [res1, res2] = await Promise.all([
        app.$axios.get(`app/allSliders`),
        app.$axios.get(`app/landingPageSetting`),
      ]);
      //let {data} = app.$axios.get(`app/allSliders`)
      
      return {
        headerSlider: res1.data.headerSlider,
        middleCards: res1.data.middleCards,
        promotionalCards: res1.data.promotionalCards,
        landingPageSetting: res2.data.landingPageSetting
      };
    } catch (error) {
      console.log('error from server');
      console.log(error);
    //   return redirect("/");
    }
  },
   mounted(){
         if(window.innerWidth < 1025 && window.innerWidth > 768){
               this.extraPixel = 630
         }
        else if(window.innerWidth < 769 && window.innerWidth >540){
               this.extraPixel = 388
         }
        else if(window.innerWidth < 541 && window.innerWidth >414 ){
               this.extraPixel = 208
         }
        else if(window.innerWidth < 415 && window.innerWidth > 375 ){
               this.extraPixel = 82
         }
        else if(window.innerWidth < 376 && window.innerWidth > 360 ){
               this.extraPixel = 45
         }
        else if(window.innerWidth < 361  ){
               this.extraPixel = 30
         }
   },
  async created() {
    const [res, res1, res2 ,res3,res4,res5] = await Promise.all([
      this.callApi("get", "app/getBestGroupWithProduct"),
      this.callApi("get", "app/featuredProducts"),
      this.callApi("get", "app/newProducts"),
      this.callApi("get", "app/allSliders"),
      this.callApi("get", "app/landingPageSetting"),
      this.callApi("get", "app/restaurants"),
    ]);
    if (res.status == 200 && res5.status == 200 && res1.status== 200 && res2.status == 200 && res3.status == 200 && res4.status == 200) {
      this.bestGroup = res.data.group;
      this.featuredProducts = res1.data.f;
      this.newProducts = res2.data.n;
      this.headerSlider= res3.data.headerSlider
      this.middleCards= res3.data.middleCards
      this.promotionalCards= res3.data.promotionalCards
      this.landingPageSetting = res4.data.landingPageSetting
      this.restaurants = res5.data.restaurants
    } else {
      this.swr();
    }
   this.isLoading = false;
    if(this.bestGroup.length>0){
       for(let i in  this.bestGroup){
          if (this.bestGroup[i].products.length>0) {
             this.best.bestGroupIndex = i;
             return;
          } 
       }
    }
   //this.checkButtons();
  }
};
</script>

<style  scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
  overflow: hidden;
  visibility: visible;
  opacity: 1;
  position: absolute;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>