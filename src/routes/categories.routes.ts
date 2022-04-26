import { Router } from 'express'
import CreateCategoryController from '../controllers/categories/CreateCategoryController'
import ListAllCategoriesController from '../controllers/categories/ListAllCategoriesController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const categoriesRouter = Router()

categoriesRouter.use(new ensureAuthenticated().handle)

const createCategory = new CreateCategoryController()
const listCategories = new ListAllCategoriesController()

categoriesRouter.post('/', createCategory.handle)
categoriesRouter.get('/', listCategories.handle)

export { categoriesRouter }
