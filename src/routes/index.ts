import { Router } from 'express'

import { authenticateRouter } from './authenticate.routes'
import { userRouter } from './user.routes'
import { usersRouter } from './users.routes'
import { categoriesRouter } from './categories.routes'

const router = Router()

router.use(authenticateRouter)
router.use('/user', userRouter)
router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)

export { router }
