'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')


// Landing Page Routes
Route.get('app/getBestGroupWithProduct', 'HomeController.bestGroupWithProducts')
Route.get('app/landingPageSetting', 'HomeController.landingPageSetting')
Route.get('app/bestProducts', 'HomeController.bestProducts')
Route.get('app/featuredProducts', 'HomeController.featuredProducts')
Route.get('app/newProducts', 'HomeController.newProducts')
Route.get('app/allSliders', 'HomeController.allSliders')
Route.get('app/topBanner', 'HomeController.topBanner')
Route.get('app/openingtime', 'HomeController.openingtime')
Route.get('app/teams', 'HomeController.showTeams')
Route.get('app/restaurants', 'HomeController.showRestaurants')

// Shop Page Routes
Route.get('app/allGroups', 'ShopController.allGroups')
Route.get('app/shopPageData', 'ShopController.shopPageData')
Route.get('app/appShopPageData', 'ShopController.appShopPageData')
Route.get('app/allTags', 'ShopController.allTags')
Route.get('app/allColors', 'ShopController.allColors')
Route.get('app/AllBrands', 'ShopController.AllBrands')

// Sale Page Routes
Route.get('app/salePageData', 'ShopController.salePageData')
Route.get('app/appSalePageData', 'ShopController.appSalePageData')


// Cart Routes
Route.get('app/cart','CartController.showCarts');
Route.post('app/cart','CartController.storeCart');
Route.post('app/cart_update','CartController.updateCart');
Route.post('app/cart_delete','CartController.deleteCart');


Route.get('checkStock','OrderController.checkStock');
Route.post('app/checkCoupon','OrderController.checkCoupon');
Route.post('app/checkReferralCode','OrderController.checkReferralCode');
Route.post('app/checkGiftVoucherCode','OrderController.checkGiftVoucherCode');
Route.get('app/zones','OrderController.showZones');


// Authentication Routes
Route.post('app/registration','UserController.register').validator('StoreUser'); 
Route.post('app/login','UserController.login');
Route.post('app/user/edit','UserController.updateUser');
Route.post('app/activeAccount','UserController.activeAccount');
Route.post('app/sendActivationCode','UserController.sendActivationCode');
Route.get('app/getOutstandingCustomer','UserController.getOutstandingCustomer');
Route.get('app/getCustomer','UserController.getCustomer');
Route.get('app/storeCustomer','UserController.storeCustomer');

// Order Routes
Route.get('app/order','OrderController.showOrder');
Route.post('app/order','OrderController.storeOrder');
Route.post('app/appOrder','OrderController.storeAppOrder');
Route.post('app/updateSSL','OrderController.updateSSL');
Route.post('app/cancelOrder','OrderController.cancelOrder');
Route.post('app/payNow','OrderController.payNow');
Route.post('app/clearPayment','OrderController.clearPayment');
Route.get('app/clearPayment','OrderController.clearPayment');
Route.get('app/SSL_TEST/:id','OrderController.test_clearPayment');
Route.get('app/test/test','OrderController.test');
Route.get('app/test/bkash_test','OrderController.bkash_test');
Route.get('app/bkash/payment_exceute/:id','OrderController.bkash_execute');
Route.get('app/bkash/agrement_exceute/:id','OrderController.bkash_agreement_execute');
Route.get('app/bkash/callback','OrderController.bkashCallback');

// Sale Routes
Route.get('app/saleOrder','OrderController.datefixed');

// Wishlist Routes
Route.get('app/wishlist','UserController.showWishList');
Route.post('app/wishlist','UserController.storeWishList');
Route.post('app/updateWishlist','UserController.updateWishlist'); 
Route.post('app/deleteWishlist','UserController.deleteWishlist');
// Pre-Order Routes
Route.get('app/pre-order','UserController.showPreOrder');
Route.post('app/pre-order','UserController.storePreOrder');
Route.post('app/updatePre-order','UserController.updatePreOrder');
Route.post('app/deletePre-order','UserController.deletePreOrder');

// Single Page Route

Route.get('app/getProductVariable/:id','HomeController.getProductVariable');
Route.get('app/getSingleproduct/:id','HomeController.getSingleproduct');
Route.get('app/relatedProduct/:id','HomeController.relatedProduct');
Route.post('app/getVariableProduct','HomeController.getVariableProduct'); 


// Review Product
Route.get('app/reviews/:id','HomeController.showReviews');
Route.post('app/reviews','HomeController.storeReview');
// contact us
Route.post('app/contactus','UserController.storeContactus');

// Upload Photos
Route.post('/app/upload-review-file', 'HomeController.uploadReviewFile')


// Password Reset
Route.post('app/sendResetMessage','UserController.sendResetMessage');
Route.post('app/getResetMessage','UserController.getResetMessage');
Route.post('app/reset-password','UserController.resetPassword');



// Notification

Route.get('app/getNotiCount','UserController.getNotiCount');
Route.get('app/testApi','HomeController.testApi');
Route.get('app/getNotiDetails','UserController.getNotiDetails');
Route.post('app/updateNoti','UserController.updateNoti');
Route.post('app/updateAllNoti','UserController.updateAllNoti');
Route.post('app/deleteNoti','UserController.deleteNoti');


// other Routes
Route.get('app/faq','HomeController.getAllFaq');
Route.post('app/reports','HomeController.storeReports');
Route.get('app/reports','HomeController.getAllReports');
Route.get('app/settings','HomeController.getSettings');

Route.get('app/new_test_created_at','HomeController.new_test_created_at');


Route.get('app/user/balance/details','UserController.userBalanceDetails');



Route.get('app/initdata', 'UserController.initdata')
Route.any('*', 'NuxtController.render')

