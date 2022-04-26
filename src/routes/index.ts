import { Router } from 'express'

// import { authenticateRoutes } from './authenticate.routes'
import { categoriesRouter } from './categories.routes'
import { usersRoutes } from './users.routes'

const router = Router()

// router.use(authenticateRoutes)
router.use('/categories', categoriesRouter)
router.use('/users', usersRoutes)

export { router }
