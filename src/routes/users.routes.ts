import { Router } from 'express'
import CreateUserController from '../controllers/users/CreateUserController'
import ListAllUsersController from '../controllers/users/ListAllUsersController'

const usersRouter = Router()

const createUser = new CreateUserController()
const listUsers = new ListAllUsersController()

usersRouter.post('/', createUser.handle)
usersRouter.get('/', listUsers.handle)

export { usersRouter }
