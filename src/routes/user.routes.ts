import { Router } from 'express'
import GetUserController from '../controllers/users/GetUserController'
import UpdateUserController from '../controllers/users/UpdateUserController'
import UpdateUserPassword from '../controllers/users/UpdateUserPassword'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router()

const getUser = new GetUserController().handle
const updateUser = new UpdateUserController().handle
const updatePassword = new UpdateUserPassword().handle

userRouter.use(new ensureAuthenticated().handle)

userRouter.get('/', getUser)
userRouter.put('/', updateUser)
userRouter.post('/userpassword', updatePassword)

export { userRouter }
