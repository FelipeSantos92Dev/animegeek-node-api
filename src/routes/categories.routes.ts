import { Router } from 'express'
import CreateCategoryController from '../controllers/categories/CreateCategoryController'
import ListAllCategoriesController from '../controllers/categories/ListAllCategoriesController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const categoriesRouter = Router()

categoriesRouter.use(new ensureAuthenticated().handle)
categoriesRouter.use(new ensureAccessByRole().handle)

const createCategory = new CreateCategoryController().handle
const listCategories = new ListAllCategoriesController().handle

categoriesRouter.post('/', createCategory)
categoriesRouter.get('/', listCategories)

export { categoriesRouter }
