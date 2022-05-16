<template>
    <div id="main-wrapper" class="_shop_all">
        <!-- Page Banner Section Start -->
        <!-- <div class="page-banner-section section bg-image" data-bg="/assets/images/bg/breadcrumb.jpg">
            <div class="container">
                <div class="row">
                    <div class="col">

                        <div class="page-banner text-center">
                            <h2>Shop</h2>
                            <ul class="page-breadcrumb">
                                <li><a href="index.html">Home</a></li>
                                <li>Shop</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div> -->

        <!-- Mobile Filter nav -->
        <div style="display:none" class="_1filter">
            <div class="_1filter_top">
                <p class="_1filter_icon"><i class="fas fa-chevron-left"></i></p>
                <p class="_1filter_title">Filter</p>
            </div>

            <div class="_1filter_main">
                <div class="_1filter_item">
                    <p class="_1filter_name">Filter by price</p>

                    <div class="_1filter_price">
                        <div class="_1filter_price_item">
                            <input placeholder="Minimum">
                        </div>

                        <p class="_1filter_price_item_or">-</p>

                        <div class="_1filter_price_item">
                            <input placeholder="Maximum">
                        </div>
                    </div>
                </div>

                <div class="_1filter_item">
                    <p class="_1filter_name">Brand</p>

                    <div class="_1filter_select">
                        <Select class="_my_select" placeholder="Select">
                            <Option></Option>
                            <Option></Option>
                            <Option></Option>
                        </Select>
                    </div>
                </div>
                <div class="_1filter_item">
                    <p class="_1filter_name">Color</p>

                    <div class="_1filter_select">
                        <Select class="_my_select" placeholder="Select">
                            <Option></Option>
                            <Option></Option>
                            <Option></Option>
                        </Select>
                    </div>
                </div>
                <div class="_1filter_item">
                    <p class="_1filter_name">Category</p>

                    <div class="_1filter_select">
                        <Select class="_my_select" placeholder="Select">
                            <Option></Option>
                            <Option></Option>
                            <Option></Option>
                        </Select>
                    </div>
                </div>
                <div class="_1filter_item">
                    <p class="_1filter_name">Product tags</p>

                    <div class="_1filter_tag">
                        <ul class="_1filter_tag_list">
                            <li>Face</li>
                            <li class="_active">Eyes</li>
                            <li>Lips</li>
                            <li>Skin</li>
                            <li>Hair</li>
                            <li>Body</li>
                            <li>Foot</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="_1filter_bottom">
                <div class="_1filter_bottom_item">
                    <button class="" type="button">RESET</button>
                </div>
                <div class="_1filter_bottom_item">
                    <button class="" type="button">APPLY</button>
                </div>
            </div>
        </div>
        <!-- Mobile Filter nav -->


        <!-- Page Banner Section End -->
        <div class="row _shopPage_search">
            <div class="col-md-12">
                <div class="">
                    <form class="checkout-form search-item" v-on:submit.prevent v-if="isSearchBox">
                        <div class="_header_search_main shop_search"  :class="(isSearch)? 'active': ''">
                            <i class="ion-ios-search-strong"></i>
                            <input type="text" placeholder="What would you like to buy?" ref="shopSearch" v-model="globalStr" @focus="focasTest" v-on-clickaway="awaySearch"  v-debounce:1s="filterData">
                        </div>
                    </form>
                </div>

            </div>
        </div>

        <!-- Shop Section Start -->
        <div class="shop-section section mt-50">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="shop-area sb-border pb-70 pb-lg-50 pb-md-40 pb-sm-60 pb-xs-50">
                            <div class="row _desk_filter">
                                <div class="col-12">
                                    <!-- Grid & List View Start -->
                                    <div class="shop-topbar-wrapper d-flex justify-content-between align-items-center">
                                        <div class="grid-list-option d-flex _flex_row align-items-center">
                                            <!-- <p class="_result_mobile" v-if="allProducts.total>0">Showing {{allProducts | showResult}} of {{allProducts.total}} results</p> -->
                                            <div class="_2filter">
                                                <div class="_2filter_items _my_select">
                                                    <Select placeholder="CATEGORY" style="width:113px" v-model="groupId" @on-change="filterData" clearable>
                                                        <Option v-for="(item,index) in allGroups" :key="index" :value="item.id"> {{item.groupName}}</Option>
                                                    </Select>
                                                </div>
                                                <div class="_2filter_items _my_select" v-if="groupId">
                                                    <Select placeholder="SUB CATEGORY" style="width:150px" v-model="categoryId"   @on-change="filterData" clearable>
                                                        <Option v-for="(item,index) in getSelectedSubCategory" :key="index" :value="item.id"> {{item.catName}}</Option>
                                                    </Select>
                                                </div>
                                                <div class="_2filter_items _my_select">
                                                    <Select placeholder="BRANDS" style="width:95px" v-model="brandId"   @on-change="filterData" clearable>
                                                        <Option v-for="(item,index) in allBrands" :key="index" :value="item.id"> {{item.name}}</Option>
                                                    </Select>
                                                </div>
                                                <div class="_2filter_items _my_select">
                                                    <Select placeholder="COLORS" style="width:95px" v-model="colour" @on-change="filterData" clearable >
                                                         <Option v-for="(item,index) in allColors" :key="index" :value="item.color"> {{item.color}}</Option>
                                                    </Select>
                                                </div>
                                                <div class="_2filter_items _my_select">
                                                    <Select placeholder="FILTER BY PRICE" style="width:150px" v-model="priceType" @on-change="onPriceChange" clearable >
                                                          <Option value="1" >less than ৳500</Option>
                                                          <Option value="2" >৳500 - ৳1000</Option>
                                                          <Option value="3" >৳1000 - ৳2000</Option>
                                                          <Option value="4" >৳2000 - ৳5000</Option>
                                                          <Option value="5" >৳5000 - ৳10000</Option>
                                                          <Option value="6" >৳10000 - ৳20000</Option>
                                                    </Select>
                                                </div>
                                            </div>

                                            <!-- <ul class="nav _mobile_nav">
                                                <li>
                                                <a :class="(thumbnail)? 'active show' : ''" @click="thumbnail=true" data-toggle="tab" href="#grid"><i class="fa fa-th"></i></a>
                                                </li>
                                                <li>
                                                <a :class="(!thumbnail)? 'active show' : ''" @click="thumbnail=false" data-toggle="tab" href="#list" class=""><i class="fa fa-th-list"></i></a>
                                                </li>
                                            </ul> -->
                                            <div class="_filter_main">
                                                <span class="_filter" @click="isFilterOption = !isFilterOption">
                                                    <span v-if="isFilterOption">Filter <i class="fas fa-chevron-up"></i></span>
                                                    <span v-else>Filter <i class="fas fa-chevron-down"></i></span>
                                                </span>
                                                <!-- <button class="save-change-btn" @click="isFilterOption = !isFilterOption" >{{isFilterOption?'Hide Filter Option' : 'Show Filter Option'}}</button> -->
                                            </div>
                                            <!-- <p class="_result" v-if="allProducts.total>0" >Showing {{allProducts | showResult}} of {{allProducts.total}} results</p> -->

                                            <div class="toolbar-shorter align-items-center _mobile_only">
                                               <!--  <label class="_mobile_label">Sort By:</label> -->
                                                <Select placeholder="Sort By" style="width:190px" v-model="variableOrder" clearable  @on-change="sortData" >
                                                    <!-- <option data-display="Select">Nothing</option> -->

                                                    <Option  value="1">Relevance</Option>
                                                    <Option  value="2">Name, A to Z</Option>
                                                    <Option  value="3">Name, Z to A</Option>
                                                    <Option  value="4">Price, low to high</Option>
                                                    <Option  value="5">Price, high to low</Option>
                                                </Select>
                                            </div>
                                        </div>

                                        <!--Toolbar Short Area Start-->
                                        <div class="toolbar-short-area d-md-flex align-items-center">
                                            <div class="toolbar-shorter align-items-center _mobile_only_none _my_select">
                                                <!-- <label>Sort By:</label> -->
                                                <Select placeholder="SORT BY" style="width:96px" v-model="variableOrder" clearable  @on-change="sortData" >
                                                    <!-- <option data-display="Select">Nothing</option> -->
                                                    <Option value="1">Relevance</Option>
                                                    <Option value="2">Name, A to Z</Option>
                                                    <Option value="3">Name, Z to A</Option>
                                                    <Option value="4">Price, low to high</Option>
                                                    <Option value="5">Price, high to low</Option>
                                                </Select>
                                            </div>

                                        </div>
                                        <!--Toolbar Short Area End-->
                                    </div>
                                    <!-- Grid & List View End -->
                                </div>
                            </div>
                            <div class="row">
                                <div style="display:none" class="col-lg-3" v-if="isFilterOption">
                                    <!-- Single Sidebar Start  -->
                                    <div class="common-sidebar-widget">
                                        <h3 class="sidebar-title">Product categories</h3>
                                        <ul class="sidebar-list">
                                            <li v-for="(item,index) in allGroups" :key="index" ><a :class="(groupId == item.id)? 'active' : ''" @click="expandAndShowSubCat(item,index)">
                                                <i v-if="subCateShow.show && subCateShow.index== index " class="fa fa-minus"></i>
                                                <i v-else class="fa fa-plus"></i>
                                                {{item.groupName}} <span class="count">({{item.__meta__.products_count}})</span></a>
                                                <transition name="slide-fade">
                                                    <ul class="sidebar-list-sub" v-if="subCateShow.show && subCateShow.index== index ">
                                                        <li v-for="(cat,catIndex) in item.category" :key="catIndex" ><a :class="(categoryId == cat.id)? 'active' : ''" @click="changeCat(cat,catIndex)" ><i class="fa fa-plus"></i>{{cat.catName}} <span class="count">({{cat.__meta__.products_count}})</span></a></li>
                                                    </ul>
                                                </transition>


                                            </li>
                                        </ul>
                                    </div>
                                    <!-- Single Sidebar End  -->
                                    <!-- Single Sidebar Start  -->
                                    <div class="common-sidebar-widget">
                                        <h3 class="sidebar-title">Brand</h3>
                                        <div class="sidebar_select">
                                            <Select  v-model="brandId" @on-change="filterData" clearable  filterable placeholder="Select Brand">
                                                <Option v-for="(item,index) in allBrands" :key="index" :value="item.id">{{item.name}}</Option>
                                            </Select>
                                            <!-- <select class="wide _1select" v-model="brandId" v-on:change="filterData">
                                                <option v-for="(item,index) in allBrands" :key="index" :value="item.id">{{item.name}}</option>
                                            </select> -->
                                        </div>
                                    </div>
                                    <!-- Single Sidebar End  -->
                                    <!-- Single Sidebar Start  -->
                                    <div class="common-sidebar-widget">
                                        <h3 class="sidebar-title">Colors</h3>
                                        <div class="sidebar_select">
                                            <Select  v-model="colour" @on-change="filterData" clearable  filterable placeholder="Select Color">
                                                <Option  value="none">None</Option>
                                                <Option v-for="(item,index) in allColors" :key="index" :value="item.color">{{item.color}}</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <!-- Single Sidebar End  -->
                                     <!-- Single Sidebar Start  -->
                                    <div class="common-sidebar-widget">
                                        <h3 class="sidebar-title">Filter by price</h3>
                                        <div class="_pricce_slider">
                                            <div class="_pricce_slider_input">
                                                <input @keyup.enter="filterData" placeholder="Min" type="number" min="1" v-model="minPrice"/>
                                            </div>

                                            <p class="_pricce_slider_p"> - </p>

                                            <div class="_pricce_slider_input">
                                                <input @keyup.enter="filterData" placeholder="Max" type="number" min="1" v-model="maxPrice"/>
                                            </div>

                                            <div class="_pricce_slider_button">
                                                <button class="_pricce_slider_button_btn" type="button" @click="filterData">
                                                    <i class="fas fa-caret-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Single Sidebar End  -->

                                    <!-- Single Sidebar Start  -->
                                    <div class="common-sidebar-widget">
                                        <h3 class="sidebar-title">Product tags</h3>
                                        <ul class="sidebar-tag">
                                            <li v-for="(item,index) in allTags" :key="index"><a :class="(item.isSelected)? 'active': ''" @click="sortTag(item,index)">{{item.name}}</a></li>
                                            <!-- <li><a href="#">clothes</a></li>
                                            <li><a href="#">fashion</a></li>
                                            <li><a href="#">handbag</a></li>
                                            <li><a href="#">laptop</a></li> -->
                                        </ul>
                                    </div>
                                    <!-- Single Sidebar Start  -->

                                    <!-- Single Sidebar End  -->
                                </div>

                                <div class="col-lg-12" id="mainShopDiv">
                                    <div class="shop-product">
                                        <div id="myTabContent-2" class="tab-content _tab_content" v-if="allProducts.length >0 && !isLoading">
                                            <div id="grid" class="tab-pane fade " :class="(thumbnail)? 'active show' : ''">
                                                <div class="product-grid-view">
                                                    <div class="row">
                                                        <div class="col-6 col-lg-3 col-md-4" v-for="(p,i) in allProducts" :key="i" >
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="list" class="tab-pane fade" :class="(!thumbnail)? 'active show' : ''">
                                                <div class="product-list-view">
                                                    <!-- Single List Product Start -->
                                                    <div class="product-list-item mb-40" v-for="(p,i) in allProducts" :key="i">
                                                        <div class="row">
                                                            <div class="col-md-4 col-sm-6" >
                                                            <div class="single-grid-product">
                                                                <div class="product-image">
                                                                        <div class="product-label">
                                                                        <span v-if="p.discount>0" class="sale">-{{p.discount}}%</span>
                                                                        <span v-if="p.isNew" class="new">New</span>
                                                                    </div>
                                                                    <nuxt-link :to="{name:'single-product-id', params: { id:p.id } }">
                                                                            <img :src="p.productImage" class="img-fluid" alt="">
                                                                    </nuxt-link>

                                                                    <div class="product-action d-flex justify-content-between">
                                                                        <template v-if="p.stock>0">
                                                                            <a class="product-btn" @click="showQuickItemOnFromShop(p)" >Add to Cart</a>
                                                                        </template>
                                                                        <template v-else>
                                                                            <a class="product-btn" @click="showQuickItemOnFromShop(p)">Pre-Order</a>
                                                                        </template>
                                                                        <ul class="d-flex">
                                                                            <li><a @click="storeWishList(p,i)" :class="(p.isWishList==true)? 'wishlist-active' : ''"><i class="far fa-heart"></i></a></li>
                                                                            <li><a @click="showQuickItemOnFromShop(p)" data-toggle="modal" title="Quick View"><i class="ion-ios-search-strong"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div class="col-md-8 col-sm-6">
                                                                <div class="product-content-shop-list">
                                                                    <div class="product-content">
                                                                            <nuxt-link to="/shop" v-if="p.allcategory">{{p.allcategory.catName}}</nuxt-link>
                                                                        <h3 class="title"> <nuxt-link :to="{name:'single-product-id', params: { id:p.id } }">{{p.productName}}  {{p.model}}</nuxt-link></h3>
                                                                        <div class="product-category-rating">
                                                                                <span class="rating" v-if="p.avgRating == null">
                                                                                <i class="fa fa-star-o"></i>
                                                                                <i class="fa fa-star-o"></i>
                                                                                <i class="fa fa-star-o"></i>
                                                                                <i class="fa fa-star-o"></i>
                                                                                <i class="fa fa-star-o"></i>
                                                                            </span>
                                                                            <span class="rating" v-else-if="p.avgRating != null">
                                                                                <span> <i :class="(p.avgRating.averageRating>0)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                                                <span> <i :class="(p.avgRating.averageRating>1)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                                                <span> <i :class="(p.avgRating.averageRating>2)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                                                <span> <i :class="(p.avgRating.averageRating>3)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                                                <span> <i :class="(p.avgRating.averageRating>4)? 'fa fa-star active' : 'fa fa-star-o'"></i></span>
                                                                            </span>
                                                                            <span class="review" v-if="p.__meta__">
                                                                                <nuxt-link :to="{name:'single-product-id', params: { id:p.id } }">({{p.__meta__.allreviews_count}} {{(p.__meta__.allreviews_count >0)? 'reviews' : 'review'}})</nuxt-link>
                                                                            </span>
                                                                        </div>
                                                                        <p class="product-price">
                                                                        <template v-if="p.discount>0">
                                                                            <span class="discounted-price">৳ {{p | disountPrice}}</span>
                                                                            <span class="main-price discounted">৳ {{p.sellingPrice}}</span>
                                                                        </template>
                                                                        <template v-else>
                                                                            <span class="discounted-price">৳ {{p.sellingPrice}}</span>
                                                                        </template>
                                                                    </p>
                                                                        <div class="pr_type">
                                                                            <div class="pr_type_main">
                                                                                <p class="pr_type_text"><strong>Category:</strong> {{p.allgroup.groupName}}</p>
                                                                                <p class="pr_type_text"><strong>Subcategory:</strong> {{p.allcategory.catName}}</p>
                                                                                <p class="pr_type_text"><strong>Brand:</strong> {{p.allbrand.name}}</p>
                                                                            </div>

                                                                            <div class="pr_type_main">
                                                                                <p class="pr_type_text" v-if="p.description.material"><strong>Material:</strong> {{p.description.material}}</p>
                                                                                <p class="pr_type_text" v-if="p.description.color"><strong>Colour:</strong> {{p.description.color }}</p>
                                                                                <p class="pr_type_text" v-if="p.description.size"><strong>Size:</strong> {{p.description.size}}</p>
                                                                            </div>
                                                                        </div>
                                                                        <!-- <p class="product-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> -->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Single List Product Start -->

                                                </div>
                                            </div>
                                        </div>

                                        <div v-else-if="isLoading" class="text-center">
                                            <h1  class="_no_pro"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;">Loading Products...</span></h1>
                                        </div>

                                        <div v-else class="_no_data">
                                            <Icon type="md-folder" />
                                            <p>No data found</p>
                                        </div>

                                        <div v-if="loadMoreLoading && !noProductRemaining" class="text-center">
                                          <h1  class="_no_pro"><i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i><span style="margin-left: 10px;">Loading More Products...</span></h1>
                                        </div>
                                        <div v-else-if="noProductRemaining" class="_no_data">
                                            <Icon type="md-folder" />
                                            <p>No More Product Found...</p>
                                        </div>
                                    </div>

                                    <!-- <div class="col page-pagination" v-if="allProducts.total>0">
                                        <Page :current="allProducts.page" :total="allProducts.total" @on-change="getpaginate" :page-size="allProducts.perPage" />
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Shop Section End -->
    </div>

</template>

<script>
    // import { debounce } from 'vue-debounce'
    import {mapGetters} from 'vuex';
    export default {
        data () {
            return {
                isSearch:false,
                isSearchBox:true,
                isFilterOption:true,
                thumbnail:true,
                value2: [20, 50],
                allGroups:[],
                allTags:[],
                allColors:[],
                allBrands:[],
                // isLoading:true,
                loadMoreLoading:false,
                noProductRemaining:false,
                // allProducts:[],
                limit:20,
                tags:[],
                variableOrder:1,
                orders:['id','desc'],
                page:1,
                groupId:'',
                brandId:'',
                colour:'',
                globalStr:'',

                categoryId:'',
                minPrice:'',
                maxPrice:'',
                priceType:0,
                subCateShow:{
                    show:false,
                    index:-1
                }

            }
        },
        computed:{
          ...mapGetters({
            allProducts: 'getAllGlobalProducts',
            isLoading: 'getGlobalProductLoading',
            str: 'getGlobalStr',
          }),
          getSelectedSubCategory(){
            if(this.groupId){
              let index = this.allGroups.findIndex((d)=> d.id == this.groupId);
              if(index == -1) return []
              return this.allGroups[index].category
            }

            return []
          }
        },
        methods:{
            onPriceChange(){
                if(this.priceType == 1){
                  this.minPrice = 0;
                  this.maxPrice = 500
                }
                else if(this.priceType == 2){
                  this.minPrice = 500;
                  this.maxPrice = 1000;
                }
                else if(this.priceType == 3){
                  this.minPrice = 1000;
                  this.maxPrice = 2000;
                }
                else if(this.priceType == 4){
                  this.minPrice = 2000;
                  this.maxPrice = 5000;
                }
                else if(this.priceType == 5){
                  this.minPrice = 5000;
                  this.maxPrice = 10000;
                }
                else if(this.priceType == 6){
                  this.minPrice = 10000;
                  this.maxPrice = 20000;
                }
                 this.filterData();

            },
            sortTag(item,index){
                if(!item.isSelected){
                    item.isSelected = true,
                    this.tags.push(item.id)
                }
                else{
                    item.isSelected = false
                     _.remove(this.tags, function(n) {
                    return n  === item.id;
                    });

                }
                 this.filterData();

            },
            expandAndShowSubCat(item,index){
                if(this.subCateShow.show && this.groupId == item.id){
                    this.subCateShow.show = false
                    this.subCateShow.index = -1
                     this.groupId = ''
                     this.categoryId = ''
                }
                else{
                     this.categoryId = ''
                    this.groupId = item.id
                    this.subCateShow.show = true
                    this.subCateShow.index = index
                }
                this.filterData();


            },
            changeCat(item,index){
                this.categoryId = item.id
                this.filterData();


            },
            async sortData(){
               if(this.variableOrder == 1){ this.orders[0] = 'id'; this.orders[1] = 'desc';}
               if(this.variableOrder == 2){ this.orders[0] = 'productName'; this.orders[1] = 'asc';}
               if(this.variableOrder == 3){ this.orders[0] = 'productName'; this.orders[1] = 'desc';}
               if(this.variableOrder == 4){ this.orders[0] = 'sellingPrice'; this.orders[1] = 'asc';}
               if(this.variableOrder == 5){ this.orders[0] = 'sellingPrice'; this.orders[1] = 'desc';}
                this.filterData();
            },
            async loadMore(more=20){
              console.log("Load more is calling!")
                this.limit = this.limit+more
                this.loadMoreLoading = true;
                const res = await this.callApi('get',`app/shopPageData?from=web&order=${this.orders}&limit=${this.limit}&groupId=${this.groupId}&categoryId=${this.categoryId}&tags=${this.tags}&str=${this.str}&minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&brandId=${this.brandId}&colour=${this.colour}`)
                if(res.status == 200){
                    let prevLength = this.allProducts.length
                    if(this.allProducts.length == res.data.products.length){
                      this.noProductRemaining = true;
                    }
                    for(let i in res.data.products){
                        let d = res.data.products[i]
                        if(d.description){
                            d.description = JSON.parse(d.description)
                        }
                        if(i >= prevLength){
                          this.$store.commit('pushAllGlobalProducts',d)
                          // this.allProducts.push(d)
                        }
                    }
                }
                this.loadMoreLoading = false;
            },
            focasTest(){
                this.isSearch = true

            },
            awaySearch(){
                this.isSearch = false
            },
            async filterData(){
                this.page = 1
                if(this.colour == 'none' || this.colour == null) this.colour = ''
                if(!this.groupId || this.groupId == undefined ) this.groupId = ''
                if(!this.categoryId || this.categoryId == undefined ) this.categoryId = ''
                if(!this.brandId || this.brandId == undefined ) this.brandId = ''
                if(!this.priceType || this.priceType == undefined ) {
                    this.minPrice = '';
                    this.maxPrice = ''
                    this.priceType == ''
                }
                this.$store.commit('setGlobalStr',this.globalStr)
                this.noProductRemaining = false;
                window.history.pushState({}, null, `/shop?order=${this.orders}&page=${this.page}&groupId=${this.groupId}&categoryId=${this.categoryId}&tags=${this.tags}&str=${this.str}&minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&brandId=${this.brandId}&colour=${this.colour}`);
                // this.isLoading = true;
                this.$store.commit('setGlobalProductLoading',true)
                const res = await this.callApi('get',`app/shopPageData?from=web&order=${this.orders}&page=${this.page}&groupId=${this.groupId}&categoryId=${this.categoryId}&tags=${this.tags}&str=${this.str}&minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&brandId=${this.brandId}&colour=${this.colour}`)
                if(res.status == 200){
                    for(let d of res.data.products){
                        if(d.description){
                            d.description = JSON.parse(d.description)
                        }
                    }
                    // this.allProducts = res.data.products
                    this.$store.commit('setAllGlobalProducts', res.data.products)
                }
                // this.isLoading = false;
                this.$store.commit('setGlobalProductLoading',false)
            }
        },
        mounted(){
            //  this.$refs.shopSearch.focus()
            if(window.innerWidth < 767){
                this.isFilterOption = false
                this.isSearchBox = false
            }
            else {
              this.isSearchBox = true
            }

            window.onscroll = () => {
            this.bottomOfWindow =  (window.pageYOffset  + window.innerHeight  ) >(document.body.scrollHeight -100);

            if (this.bottomOfWindow) {
              if(!this.loadMoreLoading){
                  this.loadMore(20)
              }

            }
          };
        },
        async created(){
            if(this.$route.query.str){

              this.$store.commit('setGlobalStr',this.$route.query.str)
              this.globalStr = this.$route.query.str
            }
            // if(this.$route.query.order) this.orders = this.$route.query.order.split(",");
            if(this.$route.query.groupId) this.groupId = parseInt(this.$route.query.groupId)
            if(this.$route.query.brandId) this.brandId = parseInt( this.$route.query.brandId)
            if(this.$route.query.colour) this.colour = this.$route.query.colour
            if(this.$route.query.categoryId) this.categoryId = parseInt(this.$route.query.categoryId)
            // if(this.$route.query.minPrice) this.minPrice = this.$route.query.minPrice
            // if(this.$route.query.maxPrice) this.maxPrice = this.$route.query.maxPrice
            // if(this.$route.query.page) this.page = this.$route.query.page
            window.history.pushState({}, null, `/shop?order=${this.orders}&limit=${this.limit}&groupId=${this.groupId}&categoryId=${this.categoryId}&tags=${this.tags}&str=${this.str}&minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&brandId=${this.brandId}&colour=${this.colour}`);
            const [res,res1,res2,res3,res4] = await Promise.all([
                this.callApi('get','app/allGroups'),
                this.callApi('get',`app/shopPageData?from=web&order=${this.orders}&limit=${this.limit}&groupId=${this.groupId}&categoryId=${this.categoryId}&tags=${this.tags}&str=${this.str}&minPrice=${this.minPrice}&maxPrice=${this.maxPrice}&brandId=${this.brandId}&colour=${this.colour}`),
                this.callApi('get','app/allTags'),
                this.callApi('get','app/allColors'),
                this.callApi('get','app/AllBrands'),
            ])
            if(res.status == 200 && res1.status == 200 && res2.status == 200 && res3.status == 200 && res4.status == 200){
                this.allGroups = res.data.groups
                for(let d of res1.data.products){
                    if(d.description){
                        d.description = JSON.parse(d.description)
                    }
                }
                // this.allProducts = res1.data.products
                this.$store.commit('setAllGlobalProducts', res1.data.products)
                this.allTags = res2.data.tags
                this.allColors = res3.data.colors
                this.allBrands = res4.data.brands
                for(let d of this.allTags){
                    d.isSelected = false
                }
            }
            else{
                this.swr();
            }
            // this.isLoading = false
            this.$store.commit('setGlobalProductLoading',false)
        },
        filters:{
            showResult(item){

                let page  = parseInt(item.page)
                let perPage  = parseInt(item.perPage)

                return ((page*perPage)-8)+'-'+(page * perPage)
            }
        }

    }
</script>

<style  scoped>
.search-item{

}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: .5;
}
</style>

