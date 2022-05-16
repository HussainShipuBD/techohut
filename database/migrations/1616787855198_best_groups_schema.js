'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BestGroupsSchema extends Schema {
  up () {
    this.create('best_groups', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('best_groups')
  }
}

module.exports = BestGroupsSchema
