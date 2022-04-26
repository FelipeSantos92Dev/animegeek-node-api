import { Router } from 'express'
import AuthenticateUserController from '../controllers/auth/AuthenticateUserController'

const authenticateRouter = Router()

const authUser = new AuthenticateUserController()

authenticateRouter.post('/auth', authUser.handle)

export { authenticateRouter }
