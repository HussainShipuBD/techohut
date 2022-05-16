<template>
    <div class="container">
			<div class="_about_all">
			<div class="top_content mr_b30">
				<h2 class="title_about text-center">About Dreams Gallery</h2>
				<p class="_1text">
					Dreams Gallery is one of the top online shopping places in Bangladesh for best quality products with best prices. It was 2nd June, 2015 when Dreams Gallery started its journey towards online business with a very few imported products. by time it grew big from small, and then bigger. Dreams Gallery started to gain such customers from whom it got a lot appreciations and supports that helped it to make a clear vision, mission and to take an attempt to achieve the ultimate goal to reach the people all over Bangladesh with the best products at best prices. By time Dreams Gallery continued to take steps towards its dream and it came up with its first outlet in Sylhet in 26th May, 2018. During these years we have received so much love and support from all our customers and well wishers. 
				</p>
				<p class="_1text">
					Dreams Gallery has taken a big step towards its goal by launching its own brand "TANSY" on October 26 , 2019. You are going to get the best quality products with unique designs at best prices and yes most importantly our own BRANDED products.
				</p>
				<p class="_1text">
					Dreams Gallery is constantly bringing you so many stylish and branded new products time to time. Our core product is imported branded shoes and along with this we sell imported bags, watches, clothing’s, cosmetics etc. Dreams Gallery is stepping forward with the aim of being one of the leading online and offline stores in Bangladesh.
				</p>
				<p class="_1text">
					Dreams Gallery believes in “Delivering Happiness” with an excellent customer experience thus provides the most efficient delivery service so that customers get a hassle-free product delivery at their doorstep. We also offer various payment methods including Cash on delivery, Online Payments, Card on delivery and bKash with all of our products.
				</p>
				<p class="_1text">
					We are constantly trying to deliver the best quality products to our valuable clients. Be a part of it and Enjoy every bit if shopping with Dreams Gallery.
				</p>

				<h2 class="title_about text-center">Why to Shop us</h2>

				<div class="_daily">
					<div class="row">
						<div class="col-12 col-md-3 col-lg-3">
							<div class="_daily_main">
								<i class="fas fa-shipping-fast"></i>
								<p class="_daily_title">Home Delivery</p>
								<p class="_daily_text"> Providing Home Delivery Service to Every State of Bangladesh</p>
							</div>
						</div>

						<div class="col-12 col-md-3 col-lg-3">
							<div class="_daily_main">
								<i class="fas fa-hand-holding-usd"></i>
								<p class="_daily_title">Cash on Delivery</p>
								<p class="_daily_text"> Providing the most convenient Cash on Delivery Service go our clients</p>
							</div>
						</div>

						<div class="col-12 col-md-3 col-lg-3">
							<div class="_daily_main">
								<i class="fas fa-award"></i>
								<p class="_daily_title">Genuine Products</p>
								<p class="_daily_text"> Supplying all Genuine and Branded Products</p>
							</div>
						</div>

						<div class="col-12 col-md-3 col-lg-3">
							<div class="_daily_main">
								<i class="fas fa-user-cog"></i>
								<p class="_daily_title">Best Support</p>
								<p class="_daily_text"> Delivering the Best Quality Products with Best Prices</p>
							</div>
						</div>
					</div>
				</div>

				<h2 class="title_about text-center">Our Team</h2>

				<div class="_team" v-if="teams.length>0">
					<!-- Items -->
					<div class="_team_main" v-for="(item,index) in teams" :key="index">
						<div class="_team_main_pic">
							<img class="_team_img" :src="item.img" alt="" title="">
						</div>
						<a :href="item.link" target="_blank" rel="noopener noreferrer" class="_team_name">{{item.name}}</a>
						<p class="_team_pre">{{item.title}}</p>
					</div>
					<!-- Items -->
				</div>
			</div>
				<!-- <div class="row">
					<div class="col-12 col-md-4 col-lg-4">
						<div class="genuine_left mr_b30">
							<img src="img/geniune.jpg" alt="image">
						</div>
					</div>
					<div class="col-12 col-md-8 col-lg-8">
						<div class="genuine_right mr_b30">
							<h4 class="title_text text-center">Get Genuine and Original Product</h4>
							<p class="text">Caderno gives you a best experience of genuine product. Our designers and product team works hard to bring original and satisfying product to you. Features of Caderno Products:</p>
							<ul class="genuine_right_ul">
								<li>Best stationary online shop in Bangladesh</li>
								<li>100% original products</li>
								<li>Fast delivery</li>
								<li>Exciting offers and sells</li>
								<li>Easy return policy</li>
								<li>Easy return policy</li>
								<li>Easy online paying method</li>
							</ul>
						</div>
					</div>

					<div class="col-12 col-md-8 col-lg-8">
						<div class="genuine_right mr_b30">
							<h4 class="title_text text-center">Best Service</h4>
							<p class="text">We have different kind of delivery methods to send your products to you on time. You don’t need to wait up long for receiving products.</p>
							<ul class="genuine_right_ul">
								<li>Different Pickup Points</li>
								<li>Home Delivery</li>
								<li>Courier Services</li>
								<li>Delivery in a day</li>
								<li>Delivery outside Bangladesh</li>
							</ul>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4">
						<div class="genuine_left mr_b30">
							<img src="img/service.jpg" alt="image">
						</div>
					</div>

					<div class="bottom_item brdr_btm">
						<div class="row">
							<div class="col-12 col-md-4 col-lg-4">
								<div class="genuine_left mr_b30">
									<img src="img/product_img.jpg" alt="image">
								</div>
							</div>
							<div class="col-12 col-md-8 col-lg-8">
								<div class="genuine_right mr_b30">
									<h4 class="title_text text-center">Product Security</h4>
									<p class="text">We are committed to ensuring that your information is secure. We have electronic and automatic procedures to give your information’s a good security. These procedures help us to prevent any unauthorized actions. Also Caderno is authorized and licensed company. It assured the security of product quality and other information’s.</p>
									
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<!-- <div class="intrgm_section">
					<div class="row">
						<div class="col-12 col-md-6 col-lg-6">
							<div class="instgrm_left">
								<h2 class="title_instgrm text-center">Follow us on Instagram</h2>
							</div>
							<a href="">
								<div class="instgrm_link">
									<div class="left_image">
										<img src="img/instgrm_logo.jpg" alt="image">
											<i class="fab fa-instagram"></i>
									</div>
									<div class="right_instgrm_text">
										<a href="">
											<h3 class="right_instgrm_text_title">caderno.bd</h3>
										</a>
										
											<a href="">
												Notebook||Stickers||Planner||t shirt||stationary||minipad||phone case 
											M a d e   i  n   B a n g l a d e s h
												Office outlet: H#2 R#2d S#4 Uttara Dhaka
											</a>
										
									</div>
								</div>
							</a>
							<div class="row">
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
								<div class="col-12 col-md-4 col-lg-4 pdng5">
									<div class="instgrm_img">
										<img src="img/insgrm1.jpg" alt="image">
									</div>
								</div>
							</div>
							<div class="button_btm text-center">
								<div class="button_btm_one">
									<a href="">Load More…</a>
								</div>
								<div class="button_btm_two">
									<a href="">	
										<i class="fab fa-instagram"></i>
										Follow on Instagram
									</a>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-6 col-lg-6"></div>
					</div>
				</div> -->
				<div class="map_section">
					<h2 class="title_about text-center">Our Location</h2>
					<div class="row">
						<div class="col-12 col-md-6 col-lg-6 one">
							<iframe  id="gmap_canvas" src="https://maps.google.com/maps?q=dreams%20gallery%20&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
							<div class="bottom_section text-center">
								<p>
									<strong>Dreams Gallery</strong> <br>
									#904, City Centre, 9th floor, Zindabazar, Sylhet
								</p>
							</div>
						</div>
						<div class="col-12 col-md-6 col-lg-6">
							<!-- <iframe  id="gmap_canvas" src="https://maps.google.com/maps?q=dreams%20gallery%20&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> -->
							<iframe id="gmap_canvas"  src="https://maps.google.com/maps?q=Elegant%20Shopping%20Mall,%20Rd%20No.%2036,%20Sylhet,%20Bangladesh+(Dreams%20Gallery)&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
							<div class="bottom_section text-center">
								<p>
									<strong>Showroom 2</strong> <br>
										 
									Shop#04, Elegant Shopping Mall, Sylhet
								</p>
							</div>
						</div>
					</div>
                            
                   
					<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.12952437052!2d91.82596221894704!3d24.899837316894484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e0!3m2!1sen!2sbd!4v1575545554089!5m2!1sen!2sbd" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe> -->
				</div>
			</div>
		</div>
</template>

<style>
    .mapouter {
        position: relative;
        text-align: right;
        height: 500px;
        width: 1080px;
    }
    
    .gmap_canvas {
        overflow: hidden;
        background: none!important;
        height: 500px;
        width: 1080px;
    }
</style>

<script>
export default {
	data(){
		return{
			teams:[]
		}
	},
	async created(){
		const res = await this.callApi('get','app/teams')
		if(res.status == 200){
			this.teams = res.data.team
		}
	}
}
</script>