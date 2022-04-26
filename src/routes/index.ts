import { Router } from 'express'

import { authenticateRouter } from './authenticate.routes'
import { categoriesRouter } from './categories.routes'
import { usersRouter } from './users.routes'

const router = Router()

router.use(authenticateRouter)
router.use('/categories', categoriesRouter)
router.use('/users', usersRouter)

export { router }
