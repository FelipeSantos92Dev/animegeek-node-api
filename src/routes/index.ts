import { Router } from 'express'

import { authenticateRouter } from './authenticate.routes'
import { userRouter } from './user.routes'
import { usersRouter } from './users.routes'
import { categoriesRouter } from './categories.routes'
import { transactionsRouter } from './transactions.routes'
import { cartsRouter } from './carts.routes'
import { cartRouter } from './cart.routes'
import { cartsUserRouter } from './cartsuser.routes'
import { ticketsRouter } from './tickets.routes'

const router = Router()

router.use(authenticateRouter)
router.use('/user', userRouter)
router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)
router.use('/transactions', transactionsRouter)
router.use('/carts', cartsRouter)
router.use('/cart', cartRouter)
router.use('/cartsuser', cartsUserRouter)
router.use('/tickets', ticketsRouter)

export { router }
