import { Router } from 'express'
import CreateCategoryController from '../controllers/categories/CreateCategoryController'
import ListAllCategoriesController from '../controllers/categories/ListAllCategoriesController'
import GetCategoryController from '../controllers/categories/GetCategoryController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const categoriesRouter = Router()

const createCategory = new CreateCategoryController().handle
const listCategories = new ListAllCategoriesController().handle
const getCategory = new GetCategoryController().handle

categoriesRouter.use(new ensureAuthenticated().handle)

categoriesRouter.get('/', listCategories)
categoriesRouter.get('/:id', getCategory)

categoriesRouter.use(new ensureAccessByRole().handle)
categoriesRouter.post('/', createCategory)

export { categoriesRouter }
