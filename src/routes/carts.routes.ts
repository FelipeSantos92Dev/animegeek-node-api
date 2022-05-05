import { Router } from 'express'
import CreateCartController from '../controllers/carts/CreateCartController'
import ListAllCartsController from '../controllers/carts/ListAllCartsController'

const cartsRouter = Router()

const createCart = new CreateCartController().handle
const listAllCarts = new ListAllCartsController().handle

cartsRouter.post('/', createCart)
cartsRouter.get('/', listAllCarts)

export { cartsRouter }
