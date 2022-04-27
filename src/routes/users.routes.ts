import { Router } from 'express'
import CreateUserController from '../controllers/users/CreateUserController'
import ListAllUsersController from '../controllers/users/ListAllUsersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const createUser = new CreateUserController()
const listUsers = new ListAllUsersController()

usersRouter.post('/', createUser.handle)
usersRouter.get('/', new ensureAuthenticated().handle, listUsers.handle)

export { usersRouter }
