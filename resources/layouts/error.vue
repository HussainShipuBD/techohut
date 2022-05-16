{{{{raw}}}}
<template >
    <div id="main-wrapper">
        <!-- 404 Error Section Start -->
        <div class="404-error-section section pt-65 pt-lg-45 pt-md-45 pt-sm-40 pt-xs-35">
            <div class="container sb-border pb-100 pb-lg-80 pb-md-70 pb-sm-40 pb-xs-35">
                <div class="row">
                    <div class="col-md-12">
                        <div class="error-wrapper text-center">
                            <div class="error-text">
                                <h1 v-if=""> {{ error.statusCode }}</h1>
                                <p v-if="error.message">{{ error.message }}</p>
                                <p v-else>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarity unavailable.</p>
                            </div>
                            <!-- <div class="search-error">
                                <form action="#">
                                    <input placeholder="Search" type="text">
                                    <button><i class="fa fa-search"></i></button>
                                </form>
                            </div> -->
                            <div class="error-button" v-if="error.statusCode === 404">
                                <nuxt-link to="/" style="color: #fff !important;">Back to home page</nuxt-link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 404 Error Section End -->
        </div>
 
</template>

{{{{/raw}}}}
<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
