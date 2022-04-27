import { Router } from 'express'
import CreateUserController from '../controllers/users/CreateUserController'
import ListAllUsersController from '../controllers/users/ListAllUsersController'
import UpdateUserController from '../controllers/users/UpdateUserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const usersRouter = Router()

const createUser = new CreateUserController().handle
const listUsers = new ListAllUsersController().handle
const updateUser = new UpdateUserController().handle

const protectedRoutes = new ensureAuthenticated().handle
const adminRole = new ensureAccessByRole().handle

usersRouter.post('/', createUser)
usersRouter.put('/', protectedRoutes, updateUser)
usersRouter.get('/', protectedRoutes, adminRole, listUsers)

export { usersRouter }
