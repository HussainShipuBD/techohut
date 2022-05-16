'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MainProductSchema extends Schema {
  up () {
    this.create('main_products', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('main_products')
  }
}

module.exports = MainProductSchema
