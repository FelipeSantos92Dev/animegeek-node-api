import { Router } from 'express'
import { CreateCategoryController } from '../controllers/category/CreateCategoryController'

const categoriesRoutes = Router()

const createCategory = new CreateCategoryController()

categoriesRoutes.post('/', createCategory.handle)

export { categoriesRoutes }
