<template>
    <div>
        <div class="_header">
            <div class="_1menu">
                <div class="container">
                    <div class="_1menu_con">
                        <div class="_1menu_logo">
                            <img class="_1menu_logo_img" src="https://techohut.com/wp-content/uploads/2021/12/TECHOHUT-Logo-3-1.png" alt="" title="">
                        </div>

                        <div class="_1menu_search">
                            <div class="_1menu_search_icon"><Icon type="ios-search" /></div>
                            <input class="" placeholder="What are you looking for...">
                        </div>
                        
                        <div class="_1menu_right">
                            <ul class="_1menu_right_list">
                                <li>
                                    <a href="">
                                        <Icon type="ios-notifications" />
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <Icon type="md-heart" />
                                        <span class="_num">2</span>
                                    </a>
                                </li>
                                <li style="display:none">
                                    <a href="">
                                        <Icon type="md-person" />
                                    </a>
                                </li>
                            </ul>

                            <ul class="_1menu_log_reg">
                                <li>
                                    <nuxt-link class="_1menu_list_text" to="/login">Login</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link class="_1menu_list_text" to="/registration">Signup</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <ul class="_1menu_list">
                        <li>
                            <a href="" class="_1menu_list_text">Home</a>
                        </li>
                        <li>
                            <a href="" class="_1menu_list_text">Man</a>
                        </li>
                        <li>
                            <a href="" class="_1menu_list_text">Woman</a>
                        </li>
                        <li>
                            <a href="" class="_1menu_list_text">Baby Collection</a>
                        </li>
                        <li>
                            <a href="" class="_1menu_list_text">Blog</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <!--Header section start-->
        <div style="display:none" id="top_header" class="_headr_top" :style="{background:topBanner.backgroundColor}" >
            <div class="container">
                <p class="_headr_top_text" :style="{color: topBanner.color}">{{topBanner.header}}</p>
            </div>
        </div>
        <div style="display:none">
            <header class="header headercccccccccccccccccccccccccccccccccccccccccccccc-sticky d-none d-lg-block" >
                <div class="header-top header-transparent">
                    <div class="container">
                        <div class="row align-items-center">
                            <!-- Header Top Social Start -->
                            <div class="col-lg-3">
                                <div class="header-top-social">
                                    <a target="_blank" href="https://www.facebook.com/dreamsgallery"><i class="fa fa-facebook"></i></a>
                                    <a target="_blank" href="https://www.instagram.com/dreamsgallerybd"><i class="fa fa-instagram"></i></a>
                                    <a target="_blank" href="https://www.youtube.com/"><i class="fab fa-youtube"></i></a>
                                    <!-- <a href="#"><i class="fa fa-twitter"></i></a>
                                    <a href="#"><i class="fa fa-instagram"></i></a>
                                    <a href="#"><i class="fa fa-linkedin"></i></a>

                                    <a href="#"><i class="fa fa-rss"></i></a> -->

                                </div>
                            </div>
                            <!-- Header Top Social End -->

                            <!-- Header Logo Start -->
                            <div class="col-lg-6">
                                <div class="header-logo text-center">
                                    <nuxt-link to="/"><img src="/img/mainLogo.svg" alt=""></nuxt-link>
                                </div>
                            </div>
                            <!-- Header Logo Start -->

                            <!-- Header Cart Start -->
                            <div class="col-lg-3 d-flex justify-content-end">
                                <div class="_header_search" v-if="showSearchBar">
                                    <div :class="(isSearch)? '_header_search_main _searchOpen' : '_header_search_main'" class="" @focus="focasTest">
                                        <i class="ion-ios-search-strong"></i>
                                        <input type="text" placeholder="Search for Products, Brands.." v-model="str" @focus="focasTest" v-on-clickaway="awaySearch" v-on:keyup="filterData">
                                    </div>

                                    <div class="_search_drop" v-if="isSearch && str!=='' && allProducts.total>0">
                                        <div class="_search_drop_all">
                                            <p class="_search_drop_title">Products</p>

                                            <div class="_search_drop_main" v-for="(item,index) in allProducts.data" :key="index" @click="OnSearchMenu(item.id)">

                                                <div class="_search_drop_items" @click="$router.push(`/single-product/${item.id}`)">
                                                    <div class="_search_drop_pic">
                                                        <img :src="item.productImage" alt="image" title="">
                                                    </div>

                                                    <div class="_search_drop_details">
                                                        <p class="_search_drop_name _text_overflow">{{item.productName}}</p>
                                                        <p class="_search_drop_status _text_overflow">{{item.allgroup.groupName}} | {{item.allcategory.catName}}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="_search_drop_see_main">
                                            <nuxt-link :to="`/shop?str=${this.str}`">See more</nuxt-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="header-cart" >
                                    <a  @click="$router.push('/cart')" v-if="cartItem.length>0" ><i class="fas fa-shopping-bag"></i><span>{{cartItem.length}}</span></a>

                                    <a v-else ><i class="fas fa-shopping-bag"></i></a>
                                    <!--Mini Cart Dropdown Start-->
                                    <div class="header-cart-dropdown" >
                                        <ul class="cart-items _shopping" v-if="cartItem.length==0">
                                            <li>
                                                <div class="_no_item">
                                                    <i class="fas fa-shopping-bag"></i>
                                                    <p class="_no_item_text">Your Shopping Bag is Empty!</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <template v-else>
                                            <ul class="cart-items" >
                                                <li class="single-cart-item" v-for="(item,index) in cartItem " :key="index" >
                                                    <div class="cart-img">
                                                        <nuxt-link :to="{name:'single-product-id', params: { id:item.mproductId } }"><img :src="item.mproduct.productImage" alt=""></nuxt-link>
                                                    </div>
                                                    <div class="cart-content">
                                                        <h5 class="product-name _pr_nme">
                                                            <nuxt-link :to="{name:'single-product-id', params: { id:item.mproductId } }" >{{item.mproduct.productName}}</nuxt-link>
                                                        </h5>
                                                        <span class="product-quantity">{{item.quantity}} ×</span>
                                                        <span class="product-price">৳ {{(item.quantity * (item.mproduct.sellingPrice-((item.mproduct.sellingPrice*item.mproduct.discount)/100))) | toFixedNum}}</span>
                                                    </div>
                                                    <div class="cart-item-remove">
                                                        <a title="Remove" @click="removeItemServer(item.id,index)"><i class="fa fa-trash"></i></a>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="cart-total">
                                                <h5>Subtotal :<span class="float-right">৳ {{subTotalCost}}</span></h5>
                                            </div>
                                            <div class="cart-btn">
                                                <nuxt-link to="/cart" >View Cart </nuxt-link>
                                                <nuxt-link to="/checkout" >checkout </nuxt-link>
                                            </div>
                                        </template>

                                    </div>
                                    <!--Mini Cart Dropdown End-->
                                </div>
                            </div>
                            <!-- Header Cart End -->

                        </div>

                    </div>
                </div>
                <transition name="slide-fade">
                    <div class="header-bottom menu-right"   :class="(scrollY>270)? 'menu_fixed': ''" v-if="scrollY<250 || scrollY>270">
                        <div class="container">
                            <div class="row align-items-center">
                                <!--Menu start-->
                                <div class="col-lg-12 d-flex justify-content-center">
                                    <div class="header-logo mo_logo">
                                        <!-- <nuxt-link to="/"><img src="/img/mainLogo.svg" class="img-fluid" alt=""></nuxt-link> -->
                                    </div>
                                    <nav class="main-menu">
                                        <ul>
                                            <li><nuxt-link :class="(active_menu == 'index')? 'menu-active':''" to="/">Home</nuxt-link></li>
                                            <li><nuxt-link :class="(active_menu == 'shop')? 'menu-active':''" to="/shop">Shop</nuxt-link></li>
                                            <li><nuxt-link :class="(active_menu == 'about-us')? 'menu-active':''" to="/about-us">About Us</nuxt-link></li>
                                            <li><nuxt-link :class="(active_menu == 'contact')? 'menu-active':''" to="/contact">Contact Us</nuxt-link></li>
                                            <li><nuxt-link class="menu-active" to="/sale">SALE!</nuxt-link></li>

                                        </ul>
                                    </nav>
                                    <div class="_pro_drop">
                                        <template v-if="isLoggedIn" >
                                            <div class="_pro_drop_name" >
                                                <a @click="openMenu" >
                                                <!-- <img src="/uploads/icon-account.svg" alt="" title=""> -->
                                                <i class="fa fa-user"></i>
                                                {{authInfo.name}}</a>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <nav class="main-menu">
                                                <ul>
                                                    <li><nuxt-link to="/login">Sign In</nuxt-link></li>
                                                    <li><nuxt-link to="/registration">Sign Up</nuxt-link></li>
                                                </ul>
                                            </nav>
                                        </template>
                                        <div class="_pro_drop_main" v-if="isMenuShow" ref="menu" v-on-clickaway="awayMenu" :tabindex="menuTabIndex" >
                                            <ul class="_pro_drop_main_list">
                                                <li><i class="far fa-grin"></i><nuxt-link to="/my-account?tab=Dashboard">My Dashboard</nuxt-link></li>
                                                <!-- <li><i class="far fa-grin"></i><a to="/my-account?tab=Dashboard">My Dashboard</a></li> -->
                                                <li><i class="fas fa-box"></i><nuxt-link to="/my-account?tab=Orders">My orders</nuxt-link></li>
                                                <li><i class="far fa-heart"></i><nuxt-link to="/wishlist">My wishlist</nuxt-link></li>
                                                <li><i class="far fa-clock"></i><nuxt-link to="/pre-order">My Pre-order list</nuxt-link></li>
                                                <li @click="logout">
                                                    <i class="fas fa-sign-out-alt"></i>
                                                Sign out
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="activeclass _noti_li"  v-on-clickaway="closeNotiMenu" v-if="isLoggedIn" >
                                            <div class="_1noti" style="cursor:pointer"  @click="openNotiMenu" >
                                                <i class="fas fa-bell" ></i>
                                                <p class="_1noti_num" v-if="notiCount>0">{{notiCount}}</p>
                                            </div>

                                            <div class="_noti _box_shadow" v-if="isNotificationMenu">
                                                <div class="_noti_top">
                                                    <p class="_noti_title">Notifications</p>
                                                    <a  class="_noti_read" @click="updateAllNoti">Mark All as Read</a>
                                                </div>
                                                <div class="_noti_main" >
                                                    <!-- Items -->
                                                    <div class="_noti_items "  v-for="(item,index) in notiDetails" :key="index" v-if="index<6" :class="(item.seen==false)? 'active' : ''">
                                                        <div class="_noti_pic">
                                                            <span class="_noti_img"><i class="fas fa-bell" ></i></span>

                                                            <!-- <img class="_noti_img" src="https://admin.bahrainunique.com//uploads/notification.png" alt="" title=""> -->
                                                        </div>

                                                        <div class="_noti_details" @click="updateNoti(index)">
                                                            <p class="_noti_details_title _text_overflow">{{item.title}}</p>
                                                            <p class="_noti_details_text _text_overflow">{{item.created_at}}</p>
                                                        </div>
                                                        <!-- <div class="_noti_unseen" >
                                                            <i class="fas fa-ellipsis-h"@click="openNotiOptionMenu(index)" ></i>
                                                            <ul class="_noti_unseen_list" v-if="isNotiOptionMenu && isNotiOptionMenuIndex==index" >
                                                                <li  v-if="!item.seen" @click="updateNoti(index)">seen</li>
                                                                <li v-else >seen</li>
                                                                <li @click="deleteNoti(index)">Delete</li>
                                                            </ul>
                                                        </div> -->
                                                    </div>
                                                    <!-- Items -->
                                                </div>

                                                <div class="_noti_see">
                                                    <!-- <router-link to="/order">See more</router-link> -->
                                                    <a class="_noti_see_text" href="/my-account?tab=notification">See more</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--Menu end-->
                            </div>
                        </div>
                    </div>
                </transition>
            </header>
        </div>
        <!--Header section end-->

        <!--Header Mobile section start-->
        <header style="display:none" class="header-mobile d-block d-lg-none">
            <div class="header-bottom menu-right">
                <div class="container">
                    <div class="_mob_menu">
                        <div class="_mob_menu_icon_one">
                            <i @click="mobileOpen = true" class="fas fa-bars"></i>
                        </div>
                        <div class="_mob_menu_input" @click="$router.push('/shop')" v-if="$route.name!='shop' && $route.name!='sale' ">
                            <div class="_mob_menu_input_main" >
                                <i class="ion-ios-search-strong"></i>
                                <input type="text" placeholder="What would you like to buy?"  >
                            </div>
                        </div>
                        <div class="_mob_menu_input" v-else-if="$route.name=='shop' || $route.name=='sale' ">
                            <div class="_mob_menu_input_main" >
                                <i class="ion-ios-search-strong"></i>
                                <input type="text" placeholder="What would you like to buy?" v-model="globalStr" v-debounce:1s="filterData1">
                            </div>
                        </div>
                        <div class="_mob_menu_icon_two">
                            <p class="_mob_menu_noti">
                                <i class="fas fa-bell"></i>
                                <span class="_mob_menu_noti_num">2</span>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col-12">
                            <div class="header-mobile-navigation d-block d-lg-none">
                                <div class="row align-items-center">
                                    <div class="col-auto col-md-auto">
                                        <div class="mobile-navigation text-right">
                                            <div class="header-icon-wrapper">
                                                <ul class="icon-list justify-content-end">
                                                    <li @click="mobileOpen = true">
                                                        <span class="mobile-menu-icon"><i class="fa fa-bars"></i></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-md">
                                        <div class="header-logo dddd">
                                              <nuxt-link to="/"><img src="/img/mainLogo.svg" class="img-fluid" alt=""></nuxt-link>
                                        </div>
                                    </div>
                                    <div class="col-auto col-md-auto">
                                        <div class="mobile-navigation text-right">
                                            <div class="header-icon-wrapper">
                                                <ul class="icon-list justify-content-end">
                                                    <li>
                                                        <div class="header-cart-icon">
                                                             <a @click="$router.push('/cart')" ><i class="fas fa-shopping-bag"></i><span>{{cartItem.length}}</span></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="search_mpb" v-if="isMobileSearchShow">
                                    <div class="_header_search_main _mbl_srch _searchOpen" @focus="focasMobileTest">
                                        <i class="ion-ios-search-strong"></i>
                                        <input type="text" placeholder="Search for Products, Brands.." @focus="focasMobileTest" v-model="str" v-on:keyup="filterData" v-on-clickaway="awayMobileSearch">
                                    </div>
                                    <div class="_search_drop _search_drop_mobile" v-if="isMobileSearch && str!=='' && allProducts.total>0">
                                        <div class="_search_drop_all">
                                            <p class="_search_drop_title">Products</p>

                                            <div class="_search_drop_main" v-for="(item,index) in allProducts.data" :key="index" @click="OnSearchMenu(item.id)">

                                                <div class="_search_drop_items" @click="$router.push(`/single-product/${item.id}`)">
                                                    <div class="_search_drop_pic">
                                                        <img :src="item.productImage" alt="image" title="">
                                                    </div>

                                                    <div class="_search_drop_details">
                                                        <p class="_search_drop_name _text_overflow">{{item.productName}}</p>
                                                        <p class="_search_drop_status _text_overflow">{{item.allgroup.groupName}} | {{item.allcategory.catName}}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="_search_drop_see_main">
                                            <nuxt-link :to="`/shop?str=${this.str}`">See more</nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!--Mobile Menu start-->
                    <div class="row">
                        <div class="col-12 d-flex d-lg-none">
                            <div class="mobile-menu"></div>
                        </div>
                    </div>
                    <!--Mobile Menu end-->

                </div>
            </div>
        </header>
        <!--Header Mobile section end-->

        <!-- Bottom nav -->
        <div class="_bottomNav">
            <div class="_bottomNav_item _active">
               <nuxt-link to="/">
                <i class="fas fa-home"></i>
                <!-- <p class="_bottomNav_title">Home</p> -->
                 </nuxt-link>
            </div>
            <div class="_bottomNav_item">
               <a @click="goToAccount('wishlist')">
                <i class="far fa-heart"></i>
                <!-- <p class="_bottomNav_title">wishList</p> -->
               </a>
            </div>

            <div class="_bottomNav_logo">
                <nuxt-link to="/"><img src="/img/mainLogo.svg" alt="" title=""></nuxt-link>
            </div>

            <div class="_bottomNav_item">
                <a @click="goToAccount('cart')">
                <i class="fas fa-shopping-bag"></i>
                <!-- <p class="_bottomNav_title">Cart</p> -->
              </a>
            </div>
            <div class="_bottomNav_item">
              <a @click="goToAccount('my-account')">
                <i class="fas fa-user-alt"></i>
                <!-- <p class="_bottomNav_title">Account</p> -->
                 </a>
            </div>
        </div>
        <!-- Bottom nav -->

        <!-- Offcanvas Menu Start -->
        <div :class="{'active':mobileOpen} " class="offcanvas-mobile-menu">
            <span @click="mobileOpen = false" class="offcanvas-menu-close">
                <Icon type="md-close" />
            </span>

            <div class="offcanvas-wrapper">

                <div class="offcanvas-inner-content">
                    <!-- <div class="offcanvas-mobile-search-area" >
                        <div class="">
                            <input type="search" v-model="str" placeholder="Search ...">
                            <button type="submit" @click="mobileSearch"><i class="fa fa-search"></i></button>
                        </div>

                        <div class="_search_drop" v-if="isSearch && str!=='' && allProducts.total>0">
                            <div class="_search_drop_all">
                                <p class="_search_drop_title">Products</p>

                                <div class="_search_drop_main" v-for="(item,index) in allProducts.data" :key="index" @click="OnSearchMenu(item.id)">

                                    <div class="_search_drop_items" @click="$router.push(`/single-product/${item.id}`)">
                                        <div class="_search_drop_pic">
                                            <img :src="item.productImage" alt="image" title="">
                                        </div>

                                        <div class="_search_drop_details">
                                            <p class="_search_drop_name _text_overflow">{{item.productName}}</p>
                                            <p class="_search_drop_status _text_overflow">{{item.allgroup.groupName}} | {{item.allcategory.catName}}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="_search_drop_see_main">
                                <nuxt-link :to="`/shop?str=${this.str}`">See more</nuxt-link>
                            </div>
                        </div>
                    </div> -->
                    <nav class="offcanvas-navigation">
                        <ul>
                            <li><nuxt-link to="/">Home</nuxt-link></li>
                            <li><nuxt-link to="/shop">Shop</nuxt-link></li>
                            <!-- <li><nuxt-link to="/bokor">JIN</nuxt-link></li> -->
                            <li><nuxt-link to="/about-us">About Us</nuxt-link></li>
                            <li><nuxt-link to="/contact">Contact Us</nuxt-link></li>
                            <li><nuxt-link  class="menu-active" to="/sale">SALE!</nuxt-link></li>
                        </ul>
                    </nav>
                    <nav class="offcanvas-navigation" v-if="!isLoggedIn">
                        <ul>
                            <li><nuxt-link to="/login">Sign In</nuxt-link></li>
                            <li><nuxt-link to="/registration">Sign Up</nuxt-link></li>
                        </ul>
                    </nav>

                    <div class="offcanvas-settings">
                        <nav class="offcanvas-navigation">
                            <ul>
                                <template v-if="isLoggedIn" >
                                    <div class="_pro_drop_name" >
                                        <a @click="openMenu" >
                                        <i class="fa fa-user"></i>
                                        <!-- <img src="/uploads/icon-account.svg" alt="" title=""> -->
                                        {{authInfo.name}}</a>
                                    </div>
                                </template>
                                <!-- <li class="menu-item-has-children"><a href="#">CURRENCY: USD </a>
                                    <ul class="submenu2">
                                        <li><a href="javascript:void(0)">€ Euro</a></li>
                                        <li><a href="javascript:void(0)">৳  US Dollar</a></li>
                                    </ul>
                                </li> -->

                                <li class="" v-if="isLoggedIn">
                                    <ul class="submenu2">
                                        <li><i class="far fa-grin"></i><nuxt-link to="/my-account">My Dashboard</nuxt-link></li>
                                        <li><i class="fas fa-box"></i><nuxt-link to="/my-account?tab=Orders">My orders</nuxt-link></li>
                                        <li><i class="far fa-heart"></i><nuxt-link to="/wishlist">My wishlist</nuxt-link></li>
                                        <li><i class="far fa-clock"></i><nuxt-link to="/pre-order">My Pre-order list</nuxt-link></li>
                                        <li @click="logout"><i class="fas fa-sign-out-alt"></i>Sign out</li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div class="offcanvas-widget-area">
                        <div class="off-canvas-contact-widget">
                            <div class="header-contact-info">
                                <ul class="header-contact-info-list">
                                    <li><i style="transform: rotate(80deg)" class="fas fa-phone"></i> <a href="tel://12452456012">+09678120120</a></li>
                                    <li><i class="fas fa-envelope"></i> <a href="mailto:info@yourdomain.com">info@dreamgallerybd.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <!--Off Canvas Widget Social Start-->
                        <div class="off-canvas-widget-social">
                            <a target="_blank" href="https://www.facebook.com/dreamsgallery"><i class="fa fa-facebook"></i></a>
                            <a target="_blank" href="https://www.instagram.com/dreamsgallerybd"><i class="fa fa-instagram"></i></a>
                            <a target="_blank" href="https://www.youtube.com/"><i class="fab fa-youtube"></i></a>
                        </div>
                        <!--Off Canvas Widget Social End-->
                    </div>
                </div>
            </div>

        </div>
        <!-- Offcanvas Menu End -->
         <!-- <a v-if="scrollY > 270" id="scrollUp" href="#top" style="position: fixed; z-index: 2147483647; display: block;"><i class="fas fa-angle-up"></i></a> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            isSearch:false,
            isMobileSearch:false,
            isMobileSearchShow:false,
            isSmallMenu:false,
            scrollY:0,
            active_menu:'',
            str:'',
            isMenuShow:false,
            menuTabIndex:-1,
            topBanner:{},
            allProducts:{
                total: 0,
                data:[],
            },
            mobileOpen:false,
            isNotificationMenu:false,
            isNotiOptionMenuIndex:-1,
            isNotiOptionMenu:false,
            notiDetails:[],
            notiCount:0,
            isDashbard:false,
            globalStr:'',
        }
    },
    watch: {
      '$route.name': function(newVal, oldVal) { // watch it
        // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        window.scrollTo(0, 0);
        this.active_menu = newVal;
        this.mobileOpen = false
        this.str = ''
         this.$store.commit("setGlobalStr", '');
         this.$store.commit("setAllGlobalProducts", []);
        this.isMenuShow = false
        if(this.isLoggedIn) this.getNotiCount();
        if(newVal == 'index') this.isMobileSearchShow = true
        else this.isMobileSearchShow = false
        if(newVal == 'shop' || newVal == 'sale' ){
         this.$store.dispatch("setShowSearchBar", false);
        }
        else{
           this.$store.dispatch("setShowSearchBar", true);
        }
        if(newVal == 'my-account'){
         this.isDashbard = true
        }
        else{
            this.isDashbard = false
        }

      }
    },
    methods:{
      goToAccount(page){
        if(this.isLoggedIn){
          this.$router.push('/'+page)
        }
        else {
          this.$router.push('/login?callback=/'+page)
        }
      },
        async filterData1(){
          console.log("header filter sale")
          this.$store.commit('setGlobalStr',this.globalStr)
          this.$store.commit('setGlobalProductLoading',true)
          let  orders = ['id','desc'];
          let apiPostfix = 'shopPageData'
          this.$store.commit('setGlobalStr',this.globalStr)
          if(this.$route.name == 'sale') apiPostfix = 'salePageData'
            const res = await this.callApi('get',`app/${apiPostfix}?from=web&str=${this.globalStr}&order=${orders}`)
            if(res.status == 200){
                for(let d of res.data.products){
                    if(d.description){
                        d.description = JSON.parse(d.description)
                    }
                }
                this.$store.commit('setAllGlobalProducts',res.data.products)
                // this.allProducts = res.data.products
            }
            this.$store.commit('setGlobalProductLoading',false)
        },
        OnSearchMenu(id){
            // this.i('product-'+id)
        },
        async openNotiMenu(){
            // this.isNotificationMenu = true
            if(!this.isNotificationMenu){
                const res = await this.callApi('get','/app/getNotiDetails?limit=10')
                if(res.status == 200){
                    this.notiDetails = res.data.notiDetails
                }
                else{
                    this.swr()
                }
            }
            this.isNotificationMenu = !this.isNotificationMenu

        },
        async updateNoti(index){
            // this.isNotificationMenu = true
            const res = await this.callApi('post','/app/updateNoti',{id:this.notiDetails[index].id})
            if(res.status == 200){
                // this.notiDetails = res.data.data
                this.notiDetails[index].seen = true
                this.notiCount = this.notiCount-1
            }
            else{
                this.swr()
            }

        },
        async updateAllNoti(){
            // this.isNotificationMenu = true
            const res = await this.callApi('post','/app/updateAllNoti')
            if(res.status == 200){
                this.notiDetails = res.data.data
                this.notiCount = 0

            }
            else{
                this.swr()
            }

        },
        async deleteNoti(index){
            // this.isNotificationMenu = true
            const res = await this.callApi('post','/app/deleteNoti',{id:this.notiDetails[index].id})
            if(res.status == 200){

                this.notiDetails = res.data.data
            }
            else{
                this.swr()
            }

        },
        closeNotiMenu(){
            this.isNotificationMenu = false
            this.isNotiOptionMenu= false
        },
        openNotiOptionMenu(index){
            if(!this.isNotiOptionMenu) this.isNotiOptionMenuIndex = index
            this.isNotiOptionMenu = !this.isNotiOptionMenu
        },
        mobileSearch(){
            this.mobileOpen = false
            this.$router.push(`/shop?str=${this.str}`)
        },
        awaySearch(){
            this.isSearch = false
        },
        awayMenu(){
           this.isMenuShow = false
        },
        focasTest(){
            this.isSearch = true

        },
        awayMobileSearch(){
           this.isMobileSearch = false
        },
        focasMobileTest(){
            this.isMobileSearch = true

        },

        openMenu(){
            this.isMenuShow = true
            this.menuTabIndex = 0
            setTimeout(
                () => this.$refs.menu.focus()
            , 100);

        },

        async logout() {
            try {
                this.$store.commit("updateAuthUser", false);
                this.$ls.set('token', '')
                window.location = '/'
            } catch (error) {
                console.log(error);
            }
        },
        async getNotiCount() {
           const res = await this.callApi('get','/app/getNotiCount')
           if(res.status == 200){
               this.notiCount = res.data.notiCount
           }
        },
        handleScroll(e){
            this.scrollY = window.scrollY

		},
        async filterData(){

            const res = await this.callApi('get',`app/shopPageData?from=web&str=${this.str}`)
            if(res.status == 200){
                this.allProducts = res.data.products
            }
        },

    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll);
    },
    async created(){
        this.active_menu = this.$route.name
        if(this.$route.name == 'index') this.isMobileSearchShow = true
        else this.isMobileSearchShow = false


          if(this.$route.name == 'shop' || this.$route.name == 'sale') this.$store.dispatch("setShowSearchBar", false);
          if(this.$route.name == 'my-account') this.isDashbard=true
          const res = await this.callApi('get','/app/topBanner');
          if(res.status == 200){
              this.topBanner = res.data.topBanner
          }
          else{
              this.swr()
          }
         setTimeout(() => {
             if(this.isLoggedIn){ this.getNotiCount();}
         }, 1000);


    }
}
</script>
<style scoped>
.menu-active{
    color: #e33 !important;
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
  transform: translateY(-30px);
  opacity: 0;
}

</style>
