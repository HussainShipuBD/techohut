'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database') 

class Product extends Model {
  mainproduct () {
    return this.belongsTo('App/Models/MainProduct', 'mproductId','id')
  }
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

 

}

module.exports = Product
