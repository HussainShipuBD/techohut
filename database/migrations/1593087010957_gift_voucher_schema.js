'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GiftVoucherSchema extends Schema {
  up () {
    this.create('gift_vouchers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('gift_vouchers')
  }
}

module.exports = GiftVoucherSchema
