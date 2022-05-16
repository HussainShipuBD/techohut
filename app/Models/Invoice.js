'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require('moment-timezone');
class Invoice extends Model {
   
    static formatDates(field, value) {
        return moment(value).tz("Asia/Dhaka").format('YYYY-MM-DDTHH:mm:ss')
    }
    customer () {
        return this.belongsTo('App/Models/Customer')
    }
}


module.exports = Invoice
