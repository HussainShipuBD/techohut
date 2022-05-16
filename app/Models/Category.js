'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    products () {
        return this.hasMany('App/Models/MainProduct', 'id', 'categoryId')
    }
    allproducts () {
        return this.hasMany('App/Models/MainProduct', 'id', 'categoryId').count()
    }
}

module.exports = Category
