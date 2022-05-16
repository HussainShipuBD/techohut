export const strict = false
import cookie from 'cookie'
export const state = () => ({
  authInfo: false,
  callCartOb:null,
  cart: [],
  order:{
    billingCity:'',
    shippingPrice:0,
    coupon:'',
    discountType:'',
    discount:0,
    postCode:'',
    referralCode:'',
    giftVoucherCode:'',
    giftVoucherAmount:0,
    isDGMoney:0,
    dgAmount:0,
    roundAmount:0,
    refferalDiscount:0,
    membershipDiscount:0,
    promoDiscount:0,
    refferalDiscountAmount:0,
    membershipDiscountAmount:0,
    promoDiscountAmount:0,

    totalSellingPrice:0,
    subTotal:0,
    grandTotal:0,
    billingAddress:'',
    paymentType:'',
    name:'',
    contact:'',



  },
  token: '',
  quickItem: {},
  allGlobalProducts:[],
  globalProductLoading:true,
  globalStr:'',

  invoiceItem: {},
  invoiceModal:false,
  trackModal:false,
  showSearchBar:true,
  showQuickItem:false,

})

export const getters = {
  getIsLoggedIn (state) {
    return !!state.authInfo
  },
  getAuthInfo (state) {
    return state.authInfo
  },
  order (state) {
    return state.order;
  },
  getCartItem (state) {
    return state.cart
  },
  getToken (state) {
    return state.token
  },
  getShowSearchBar (state) {
    return state.showSearchBar
  },
  getQuickItem (state) {
    return state.quickItem
  },
  getInvoiceItem (state) {
    return state.invoiceItem
  },
  getInvoiceModal (state) {
    return state.invoiceModal
  },
  getTrackModal (state) {
    return state.trackModal
  },
  getShowQuickItem (state) {
    return state.showQuickItem
  },
  getCallCartOb (state) {
    return state.callCartOb
  },
  getAllGlobalProducts (state) {
    return state.allGlobalProducts
  },
  getGlobalProductLoading (state) {
    return state.globalProductLoading
  },
  getGlobalStr (state) {
    return state.globalStr
  },


}

export const mutations = {
  setAuthInfo (state, data) {
    state.authInfo = data
  },
  order (state, data) {
    state.order = data
  },
  setShowSearchBar (state, data) {
    state.showSearchBar = data
  },
  setShowQuickItem (state, data) {
    state.showQuickItem = data
  },
  setToken (state, data) {
    state.token = data
  },
  setInvoiceModal(state, data) {
    state.invoiceModal= data
  },
  setInvoiceItem (state, data) {
    state.invoiceItem = data
  },
  setTrackModal (state, data) {
    state.trackModal = data
  },
  setQuickItem (state, data) {
    state.quickItem = data
  },
  setCallCartOb (state, data) {
    state.callCartOb = data
  },
  setAllGlobalProducts (state, data) {
    state.allGlobalProducts = data
  },
  pushAllGlobalProducts (state, data) {
    state.allGlobalProducts.push(data)
  },
  setGlobalProductLoading (state, data) {
    state.globalProductLoading = data
  },
  setGlobalStr (state, data) {
    state.globalStr = data
  },

  updateCart (state, data) {
    state.cart = data
  },
  removeAll (state, data) {
    state.cart=[]
  },
  removeItem (state, i) {
    state.cart.splice(i,1)
  },

}

export const actions = {

  async nuxtServerInit({ commit, state }, { $axios, req, env }) {
    // const session = req.headers.cookie ? cookie.parse(req.headers.cookie) : ''
    // console.log("NuxtServerInt")

    // $axios.setToken(session.token, 'Bearer');
    // const res  = await $axios.get('/app/initdata')
    // if(res.data.success == true){
    //   console.log("User Logged In !")
    // }
    // else {
    //   console.log("User Null !")
    // }

    // commit('setAuthInfo', res.data.user)

  },
  setInvoiceItem ({ commit }, data) {
    commit('setInvoiceItem', data)
  },
  setTrackModal ({ commit }, data) {
    commit('setTrackModal', data)
  },
  setInvoiceModal ({ commit }, data) {
    commit('setInvoiceModal', data)
  },
  setShowQuickItem ({ commit }, data) {
    commit('setShowQuickItem', data)
  },
  setShowSearchBar ({ commit }, data) {
    commit('setShowSearchBar', data)
  },
  setQuickItem ({ commit }, data) {
    commit('setQuickItem', data)
  },
  setToken ({ commit }, data) {
    commit('setToken', data)
  },
  setAuthInfo ({ commit }, data) {
    commit('setAuthInfo', data)
  },
  updateCart ({ commit }, data) {
    commit('updateCart', data)
  },
  removeAll ({ commit }, data) {
    commit('removeAll', data)
  },
  removeItem ({ commit }, data) {
    commit('removeItem', data)
  }
}
