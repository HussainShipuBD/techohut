'use strict'

const Logger = use('App/Models/Logger')
const Env = use('Env')
const BaseExceptionHandler = use('BaseExceptionHandler')
var Bugsnag = require('@bugsnag/js')
Bugsnag.start({ apiKey: 'acfac4fafc070cdc97d17f9cae5b0151' })

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */

    async handle (error, { request, response , auth}) {
      // if(Env.get('NODE_ENV') == 'production'){
      //   let user = {}

      //   try {
      //       user = await auth.getUser()
      //   } catch (error) {
      //       user = null
      //   }
      //     Bugsnag.notify(error, function (event) {
      //       console.log("user find")
      //       if(user) {
      //         console.log("user login")
      //         event.setUser(user.id, user.email, user.firstName+' '+user.lastName)
      //       }
      //       else console.log('not login')
      //       event.addMetadata('errorData',{
      //           error : error,
      //           request: request.all(),
      //           response: response.frames,
      //           msg: error.message,
      //       })

      //   })
      //   response.status(500).send({msg: 'Something went wrong, we are working on it...'})
      // }
      // else {
        console.log('handle-error')
        console.log('handle-error')
      console.log(error)
        let data={
                error : error,
                request: request.all(),
                url: request.url(),
                msg: error.message
              }
              return response.status(error.status).send({
                  error : error,
                  request: request.all(),
                  //response: response.toJSON(),
                  msg: error.message,
                  from: 'error.message',

              })
      // }
    }



  // async handle (error, { request, response }) {
  //   const ip = request.ip();




  //   if(Env.get('NODE_ENV') == 'development'){
  //     let data={
  //       error : error,
  //       request: request.all(),
  //       url: request.url(),
  //       msg: error.message
  //     }
  //     return response.status(error.status).send({
  //         error : error,
  //         request: request.all(),
  //         //response: response.toJSON(),
  //         msg: error.message,
  //         from: 'error.message',

  //     })
  //   } else {


  //     let data={
  //       error : error,
  //       request: request.all(),
  //       url: request.url(),
  //       //response: response.toJSON(),
  //       msg: error.message
  //     }
  //     if(error.message == 'EBADCSRFTOKEN: Invalid CSRF token'){
  //       return response.status(500).send({msg: 'Something went wrong, we are working on it...'})
  //     }

  //     let ip_details  = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=2fd001f9211047c4b1d30ec3d506ebae&ip=${ip}`);


  //     let data1 =  await Logger.create({
  //           info:JSON.stringify(data),
  //           ip_info:JSON.stringify(ip_details.data),
  //       })

  //     let msg = {
  //       to: 'nazmulchowdhury4@gmail.com',
  //       from: 'no-reply@joincarevan.com',
  //       subject: 'Carevan API server error',
  //       text: 'Carevan',
  //       html: `<table border="0" cellpadding="0" cellspacing="0" style="width:100%;height:100%;background-color:#f0f2f4"><tbody><tr><td style="vertical-align:top;background-color:#f0f2f4"><table border="0" cellpadding="0" cellspacing="0" align="center" style="width:600px"><tbody><tr><td style="text-align:center;padding-top:40px;padding-bottom:20px"> <a href="http://zoom.us" target="_blank"> <img style="width: 200px; height: auto;" src="https://joincarevan.com/logo.png" alt="https://joincarevan.com/logo.png" title="Carevan"> </a></td></tr><tr><td style="background-color:#ffffff;padding-bottom:40px"><table border="0" cellpadding="0" cellspacing="0" align="center" style="width:520px"><tbody><tr><td style="padding-top:40px;font-family:helvetica,arial;font-size:14px;line-height:20px;color:#333333"> ${JSON.stringify(data1) } <br></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`,
  //     };
  //     await  sgMail.send(msg);
  //     msg.to = "sadek.hkm@gmail.com"
  //     await  sgMail.send(msg);

  //     return response.status(error.status).send({
  //       msg: 'Something went wrong!',
  //     })
  //   }

  // }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
