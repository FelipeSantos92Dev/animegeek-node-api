import { Router } from 'express'
import { CreateCategoryController } from '../controllers/category/CreateCategoryController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const categoriesRoutes = Router()

categoriesRoutes.use(new ensureAuthenticated().handle)

const createCategory = new CreateCategoryController()

categoriesRoutes.post('/', createCategory.handle)

export { categoriesRoutes }
