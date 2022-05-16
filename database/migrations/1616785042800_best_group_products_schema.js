'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BestGroupProductsSchema extends Schema {
  up () {
    this.create('best_group_products', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('best_group_products')
  }
}

module.exports = BestGroupProductsSchema
