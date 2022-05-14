import { Router } from 'express'
import GetCartByUserController from '../controllers/carts/GetCartByUserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const cartRouter = Router()

cartRouter.use(new ensureAuthenticated().handle)

const getCart = new GetCartByUserController().handle

cartRouter.get('/', getCart)

export { cartRouter }
