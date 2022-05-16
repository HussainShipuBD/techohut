'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
class Cart extends Model {
    static get computed () {
        return ['details']
    }
    getDetails ({ product }) {
        return JSON.parse(product);
    }
    mproduct () {
        return this.belongsTo('App/Models/MainProduct','mproductId', 'id')  
    }
    vproduct () {
        return this.belongsTo('App/Models/Product','productId', 'id')  
    }
}

module.exports = Cart
