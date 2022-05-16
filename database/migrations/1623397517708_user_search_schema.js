'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSearchSchema extends Schema {
  up () {
    this.create('user_searches', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_searches')
  }
}

module.exports = UserSearchSchema
