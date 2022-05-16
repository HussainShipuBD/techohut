'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
class MainProduct extends Model {
    allImages () {
        return this.hasMany('App/Models/ProductImage', 'id','productId') 
      }
      allgroup () {
        return this.belongsTo('App/Models/Group', 'groupId')
      }
      allcategory () {
        return this.belongsTo('App/Models/Category', 'categoryId')
      }
      allbrand () {
        return this.belongsTo('App/Models/Brand', 'brandId')
      }
      tags () {
        return this.hasMany('App/Models/ProductTag','id', 'productId')
      }
      variationproducts () {
        return this.hasMany('App/Models/Product', 'id', 'mproductId')
      }
      avgRating () {
        return this.hasOne('App/Models/Review', 'id', 'productId').select( 'productId', Database.raw('(cast(AVG(rating) as decimal(10,2))) AS averageRating')).groupBy('productId')
      }
      allreviews () {
        return this.hasMany('App/Models/Review', 'id', 'productId')
      }
     
}

module.exports = MainProduct
