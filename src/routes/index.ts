import { Router } from 'express'

import { authenticateRouter } from './authenticate.routes'
import { usersRouter } from './users.routes'
import { rolesRouter } from './roles.routes'
import { categoriesRouter } from './categories.routes'

const router = Router()

router.use(authenticateRouter)
router.use('/users', usersRouter)
router.use('/roles', rolesRouter)
router.use('/categories', categoriesRouter)

export { router }
