import { Router } from 'express'
import { CreateUserController } from '../controllers/users/CreateUserController'

const usersRoutes = Router()

const createUser = new CreateUserController()

usersRoutes.post('/', createUser.handle)

export { usersRoutes }
