import { Router } from 'express'
import CreateUserController from '../controllers/users/CreateUserController'
import GetUserControllerByAdmin from '../controllers/users/GetUserControllerByAdmin'
import DeleteUserController from '../controllers/users/DeleteUserController'
import ListAllUsersController from '../controllers/users/ListAllUsersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const usersRouter = Router()

const createUser = new CreateUserController().handle
const listUsers = new ListAllUsersController().handle
const getUser = new GetUserControllerByAdmin().handle
const deleteUser = new DeleteUserController().handle

const protectedRoutes = new ensureAuthenticated().handle
const adminRole = new ensureAccessByRole().handle

usersRouter.post('/', createUser)
usersRouter.get('/', protectedRoutes, adminRole, listUsers)
usersRouter.get('/:id', protectedRoutes, adminRole, getUser)
usersRouter.delete('/:id', protectedRoutes, deleteUser)

export { usersRouter }
