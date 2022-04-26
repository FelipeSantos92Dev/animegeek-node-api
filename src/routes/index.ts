import { Router } from 'express'

import { categoriesRouter } from './categories.routes'
import { usersRouter } from './users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)

export { router }
