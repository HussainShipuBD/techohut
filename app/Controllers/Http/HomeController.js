'use strict'

const User = use('App/Models/User')
const Group = use('App/Models/Group')
const Brand = use('App/Models/Brand')
const OpeningTime = use('App/Models/OpeningTime')
const Category = use('App/Models/Category')
const Setting = use('App/Models/Setting')
const Review = use('App/Models/Review')
const Product = use('App/Models/Product')
const MainSlider = use('App/Models/MainSlider')
const MainProduct = use('App/Models/MainProduct')
const LandingPageSetting = use('App/Models/LandingPageSetting')
const Restaurant = use('App/Models/Restaurant')
const BestGroup = use('App/Models/BestGroup')
const BestGroupProduct = use('App/Models/BestGroupProduct')
const Team = use('App/Models/Team') 
const Faq = use('App/Models/Faq') 
const Report = use('App/Models/Report') 
const Helpers = use('Helpers')
const Database = use('Database')
const SRequst = require('request');
const Env = use('Env')
class HomeController {
  // Flank Daily Email Subscription

  
  async userLogin ({ request, response, auth, session }) {
    const data = request.all()

    let user = await User.query().where('email', data.email).first()
    user = JSON.parse(JSON.stringify(user))
    if (user == null) {
      return response.status(401).json({
        'message': 'Invalid email . Please try again.'
      })
    }
    if (user.packType != 2) {
      return response.status(401).json({
        'message': 'You Profile is not Local Instructor Profile!'
      })
    }

    try {
      let user = await auth.query().attempt(data.email, data.password)
      return User.query().with('legend').where('id',user.id).first();
    } catch (e) {
      return response.status(401).json({
        'message': 'Invalid  password. Please try again.'
      })
    }
  }
  async logout ({ auth, session }) {
    try {
      session.clear()
      await auth.logout()
      return
    } catch (e) {
      return false
    }
  }
  async initdata ({ request, response, auth }) {
    try {
      const user = await auth.getUser()
      const legend = await User.query().with('legend').where('id',user.id).first();
      return {
        user: legend
      //  user: user
      }
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

  // Upload Photos
  async uploadReviewFile ({ request, response }) {
    const profilePic = request.file('file', {
      types: ['png', 'jpg', 'jpeg'],
      size: '2mb'
    })

    const name = `${new Date().getTime()}` + '.' + profilePic.subtype
    // UPLOAD THE IMAGE TO UPLOAD FOLDER
    await profilePic.move(Helpers.publicPath('uploads'), {
      name: name
    })
    if (!profilePic.moved()) {
      return profilePic.error()
    }
    let url = Env.get('APP_URL', 'https://dreamsgallerybd.com');
    return response.status(200).json({
      msg: 'Image has been uploaded successfully!',
      file: `${url}/uploads/${name}`
    })
  }
  // Landing Page Methods 
  async allSliders({response}){
    let mainSlider =  await MainSlider.all();
    mainSlider = JSON.parse(JSON.stringify(mainSlider));
    let headerSlider = mainSlider.splice(0, 3);
    let middleCards = mainSlider.splice(0, 3);
    let promotionalCards = mainSlider.splice(0, 2);
    return response.status(200).json({
        'success': true,
        headerSlider : headerSlider,
        middleCards : middleCards,
        promotionalCards : promotionalCards,
    });
  }
  async topBanner({response}){
    let topBanner =  await MainSlider.query().where('id',9).first(); 
    
    return response.status(200).json({
        'success': true,
        topBanner : topBanner,
       
    });
  }
  async openingtime({response}){
    let openingtime =  await OpeningTime.all();
    
    return response.status(200).json({
        'success': true,
        openingtime : openingtime,
       
    });
  }

  async landingPageSetting({response}){
    let landingPageSetting =  await LandingPageSetting.query().where('id',1).first();
    
    return response.status(200).json({
        'success': true,
        landingPageSetting : landingPageSetting,
       
    });
  }
  async bestGroupWithProducts({response}){
    let data = await BestGroup.query().with('bproducts.product.allgroup').with('bproducts.product.allcategory').with('bproducts.product.allbrand').with('bproducts.product.allImages').with('bproducts.product.avgRating').with('group').fetch()
    data = data.toJSON();
    let group = [];
    for(let d of data){
      let groupOb = {
        id:d.group.id,
        groupName:d.group.groupName,
        discount:d.group.discount,
        products:[]
      }
      if(d.bproducts){
        for(let ddd of d.bproducts){
          groupOb.products.push(ddd.product)
        }
      }
      group.push(groupOb);
    }
    // const group =  await BestGroup.query().with('products.allgroup').with('products.allcategory').with('products.allbrand').with('products.allImages').with('products.avgRating').orderBy('id','desc').limit(5).fetch()
    return response.status(200).json({
        'success': true,
        'group': group,
    })
  }
  async bestProducts({response}){
     const b  =  await MainProduct.query().where('isAvailable',1).where('isAvailable',1).with('allImages').with('avgRating').with('allgroup').with('allcategory').with('allbrand').orderBy('totalSale','desc').limit(10).fetch()
     return response.status(200).json({
        'success': true,
        'b': b,
    })
  }
  async featuredProducts({response}){
     const f  =  await MainProduct.query().where('isAvailable',1).where('isFeatured',1).with('allImages').with('avgRating').with('allgroup').with('allcategory').with('allbrand').orderBy('id','desc').limit(10).fetch()
     return response.status(200).json({
        'success': true,
        'f': f,
    })
  }
  async newProducts({response}){
     const n = await MainProduct.query().where('isAvailable',1).where('isNew',1).with('allImages').with('allgroup').with('avgRating').with('allcategory').with('allbrand').orderBy('id','desc').limit(10).fetch()
     return response.status(200).json({
        'success': true,
        'n': n,
    })

  }
  async getProductVariable({response,params}){
     const colour = await Product.query().select(Database.raw('DISTINCT color')).whereNotNull('color').where('mproductId',params.id).fetch()
     const size = await Product.query().select(Database.raw('DISTINCT size')).whereNotNull('size').where('mproductId',params.id).fetch()
     return response.status(200).json({
        'success': true,
        'colour': colour,
        'size': size,
    })

  }
  async getSingleproduct({response,params,request}){
    let isApp =  request.input('isApp') 
      let product = await MainProduct.query().where('id',params.id).with('allgroup').with('allcategory').with('allbrand').with('tags').with('allImages').with('avgRating').withCount('allreviews').first()
      const colour = await Product.query().select(Database.raw('DISTINCT color')).whereNotNull('color').where('mproductId',params.id).fetch();
      const size = await Product.query().select(Database.raw('DISTINCT size')).whereNotNull('size').where('mproductId',params.id).fetch();
      if(isApp){
        product = product.toJSON();
        product.description  = JSON.parse(product.description)
      }
     return response.status(200).json({
        'success': true,
        'colour': colour,
        'size': size,
        'product': product,
    })

  }
  async getVariableProduct({response,request}){
    let data = request.all();
    let product =  Product.query().where('mproductId',data.mproductId);
    if(data.size) product.where('size',data.size);
    if(data.colour) product.where('color',data.colour);
    let finalProduct = await product.first();
    return response.status(200).json({
        'success': true,
        'finalProduct': finalProduct,
    })

  }
  async relatedProduct({response,params}){
    let current = await MainProduct.query().where('id',params.id).first();
    let product =  await MainProduct.query().where('isAvailable',1).whereNot('id',params.id).where('categoryId',current.categoryId).with('allImages').with('allgroup').with('allcategory').with('allbrand').limit(10).orderBy('totalSale','desc').fetch()
    return response.status(200).json({
        'success': true,
        'product': product,
    })

  }
  async showRestaurants({response,params}){
    let Reviews = await Restaurant.all();
    return response.status(200).json({
        'success': true,
        'restaurants': Reviews,
    })

  }
  async showTeams({response,params}){
    let Reviews = await Team.all();
    return response.status(200).json({
        'success': true,
        'team': Reviews,
    })

  }
  async showReviews({response,params}){
    let Reviews = await Review.query().where('productId',params.id).
    
    with('user').orderBy('id','desc').fetch();
    return response.status(200).json({
        'success': true,
        'reviews': Reviews,
    })

  }
  async storeReview({response,request,auth}){
    let data = request.all();
    const user = await auth.getUser()
    if(data.userId !== user.id){
      return response.status(401).json({
        'success': false,
        'message': "You don't have authrization!",
      })
    }
    let u = await Review.query().where('userId', data.userId).where('productId',data.productId).first()
    if(u){
      return response.status(401).json({
        'success': false,
        'message': "You already gave review to this product!",
      })
    }
    let r = await  Review.create(data);
    let Reviews = await Review.query().where('id',r.id).with('user').first()
    return response.status(200).json({
        'success': true,
        'review': Reviews,
    })

  }

  async storeContactus({response,request}){ 
    let data = request.all();
    
    let reports = await  Contactus.create(data);
    return response.status(200).json({
        'success': true,
        'contactus': contactus,
    })

  }
  async storeReports({response,request}){ 
    let data = request.all();
    
    let report = await  Report.create(data);
    return response.status(200).json({
        'success': true,
        'report': report,
    })

  }
  async getAllReports({response,request,auth}){
    const user = await auth.getUser()
    let page =  request.input('page') ? request.input('page') : 1
    let data = await Report.query().where('userId',user.id).paginate(page,5); 
    return response.status(200).json({
        'success': true,
        data : data,
       
    });
  }
  async getAllFaq({response,request}){
     
    let page =  request.input('page') ? request.input('page') : 1
    let data = await Faq.query().paginate(page,5); 
    return response.status(200).json({
        'success': true,
        data : data,
       
    });
  }
  async getSettings({response,request}){
    let data = await Setting.query().where('id',1).first();; 
    return response.status(200).json({
        'success': true,
        settings : data,
       
    });
  }
  async new_test_created_at({response,request}){

    let data = await Brand.create({
      name:"Adidas"
    });; 
    return response.status(200).json({
        'success': true,
        settings : data,
       
    });
  }

  async testApi ({ request, response, auth }) {
    let data = {
      contact:'8801681189844'
    };
    let dataObj = {
      number:'01681189844',
      username:'01619672554',
      password:'Nokia6300',
      message:'Axios Test Message',
  }

  
  // var options = {
  //   'method': 'POST',
  //   'url': `http://66.45.237.70/api.php?username=${dataObj.username}&password=${dataObj.password}&number=${dataObj.number}&message=${dataObj.message}`,
  //   'headers': {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // };

  // SRequst(options, function (error, response) { 
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  // });
  
  let regex = /^[0][1][3-9][0-9]{8}$/;
  if (!regex.test(data.contact)) {
    return response.status(401).json({
      'success': false,
      'message': 'Invalid Contact Number ',
    })
  }
    // console.log(res)
  
    return response.status(200).json({
      'success': true,
      'kk': true,
      // 'data': res.data
    })
  }



}

module.exports = HomeController
