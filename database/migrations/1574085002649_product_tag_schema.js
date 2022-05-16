'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTagSchema extends Schema {
  up () {
    this.create('product_tags', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_tags')
  }
}

module.exports = ProductTagSchema
