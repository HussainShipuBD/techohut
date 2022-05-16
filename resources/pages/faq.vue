

<template>

    <div id="main-wrapper">

      

      

       

        <!-- Faq Section Start -->
        <div class="faq-section section pt-100 pt-lg-80 pt-md-70 pt-sm-60 pt-xs-50 ">
            <div class="container sb-border pb-90 pb-lg-70 pb-md-60 pb-sm-50 pb-xs-40">
                <div class="row">
                    <div class="col-md-12">
                        <div class="faq-content">
                            <div class="faq-desc">
                                <h3>Frequently Asked Questions (FAQs)</h3>
                                <p>The purpose of FAQ section is generally to provide information on frequent questions or concerns of our clients about our products and other related items and you may find answers for yourself. It can help you to learn more about our tools.</p>
                            </div>
                        </div>
                        <!--FAQ Accordin Start-->
                        <div class="faq-accordion">
                            <div id="accordion">
                              <div class="card " v-for="(item,index) in data.data" :key="index" :class="activeColoum==index? 'actives' : ''">
                                <div class="card-header " :id="`heading${index}`" @click="onClickIndexChange(index)">
                                  <h5 class="mb-0">
                                    <a :class="activeColoum !=index? 'collapsed' : ''" data-toggle="collapse" :data-target="`#collapse${index}`" :aria-expanded="(activeColoum == index ? false : true)" aria-controls="collapseOne">
                                      {{item.question}}
                                    </a>
                                  </h5>
                                </div>
                                <transition name="slide-fade">
                                  <div v-if="activeColoum ==index" :id="`collapse${index}`" class="collapse " :class="activeColoum==index? 'trans show' : ''" :aria-labelledby="`heading${index}`" data-parent="#accordion" >
                                  <!-- <div :id="`collapse${index}`" class="collapse" :aria-labelledby="`heading${index}`" data-parent="#accordion"> -->
                                    <div class="card-body">
                                      {{item.answer}}
                                    </div>
                                  </div>
                                </transition>
                              </div>
                              <!-- <div class="card">
                                <div class="card-header" id="headingTwo">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      Donec mattis finibus elit ut tristique?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingThree">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                      Vestibulum a lorem placerat, porttitor urna vel?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingFour">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                      Aenean elit orci, efficitur quis nisl at, accumsan?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingFive">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                      Pellentesque habitant morbi tristique senectus et netus?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingSix">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                      Nam pellentesque aliquam metus?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingSeven">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                      Aenean elit orci, efficitur quis nisl at?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingEight">
                                  <h5 class="mb-0">
                                    <a class="collapsed" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                      Morbi gravida, nisi id fringilla ultricies, elit lorem?
                                    </a>
                                  </h5>
                                </div>
                                <div id="collapseEight" class="collapse" aria-labelledby="headingEight" data-parent="#accordion">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div> -->
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <Page :current="data.page" :total="data.total" @on-change="getFaqs" :page-size="parseInt(data.perPage)" />
                        </div>
                        <!--FAQ Accordin Start-->
                    </div>
                </div>
            </div>
        </div>
        <!-- Faq Section End --> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            data:{
                lastPage: 1,
                page: 1,
                perPage: 5,
                total: 0,
                data:[]
            },
            activeColoum:-1,
        }
    },
    methods:{
         async getFaqs(page){
            // this.isNotificationMenu = true
            const res = await this.callApi('get',`/app/faq?page=${page}`)
            if(res.status == 200){
               this.data = res.data.data
            }
            else{
                this.swr()
            }
            
        },
        onClickIndexChange(index){
          if(this.activeColoum == index) this.activeColoum = -1
          else this.activeColoum = index
        }
    },
    async created(){
        const res = await this.callApi('get','/app/faq')
            if(res.status == 200){
                this.data = res.data.data
            }
            else{
                this.swr()
            }
    }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>