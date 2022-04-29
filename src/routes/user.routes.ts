import { Router } from 'express'
import GetUserController from '../controllers/users/GetUserController'
import UpdateUserController from '../controllers/users/UpdateUserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
// import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const userRouter = Router()

const getUser = new GetUserController().handle
const updateUser = new UpdateUserController().handle

const protectedRoutes = new ensureAuthenticated().handle
// const adminRole = new ensureAccessByRole().handle

userRouter.get('/', protectedRoutes, getUser)
userRouter.put('/', protectedRoutes, updateUser)
// usersRouter.get('/', protectedRoutes, adminRole, listUsers)

export { userRouter }
