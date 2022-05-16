'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BestGroupProduct extends Model {
    product () {
        return this.belongsTo('App/Models/MainProduct', 'productId','id')
      }
}

module.exports = BestGroupProduct
