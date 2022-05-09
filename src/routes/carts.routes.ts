import { Router } from 'express'
import CreateCartController from '../controllers/carts/CreateCartController'
import ListAllCartsController from '../controllers/carts/ListAllCartsController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const cartsRouter = Router()

cartsRouter.use(new ensureAuthenticated().handle)

const createCart = new CreateCartController().handle
const listAllCarts = new ListAllCartsController().handle

cartsRouter.post('/', createCart)
cartsRouter.get('/', listAllCarts)

export { cartsRouter }
