'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LandingPageSettingSchema extends Schema {
  up () {
    this.create('landing_page_settings', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('landing_page_settings')
  }
}

module.exports = LandingPageSettingSchema
