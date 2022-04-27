import { Router } from 'express'
import CreateUserController from '../controllers/users/CreateUserController'
import ListAllUsersController from '../controllers/users/ListAllUsersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const usersRouter = Router()

const createUser = new CreateUserController()
const listUsers = new ListAllUsersController()
const protectedRoutes = new ensureAuthenticated()
const adminRole = new ensureAccessByRole()

usersRouter.post('/', createUser.handle)
usersRouter.get('/', protectedRoutes.handle, adminRole.handle, listUsers.handle)

export { usersRouter }
