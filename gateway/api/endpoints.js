import util from 'util'

export default  {
  loginUrl: `${process.env.USER_SERVICE_URL}/login`,
  registerUrl: `${process.env.USER_SERVICE_URL}/register`,
  newTokenUrl: `${process.env.TOKEN_SERVICE_URL}/new-token`,
  refreshTokenUrl: `${process.env.TOKEN_SERVICE_URL}/refresh-token`,
}