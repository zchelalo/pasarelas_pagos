import express from 'express'
import passport from 'passport'

import { checkRoles } from '../middlewares/auth.handler.js'

import { router as authRouter } from './auth.router.js'
import { router as usuarioRouter } from './usuario.router.js'
import { router as pasarelaRouter } from './pasarela.router.js'

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/auth', authRouter)
  router.use('/usuarios', passport.authenticate('jwt', { session: false }), usuarioRouter)
  router.use('/pasarelas', passport.authenticate('jwt', { session: false }), pasarelaRouter)
}

export { routerApi }