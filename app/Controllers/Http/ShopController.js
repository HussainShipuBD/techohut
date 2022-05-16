'use strict'
const Group = use('App/Models/Group')
const Product = use('App/Models/Product')
const Tag = use('App/Models/Tag')
const Brand = use('App/Models/Brand')
const UserSearch = use('App/Models/UserSearch')
const MainProduct = use('App/Models/MainProduct')
const Database = use('Database')
class ShopController {

    async allTags({response,request}){
        const p =  await Tag.all()
        return response.status(200).json({
            'success': true,
            'tags': p,
        })
    }
    async AllBrands({response,request}){
        let limit =  request.input('limit')
        let p = null;
        if(limit)  p =  await Brand.query().limit(limit).orderBy('name','asc').fetch()
        else   p =  await Brand.query().orderBy('name','asc').fetch()
        return response.status(200).json({
            'success': true,
            'brands': p,
        })
    }
    async allColors({response,request}){
        const p =  await Product.query().select(Database.raw('DISTINCT color')).whereNotNull('color').fetch();
        return response.status(200).json({
            'success': true,
            'colors': p,
        })
    }
    async allGroups({response,request}){
        let limit =  request.input('limit')

        let p =   Group.query()

        // .with('category.products')
        // .with('category', (builder) => builder.withCount('products'))
        .withCount('products');
        if(limit) p.limit(limit)
        else p.with('category', (builder) => builder.withCount('products'))
        let data = await p.fetch();
        return response.status(200).json({
            'success': true,
            'groups': data,
        })
    }
    async shopPageData({response,request,auth}){
        let from = request.input('from') ? request.input('from') : 'app'
        let limit = request.input('limit') ? request.input('limit') : 20
        let page = request.input('page') ? request.input('page') : 1
        let order =  request.input('order')
        let color =  request.input('colour')
        let tags =  request.input('tags')
        let minPrice =  request.input('minPrice')
        let maxPrice =  request.input('maxPrice')
        let brandId =  request.input('brandId')
        let str =  request.input('str')
        let groupId =  request.input('groupId')
        let categoryId =  request.input('categoryId')
        let user_id = 0;
        try {
            user_id = auth.getUser().id
        } catch (error) {

        }
        let product =  MainProduct.query().where('isAvailable',1).with('allImages').with('avgRating').with('allcategory').with('allgroup').with('allbrand').with('tags').withCount('allreviews').with('variationproducts')
        if(groupId) product.where('groupId',groupId)

        if(brandId){
            product.where('brandId',brandId)
        }
        if(color){
            product.whereHas('variationproducts' , (builder) => builder.where('color',color) )
        }
        if(str){

            // product.where('productName', 'like', '%'+str+'%')
            product.where( (builder) => {
               let  words = str.split(" ");
                builder.where((builder2) =>{
                    let index = 0;
                    for(let w of words){
                        if(index == 0) builder2.where('productName', 'like', '%'+w+'%')
                        else builder2.orWhere('productName', 'like', '%'+w+'%')
                    }
                });

                builder.orWhere('model', 'like', '%'+str+'%');
            } )

        }
        if(minPrice ) product.where('sellingPrice', '>=', parseInt(minPrice))
        if(maxPrice ) product.where('sellingPrice', '<=', parseInt(maxPrice))

        if(categoryId) product.where('categoryId',categoryId)
        if(tags){
            var res = tags.split(",");
            product.whereHas('tags' , (builder) => builder.whereIn('tagId',res) )
        }
        if(order){
            var res = order.split(",");
            product.orderBy(res[0],res[1])
        }
        else{
            product.orderBy('id','desc  ')
        }
        if(from == 'app'){
          const p =  await product.paginate(page,28)
          return response.status(200).json({
              'success': true,
              'products': p,
          })
        }
        const p =  await product.limit(limit).fetch();
        this.storeUserString(str,user_id)
        return response.status(200).json({
            'success': true,
            'products': p,
        })
    }
    async salePageData({response,request}){
      let limit = request.input('limit') ? request.input('limit') : 20
      let order =  request.input('order')
      let color =  request.input('colour')
      let tags =  request.input('tags')
      let minPrice =  request.input('minPrice')
      let maxPrice =  request.input('maxPrice')
      let brandId =  request.input('brandId')
      let str =  request.input('str')
      let groupId =  request.input('groupId')
      let categoryId =  request.input('categoryId')
        let product =  MainProduct.query().where('isAvailable',1).where('discount','>',0).with('allImages').with('avgRating').with('allcategory').with('allgroup').with('allbrand').with('tags').withCount('allreviews').with('variationproducts')
        if(groupId) product.where('groupId',groupId)
        if(brandId){
            console.log('brand id')
            console.log(brandId)
            product.where('brandId',brandId)
        }
        if(color){
            product.whereHas('variationproducts' , (builder) => builder.where('color',color) )
        }
        if(str){

            // product.where('productName', 'like', '%'+str+'%')
            product.where( (builder) => {
               let  words = str.split(" ");
                builder.where((builder2) =>{
                    let index = 0;
                    for(let w of words){
                        if(index == 0) builder2.where('productName', 'like', '%'+w+'%')
                        else builder2.orWhere('productName', 'like', '%'+w+'%')
                    }
                });

                builder.orWhere('model', 'like', '%'+str+'%');
            } )

        }
        if(minPrice ) product.where('sellingPrice', '>=', parseInt(minPrice))
        if(maxPrice ) product.where('sellingPrice', '<=', parseInt(maxPrice))

        if(categoryId) product.where('categoryId',categoryId)
        if(tags){
            var res = tags.split(",");
            product.whereHas('tags' , (builder) => builder.whereIn('tagId',res) )
        }
        if(order){
            var res = order.split(",");
            product.orderBy(res[0],res[1])
        }
        else{
            product.orderBy('id','desc  ')
        }
        const p =  await product.limit(limit).fetch();
        return response.status(200).json({
            'success': true,
            'products': p,
        })
    }
    async appSalePageData({response,request}){
        let page = request.input('page') ? request.input('page') : 1
        let order =  request.input('order')
        let color =  request.input('colour')
        let tags =  request.input('tags')
        let minPrice =  request.input('minPrice')
        let maxPrice =  request.input('maxPrice')
        let brandId =  request.input('brandId')
        let str =  request.input('str')
        let groupId =  request.input('groupId')
        let categoryId =  request.input('categoryId')
        let product =  MainProduct.query().where('isAvailable',1).where('appDiscount','>',0).with('allImages').with('avgRating').with('allcategory').with('allgroup').with('allbrand').with('tags').withCount('allreviews').with('variationproducts')
        if(groupId) product.where('groupId',groupId)
        if(brandId){
            console.log('brand id')
            console.log(brandId)
            product.where('brandId',brandId)
        }
        if(color){
            product.whereHas('variationproducts' , (builder) => builder.where('color',color) )
        }
        if(str){

            // product.where('productName', 'like', '%'+str+'%')
            product.where( (builder) => {
               let  words = str.split(" ");
                builder.where((builder2) =>{
                    let index = 0;
                    for(let w of words){
                        if(index == 0) builder2.where('productName', 'like', '%'+w+'%')
                        else builder2.orWhere('productName', 'like', '%'+w+'%')
                    }
                });

                builder.orWhere('model', 'like', '%'+str+'%');
            } )

        }
        if(minPrice ) product.where('sellingPrice', '>=', parseInt(minPrice))
        if(maxPrice ) product.where('sellingPrice', '<=', parseInt(maxPrice))

        if(categoryId) product.where('categoryId',categoryId)
        if(tags){
            var res = tags.split(",");
            product.whereHas('tags' , (builder) => builder.whereIn('tagId',res) )
        }
        if(order){
            var res = order.split(",");
            product.orderBy(res[0],res[1])
        }
        else{
            product.orderBy('id','desc  ')
        }
        const p =  await product.paginate(page,28)
        return response.status(200).json({
            'success': true,
            'products': p,
        })
    }
    async appShopPageData({response,request}){
        let order =  request.input('order')
        let tags =  request.input('tags')
        let minPrice =  request.input('minPrice')
        let maxPrice =  request.input('maxPrice')
        let brandId =  request.input('brandId')
        let str =  request.input('str')
        let color =  request.input('colour')
        let groupId =  request.input('groupId')
        let categoryId =  request.input('categoryId')
        let product =  Product.query().where('isAvailable',1).with('avgRating').with('allcategory').with('allgroup').with('allbrand').with('tags')
        if(groupId) product.where('groupId',groupId)
        if(brandId) product.where('brandId',brandId)
        if(color) product.where('color',color)
        if(str) product.where('productName', 'like', '%'+str+'%')
        if(minPrice ) product.where(Database.raw('cast( sellingPrice as int)  '), '>=', minPrice)
        if(maxPrice ) product.where(Database.raw('cast( sellingPrice as int) '), '<=', maxPrice)

        if(categoryId) product.where('categoryId',categoryId)
        if(tags){
            var res = tags.split(",");
            product.whereHas('tags' , (builder) => builder.whereIn('tagId',res) )
        }
        if(order){
            var res = order.split(",");
            product.orderBy(res[0],res[1])
        }
        else{
            product.orderBy('id','desc')
        }
        const p =  await product.fetch()
        return response.status(200).json({
            'success': true,
            'products': p,
        })
    }
    async storeUserString(str,user_id){
        if(str == '') return
        return await UserSearch.create({
            str:str,
            user_id:user_id,
        });
    }

}

module.exports = ShopController
