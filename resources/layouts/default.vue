<template>
    <div id="app">
      <div class="_layout">
          <!--========= HEADER ==========-->
          <myheader/>
          <transition name="component-fade" mode="out-in">
              <nuxt />
          </transition>
          <myfooter v-if="$route.name !='shop' && $route.name !='sale'" />
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZLLMPH" height="0" width="0" style="display:none;visibility:hidden"></iframe>
      </div>
    </div>
</template>
<script>
import myfooter from '~/components/footer.vue'
import myheader from '~/components/header.vue'
export default {
  components: {
    myheader,
    myfooter
  },
  data(){
    return {

    }
  },
  head: {
    script: [
      // { src: '/assets/js/vendor/modernizr-2.8.3.min.js', body:true  },
      // { src: 'https://code.jquery.com/jquery-1.12.4.min.js', body:true  },
      // { src: '/assets/js/popper.min.js',body:true },
      // { src: '/assets/js/bootstrap.min.js',body:true },
      // { src: '/assets/js/plugins.js',body:true },
      // { src: '/assets/js/main.js',body:true },
    ]
  },
    // watch: {
    //   '$route.name': function(newVal, oldVal) { // watch it
    //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    //      if(newVal == 'shop'){
    //      this.$store.dispatch("setShowSearchBar", false);
    //     }
    //     else{
    //        this.$store.dispatch("setShowSearchBar", true);
    //     }

    //   }
    // },
  methods:{
    async logout() {
      try {
          let { data } = await this.$axios.get("/logout");
          this.$store.commit("updateAuthUser", false);
          window.location = '/login'
      } catch (error) {
          console.log(error);
      }
    },
  },
  async mounted(){

      setTimeout(() => {
        if(this.authInfo) this.getCartItemsServer()
      }, 1000);



  },
  async created(){
    // Get Token from LocalStrorage
      var token = this.$ls.get('token')
      this.$store.commit('setToken', token)
      const res =await this.callApi('get','/app/initdata')
      if(res.status == 200){
        this.$store.commit('setAuthInfo', res.data.user)
        if(res.data.user){

          if(this.$route.name == 'login' || this.$route.name == 'registration') this.$router.push('/')
        }
      }

  }
}
</script>

<style >
    @media print {
        body * {

            visibility: hidden;
        }
        .print, .print * {
            visibility: visible;
        }
        .print {
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>
