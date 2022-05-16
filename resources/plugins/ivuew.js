// import Vue from 'vue'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// import locale from 'iview/dist/locale/en-US';
import Vue from 'vue';
import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

// Vue.use(ViewUI);
// Vue.use(iView, { locale })

    //import moment from 'moment'
    // Vue.filter('myDate', function(value) {
    //     if (!value) return ''
    //     return value
    //     var offset = new Date().getTimezoneOffset();
    //     //console.log('offset', offset)
    //     let o = Math.abs(offset)
    //     var testDateUtc = moment.utc(value);
    //     var localDate = moment(testDateUtc).utcOffset(o);
    //     return moment(localDate).fromNow()
    //     // return localDate.format("YYYY-MM-DD hh:mm:ss")
    // });

Vue.mixin({
    methods: {
        i(msg,i='Hey!') {
            this.$Message.info({
                // title: i,
                content:  msg,
                closable: true
            });
        },
        s(msg,i='Great!') {
            this.$Message.success({
                // title: i,
                content:  msg,
                closable: true
            });
        },
        w(msg,i='Warning!') {
            this.$Message.warning({
                // title: i,
                content:  msg,
                closable: true
            });
        },
        e(msg,i='Oops!') {
            this.$Message.error({
                // title: i,
                content:  msg,
                closable: true,
               
            });
        },
        swr() {
            this.$Message.error({
                // title: 'Oops',
                content: 'Something went wrong, please try again later',
                closable: true,
            });
        },
    },
    created(){
        
    }
})