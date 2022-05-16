'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment-timezone');
class Order extends Model {
   
    static formatDates(field, value) {
        return moment(value).tz("Asia/Dhaka").format('YYYY-MM-DDTHH:mm:ss')
    }
    orderdetails () {
        return this.hasMany('App/Models/OrderDetail','id', 'orderId')  
    }
    user () {
        return this.belongsTo('App/Models/User','userId', 'id')  
    }
    static castDates (field, value) {
        if (field === 'created_at') {
            return value.format('DD-MM-YYYY')
        }
        return super.formatDates(field, value)
      }
}

module.exports = Order
