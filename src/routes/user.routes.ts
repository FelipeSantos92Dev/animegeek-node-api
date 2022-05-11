import { Router } from 'express'
import GetUserController from '../controllers/users/GetUserController'
import UpdateUserController from '../controllers/users/UpdateUserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router()

const getUser = new GetUserController().handle
const updateUser = new UpdateUserController().handle

const protectedRoutes = new ensureAuthenticated().handle

userRouter.get('/', protectedRoutes, getUser)
userRouter.put('/', protectedRoutes, updateUser)

export { userRouter }
