'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BestGroup extends Model {

    bproducts () {
        return this.hasMany('App/Models/BestGroupProduct', 'id', 'bestGroupId')
    }
    group () {
        return this.belongsTo('App/Models/Group', 'groupId','id')
      }
}

module.exports = BestGroup
