import boom from '@hapi/boom'
import { config } from '../config/config.js'

function checkApiKey(req, res, next){
  const apiKey = req.headers['api']
  if (apiKey === config.API_KEY){
    next()
  }
  else{
    next(boom.unauthorized())
  }
}

function checkRoles(...roles){
  return (req, res, next) => {
    const usuario = req.user
    if (roles.includes(usuario.rol)){
      next()
    }
    else{
      next(boom.unauthorized())
    }
  }
}

export { checkApiKey, checkRoles }