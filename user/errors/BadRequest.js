import AppError from './AppError.js'

class BadRequest extends AppError {
  constructor (message, errors) {
    super(message || 'Your request can\'t be processed', 400);
    this.errors = errors 
  }

  response(){
    let resp = {
      message: this.message,
    }
    if(this.errors) resp['errors'] = this.errors
    return resp
  }
}
export default BadRequest