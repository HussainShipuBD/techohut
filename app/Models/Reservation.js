'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment-timezone');
class Reservation extends Model {
   
    static formatDates(field, value) {
        return moment(value).tz("Asia/Dhaka").format('YYYY-MM-DDTHH:mm:ss')
    }
    product () {
        return this.belongsTo('App/Models/Product', 'productId', 'id')
      }
}

module.exports = Reservation
