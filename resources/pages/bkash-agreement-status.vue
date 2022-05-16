<template>
    <div class="_1thanks_main">
        <template v-if="$route.query.status == 'success'">
            <p class="_1thanks_main_icon"><Icon type="ios-checkmark-circle" /></p>
            <h1 class="_1thanks_pay">Agreement Creation Successful!</h1>
        </template>
        <template v-else-if="$route.query.status == 'failure'">
            <p class="_1thanks_main_icon" style="color: #ee3022;"><Icon type="ios-close-circle" /></p> 
            <h1 class="_1thanks_pay" >Agreement Creation Failed!</h1>
        </template>
        <template v-else-if="$route.query.status == 'cancel'">
            <p class="_1thanks_main_icon" style="color: #ee3022;"><Icon type="ios-close-circle" /></p> 
            <h1 class="_1thanks_pay" >Agreement Creation Cancelled!</h1>
        </template>
        
        
        <h1 class="_1thanks_your">Your order No - PXX957</h1>
        <p class="_1thanks_if">if you have any questions or concerns regarding this, do not hesitate to contact us at
            <br/> 09678120120</p>
        <p class="_1thanks_con"> <nuxt-link to="/">Continue Shopping....</nuxt-link> </p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // bKash_status:'success'
        }
    },
    // async asyncData({app,redirect,query}){
    //     try {
    //         if(query.status == 'success'){

    //             let res = await app.$axios.get(`app/bkash/payment_exceute/${query.paymentID}`)
    //         }
    //         return {
    //             // success_status:res.data.success,
    //             // bKash_status:query.status
    //         }

    //     } catch (error) {
    //         // redirect(`/`)
    //         console.log('async-error')
    //         console.log(error)
    //     }

    // },
    async mounted(){
        const res = await this.callApi('get',`app/bkash/agrement_exceute/${this.$route.query.paymentID}`)
        if(res.status == 200){
            window.location = res.data.data.bkashURL
        }
        else {
            this.swr();
            // this.$router.push('/')
        }
       
    }

}
</script>