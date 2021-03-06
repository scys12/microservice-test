import AppError from './AppError.js'

class NotFound extends AppError {
  constructor (message) {
    super(message || 'Your request not found', 404);
  }
}
export default NotFound