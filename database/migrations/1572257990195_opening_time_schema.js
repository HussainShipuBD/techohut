'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OpeningTimeSchema extends Schema {
  up () {
    this.create('opening_times', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('opening_times')
  }
}

module.exports = OpeningTimeSchema
