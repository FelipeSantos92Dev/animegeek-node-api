import { Router } from 'express'
import CreateCartController from '../controllers/carts/CreateCartController'

const cartsRouter = Router()

const createCart = new CreateCartController().handle

cartsRouter.post('/', createCart)

export { cartsRouter }
