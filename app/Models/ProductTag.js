'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductTag extends Model {
    allbrand () {
        return this.belongsTo('App/Models/Tag', 'tagId')
      }
}

module.exports = ProductTag
