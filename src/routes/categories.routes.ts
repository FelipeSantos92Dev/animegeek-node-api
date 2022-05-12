import { Router } from 'express'
import CreateCategoryController from '../controllers/categories/CreateCategoryController'
import ListAllCategoriesController from '../controllers/categories/ListAllCategoriesController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const categoriesRouter = Router()

const createCategory = new CreateCategoryController().handle
const listCategories = new ListAllCategoriesController().handle

categoriesRouter.use(new ensureAuthenticated().handle)

categoriesRouter.get('/', listCategories)

categoriesRouter.use(new ensureAccessByRole().handle)
categoriesRouter.post('/', createCategory)

export { categoriesRouter }
