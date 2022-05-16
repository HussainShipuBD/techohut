'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MainSliderSchema extends Schema {
  up () {
    this.create('main_sliders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('main_sliders')
  }
}

module.exports = MainSliderSchema
