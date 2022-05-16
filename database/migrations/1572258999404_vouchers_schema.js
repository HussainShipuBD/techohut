'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VouchersSchema extends Schema {
  up () {
    this.create('vouchers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('vouchers')
  }
}

module.exports = VouchersSchema
