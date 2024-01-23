import boom from '@hapi/boom'
import { KeyService } from '../services/key.service.js'
import bcrypt from 'bcrypt'

const service = new KeyService()

async function checkApiKey(req, res, next){
  const clave = req.headers.clave
  const apikey = req.headers.apikey

  if (clave === undefined || apikey === undefined) next(boom.unauthorized())

  let key = undefined
  try {
    key = await service.findByClaveWithKey(clave)
  } catch (error) {
    next(boom.unauthorized())
  }

  if (key !== undefined) {
    const coincidenKeys = await bcrypt.compare(apikey, key.key)
    
    if (coincidenKeys){
      next()
    }
    else{
      next(boom.unauthorized())
    }
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