'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactusSchema extends Schema {
  up () {
    this.create('contactuses', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('contactuses')
  }
}

module.exports = ContactusSchema
