'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
    products () {
        return this.hasMany('App/Models/MainProduct', 'id', 'groupId')
      }
    category () {
        return this.hasMany('App/Models/Category', 'id', 'group_id')
      }
}

module.exports = Group
