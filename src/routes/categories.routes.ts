import { Router } from 'express'
import CreateCategoryController from '../controllers/category/CreateCategoryController'
import ListAllCategoriesController from '../controllers/category/ListAllCategoriesController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const categoriesRouter = Router()

categoriesRouter.use(new ensureAuthenticated().handle)

const createCategory = new CreateCategoryController()
const listCategories = new ListAllCategoriesController()

categoriesRouter.post('/', createCategory.handle)
categoriesRouter.get('/', listCategories.handle)

export { categoriesRouter }
