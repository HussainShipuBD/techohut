'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderDetailsSchema extends Schema {
  up () {
    this.create('order_details', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_details')
  }
}

module.exports = OrderDetailsSchema
