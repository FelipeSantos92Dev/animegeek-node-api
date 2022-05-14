import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import GetAllCartsByUserController from '../controllers/carts/GetAllCartsByUserController'

const cartsUserRouter = Router()
cartsUserRouter.use(new ensureAuthenticated().handle)

const getAllCarts = new GetAllCartsByUserController().handle

cartsUserRouter.get('/', getAllCarts)

export { cartsUserRouter }
