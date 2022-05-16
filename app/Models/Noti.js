'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment-timezone');
class Noti extends Model {
   
    static formatDates(field, value) {
        return moment(value).tz("Asia/Dhaka").format('YYYY-MM-DDTHH:mm:ss')
    }
}

module.exports = Noti
