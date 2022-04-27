import { Router } from 'express'
import AuthenticateUserController from '../controllers/auth/AuthenticateUserController'

const authenticateRouter = Router()

const authUser = new AuthenticateUserController().handle

authenticateRouter.post('/auth', authUser)

export { authenticateRouter }
