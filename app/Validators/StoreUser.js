'use strict'

class StoreUser {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      
      email: 'required|email|unique:users,email',
      contact: 'required|unique:users,contact',
      password: 'required|min:6'
     
    }
  }
  get messages () {
    return {
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'contact.unique': 'This Number is already registered.',
      'password.min': 'Minimum character for password is 3'
    }
  }
}

module.exports = StoreUser
