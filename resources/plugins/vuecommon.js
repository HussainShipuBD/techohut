import Vue from 'vue';
import {mapGetters} from 'vuex';
import _ from 'lodash';
import { directive as onClickaway } from 'vue-clickaway';
import ImageMagnifier from 'vue-image-magnifier';
Vue.use(ImageMagnifier);
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import VueLocalStorage from 'vue-localstorage';

// import ProductZoomer from 'vue-product-zoomer'
// Vue.use(ProductZoomer)

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})
Vue.mixin({
    directives: {
        onClickaway: onClickaway,
    },
    methods: {
      getCookie(key) {
          return cookies.get(key)
        },

        deleteCookie(key, option = {}) {
          return cookies.remove(key, option)
        },
        setCookie(key, value, option = {
          path: '/',
          maxAge: 2592000,
          sameSite: 'strict',
          // httpOnly: true,
          secure: false
        }) {
          return cookies.set(key, value, option)
        },
      // async callApi (method, url, dataObj) {
      //   const token = this.getCookie('token')
      //   try {
      //       let data = await this.$axios({
      //       method: method,
      //       headers: {'Authorization': "bearer " + token},
      //       url: url,
      //       data: dataObj
      //       })
      //       return data
      //   } catch (e) {
      //       return e.response
      //   }
      // },
      async callApi (method, url, dataObj) {
        try {
          let data = await this.$axios({
            method: method,
            headers: {'Authorization': "bearer " + this.token},
            url: url,
            data: dataObj
          })
          return data
        } catch (e) {
          return e.response
        }
      },
    async storeWishList(item,index=0){
        if(!this.isLoggedIn){
             this.i("Please Login first !")
            return this.$router.push('/login')
        }
        let ob = {
            id:item.id
        };
        const res = await this.callApi('post','/app/wishlist',ob);
        if(res.status == 200){
            this.s("Added to wishlist !");
        }
    },
    async addToPreOrder(item,quantity=0){
        if(!this.isLoggedIn){
             this.i("Please Login first !")
            return this.$router.push('/login')
        }
        let ob = {
            id:item.id,
            quantity:quantity
        };
        const res = await this.callApi('post','/app/pre-order',ob);
        if(res.status == 200){
            this.s("Added to Pre-order List ! Please wait for admin Confirmation!");
        }
    },
    async showQuickItemOn(item){
        console.log('item.description')
        console.log(typeof(item.description))
        if(item.description !=null && typeof(item.description) != "object" ){
            item.description = JSON.parse(item.description);
        }
        // let obb = {
        //     created_at:"2020-12-05 14:02:37",
        //     id:44,
        //     productId:30,
        //     updated_at:"2020-12-05 14:02:37",
        //     url:item.productImage
        // }
        // item.allImages.unshift(obb);
        // console.log("all images");
        // console.log(item.allImages);
        this.$store.dispatch('setShowQuickItem',true);
        this.$store.dispatch('setQuickItem',item);

    },
    async showQuickItemOnFromShop(item){
        // let obb = {
        //     created_at:"2020-12-05 14:02:37",
        //     id:44,
        //     productId:30,
        //     updated_at:"2020-12-05 14:02:37",
        //     url:item.productImage
        // }
        // item.allImages.unshift(obb);
        // console.log("all images");
        // console.log(item.allImages);
        this.$store.dispatch('setShowQuickItem',true);
        this.$store.dispatch('setQuickItem',item);

    },
    showQuickItemOff(){
        this.$store.dispatch('setShowQuickItem',false);
        this.$store.dispatch('setQuickItem',{});

    },
    removeItem(id, i){
        this.$store.commit('removeItem', i)
        var cartData = this.$ls.get('myCart')
        cartData = JSON.parse(cartData)
        cartData.splice(i,1)
        this.$ls.set('myCart', JSON.stringify(cartData))
        this.$store.commit('updateCart', cartData)
        this.s('Item removed from cart')
    },
    //  Removing all items from cart
    removeAll(){
        this.$ls.set('myCart', [])
        this.$store.commit('removeAll',[])
    },
    // Add item to cart
    async addToCart(p,qu=1){
        console.log('Quantity',qu);
        console.log('product',p);
        p.quantity=qu;
        // GET THE ITEM FIRST IF THERE ARE ANY
        var oldCartData = this.$ls.get('myCart');
        // console.log('common addToCart')
        // console.log(p)
        if(!oldCartData){
            this.$ls.set('myCart', JSON.stringify([p]));
            this.$store.commit('updateCart', [p]);
            // this.s('Položka byla úspěšně přidána')
            this.s('Item added to cart.');
            return true;
        }else{
            // item is already push
            var storedData= JSON.parse(oldCartData);
            for(let i in storedData){
                if(storedData[i].id===p.id){
                    let tq = parseInt(storedData[i].quantity) + parseInt(qu) ;
                    if(p.stock< tq) {

                        this.i('Product Out of Stock!!');
                        return false;
                    }
                    // const res = await this.callApi('get',`checkStock?id=${storedData[i].id}&stock=${storedData[i].quantity}`)
                    // if(res.status !== 202){
                    //     return this.i('Out of Stock!!')
                    // }
                    storedData[i].quantity = tq;
                    this.$ls.set('myCart', JSON.stringify(storedData));
                    this.$store.commit('updateCart', storedData);
                    this.s('Product Quantity increased  in cart ');
                    return true;
                }
            }
            storedData.push(p);
            // assign the new data
            this.$ls.set('myCart', JSON.stringify(storedData))
            this.$store.commit('updateCart', storedData)
            this.s('Item added to cart');
            return true;
        }
    },


    addItemNQuantityToCart(p, quantity){
        p.quantity=quantity
        // GET THE ITEM FIRST IF THERE ARE ANY
        var oldCartData = this.$ls.get('myCart')
        // console.log('common addToCart')
        // console.log(p)
        if(!oldCartData){
            this.$ls.set('myCart', JSON.stringify([p]))
            this.$store.commit('updateCart', [p])
            // this.s('Položka byla úspěšně přidána')
            this.s('Item added to cart')
        }else{
            // item is already push
            var storedData= JSON.parse(oldCartData)
            for(let i in storedData){
                if(storedData[i].id===p.id){
                    // p.quantity++
                    storedData[i].quantity+= quantity
                    this.$ls.set('myCart', JSON.stringify(storedData))
                    this.$store.commit('updateCart', storedData)
                    return this.s('Item added to cart')
                // return this.i('Položka je již přidána v košíku :) ')
                }
            }
            // console.log('p')
            // console.log(p)
            storedData.push(p)
            // assign the new data
            this.$ls.set('myCart', JSON.stringify(storedData))
            this.$store.commit('updateCart', storedData)
            // this.s('Položka byla úspěšně přidána')
            this.s('Item added to cart')
        }
    },
    async addQuantity(p,index,qu = 1){

        var oldCartData = this.$ls.get('myCart')
        var storedData= JSON.parse(oldCartData)
        storedData[index].quantity = qu
        console.log('storedData[index]')
        console.log(storedData[index])
        if(storedData[index].stock < storedData[index].quantity){
            return this.i('Out of Stock!!')
        }
        this.$ls.set('myCart', JSON.stringify(storedData))
        this.$store.dispatch('updateCart', storedData)
        return
    },
    removeQuantity(p,index){
        // GET THE ITEM FIRST IF THERE ARE ANY
        var oldCartData = this.$ls.get('myCart')
        var storedData= JSON.parse(oldCartData)

        if (storedData[index].quantity<2) {
            return
        }
        storedData[index].quantity--
        this.$ls.set('myCart', JSON.stringify(storedData))
        this.$store.dispatch('updateCart', storedData)
        return
    },
    increaseQuantity(item,index){

        var oldCartData = this.$ls.get('myCart')
        var storedData= JSON.parse(oldCartData)
        storedData[index].quantity++
        if(storedData[index].stock < storedData[index].quantity){
            item.quantity = storedData[index].stock
            return this.i('Out of Stock!!')
        }
        this.$ls.set('myCart', JSON.stringify(storedData))
        this.$store.dispatch('updateCart', storedData)
        return
    },
    decreaseQuantity(item,index){
        if(item.quantity - 1 == 0) return
        var oldCartData = this.$ls.get('myCart')
        var storedData= JSON.parse(oldCartData)
        storedData[index].quantity--
        if(storedData[index].stock < storedData[index].quantity){
            item.quantity = storedData[index].stock
            return this.i('Out of Stock!!')
        }
        this.$ls.set('myCart', JSON.stringify(storedData))
        this.$store.dispatch('updateCart', storedData)
        return
    },
    getCartItems(){
        var cartData = this.$ls.get('myCart')
        // console.log(cartData)
        if (!cartData) {
            return
        }
        let allCartData = JSON.parse(cartData)
        this.$store.dispatch('updateCart', allCartData)
    },


      // Cart to Server
    increaseQuantityServer(item,index){
        let newQuantity = item.quantity + 1
        if(newQuantity > item.vproduct.stock ) return this.i("Product out of stock!")
        item.quantity = newQuantity;
        this.changeCartQuantityServer(item,index)
    },
    decreaseQuantityServer(item,index){
        let newQuantity = item.quantity -1
        if(newQuantity <= 0) return
        item.quantity = newQuantity;
        this.changeCartQuantityServer(item,index)
    },
    async changeCartQuantityServer(item,index){
        if(this.quantityLoading) return
        this.quantityLoading = true;
        const res = await this.callApi('post','app/cart_update',item)
        if(res.status == 200){
          let cartItem = this.cartItem
          cartItem[index] = res.data.product
          this.$store.dispatch('updateCart', cartItem)
          this.$set(this.cartItem,index,item)
          // this.cartItem[index].quantity = item.quantity
        }
        else{
          this.swr();
        }
        this.quantityLoading = false;
      },
    async getCartItemsServer(){
      const res = await this.callApi('get','/app/cart')
      if(res.status == 200){
        this.$store.dispatch('updateCart', res.data.allCarts)

      }
      else {
        this.swr();
      }
    },
  async addToCartServer(p,qu=1){
      console.log('Quantity',qu);
      console.log('product',p.productName);

      if(!this.isLoggedIn){
        p.quantity=qu;
          this.$store.commit('setCallCartOb',p)
          console.log(p)
          this.i("Please login to cart the product!")
          // this.showQuickItemOffFooter();
          this.$router.push('/login?callback=/single-product/'+p.mproductId)
          return
      }
      if(qu > p.stock){
        return this.i("Product Stock Out!")
      }
      let cartItem = this.cartItem
      for(let i in cartItem){
        if(cartItem[i].productId===p.id){
            let tq = parseInt(cartItem[i].quantity) + parseInt(qu) ;
            if(p.stock< tq) {

                this.i('Product Out of Stock!!');
                return false;
            }
        }
      }
      p.quantity=qu;

      const res = await this.callApi("post",'/app/cart',p)
      if(res.status == 200){
        this.$store.commit('updateCart', res.data.allCarts);
        if(res.data.isNew) this.s('Item added to cart.');
        else this.s('Product Quantity increased  in cart ');
      }
      else if (res.status == 401){
        this.e(res.data.message)
      }
      else {
        this.swr();
      }


      return true;

  },
  async removeItemServer(id,index){
    const res = await this.callApi('post','app/cart_delete',{id:id})
    if(res.status == 200){
      let cartItem = this.cartItem
      cartItem.splice(index,1);
      this.$store.dispatch('updateCart', cartItem)

    }
    else {
      this.swr();
    }
  }
  },
  filters:{
    toFixedNum(num){

            return Math.floor(num)
    },
    fixedPaymentType(value){
            if(value == 'sslcommerz') return "SSL Commerz Secure Payment";
            else return value;
    },
    disountPrice(item){
        let price = parseInt(item.sellingPrice)
        price = price - ((parseInt(item.discount)*price)/100)
        // return Math.floor(price)
        return Math.floor(price)
    },
    dateFixed(cd){
        let d = new Date(cd);
        let monthNumber = d.getMonth()+1
        monthNumber = ("0" + monthNumber).slice(-2);
        let dayNumber = d.getDate()
        dayNumber = ("0" + dayNumber).slice(-2);
        let today = `${dayNumber}-${monthNumber}-${d.getFullYear()}`
        return today
    }

  },

  computed: {
    ...mapGetters({
      authInfo: 'getAuthInfo',
      isLoggedIn: 'getIsLoggedIn',
      cartItem:'getCartItem',
      token:'getToken',
      showSearchBar:'getShowSearchBar',
      quickItem:'getQuickItem',
      showQuickItemTemp:'getShowQuickItem',
      invoiceModal:'getInvoiceModal',
      trackModal:'getTrackModal',
      invoiceItem:'getInvoiceItem',
      callCartOb:'getCallCartOb',
      order: 'order',
    }),
    showQuickItem: {
        get(){
          return this.showQuickItemTemp
        },
        set(newName){
          return newName
        }
     },
    subTotalCost(){
        let cost = 0;
        for(let d of this.cartItem){
            let price  = 0
            let pp = parseInt(d.mproduct.sellingPrice)
            if(d.mproduct.discount >0){

                let p = pp - parseInt(((d.mproduct.discount)*pp)/100)
                price = p*d.quantity
            }
            else price = pp*d.quantity
            //let price = d.sellingPrice*d.quantity
            cost = cost + price
        }

        return Math.floor(cost)
    },
    subTotalCost(){
        let cost = 0;
        for(let d of this.cartItem){
            let price  = 0
            let pp = (d.mproduct.sellingPrice)
            if(d.mproduct.discount >0){

                let p = pp - (((d.mproduct.discount)*pp)/100)
                price = p*d.quantity
            }
            else price = pp*d.quantity
            //let price = d.sellingPrice*d.quantity
            price = Math.floor(price)
            cost =  cost + price
        }

        return  Math.floor(cost)
    },
    totalSellingPrice(){
        let cost = 0;
        for(let d of this.cartItem){
            let price  = 0
            let pp = parseInt(d.mproduct.sellingPrice)
            price = pp*d.quantity
            //let price = d.sellingPrice*d.quantity
            cost = cost + price
        }

        return  Math.floor(cost)
    },

  }
})
