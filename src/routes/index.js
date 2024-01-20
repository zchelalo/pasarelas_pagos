import express from 'express'
import passport from 'passport'

import { checkRoles } from '../middlewares/auth.handler.js'

import { router as authRouter } from './auth.router.js'
import { router as usuarioRouter } from './usuario.router.js'
import { router as pasarelaRouter } from './pasarela.router.js'
import { router as tiposUsuarioRouter } from './tipos_usuario.router.js'
import { router as keyRouter } from './key.router.js'
import { router as pagoRouter } from './pago.router.js'

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/auth', authRouter)
  router.use('/usuarios', passport.authenticate('jwt', { session: false }), usuarioRouter)
  router.use('/pasarelas', passport.authenticate('jwt', { session: false }), pasarelaRouter)
  router.use('/tipos-usuarios', passport.authenticate('jwt', { session: false }), tiposUsuarioRouter)
  router.use('/keys', passport.authenticate('jwt', { session: false }), keyRouter)
  router.use('/pagos', passport.authenticate('jwt', { session: false }), pagoRouter)
}

export { routerApi }