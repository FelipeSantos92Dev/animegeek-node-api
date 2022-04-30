import { Router } from 'express'
import AuthenticateUserController from '../controllers/auth/AuthenticateUserController'
import RefreshTokenController from '../controllers/auth/RefreshTokenController'
// import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const authenticateRouter = Router()

const authUser = new AuthenticateUserController().handle
const refresfhToken = new RefreshTokenController().handle

// const protectedRoutes = new ensureAuthenticated().handle

authenticateRouter.post('/auth', authUser)
authenticateRouter.post('/refresh', refresfhToken)

export { authenticateRouter }
