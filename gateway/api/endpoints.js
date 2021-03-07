import util from 'util'

const userUrl = process.env.USER_SERVICE_URL
const tokenUrl = process.env.TOKEN_SERVICE_URL

export default  {
  loginUrl: `${userUrl}/login`,
  registerUrl: `${userUrl}/register`,
  userUrl: `${userUrl}/`,
  newTokenUrl: `${tokenUrl}/new-token`,
  refreshTokenUrl: `${tokenUrl}/refresh-token`,
}