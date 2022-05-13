import { Router } from 'express'
import GetUserController from '../controllers/users/GetUserController'
import UpdateUserController from '../controllers/users/UpdateUserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router()

const getUser = new GetUserController().handle
const updateUser = new UpdateUserController().handle

userRouter.use(new ensureAuthenticated().handle)

userRouter.get('/', getUser)
userRouter.put('/', updateUser)

export { userRouter }
