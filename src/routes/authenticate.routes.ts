import { Router } from 'express'
import { AuthenticateUserController } from '../controllers/auth/AuthenticateUserController'

const authenticateRoutes = Router()

const authUser = new AuthenticateUserController()

authenticateRoutes.post('/auth', authUser.handle)

export { authenticateRoutes }
