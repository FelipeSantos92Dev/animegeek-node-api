import { Router } from 'express'
import ValidationController from '../controllers/validation/ValidationController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const validationRouter = Router()

validationRouter.use(new ensureAuthenticated().handle)

const ticketValidation = new ValidationController().handle

validationRouter.get('/', ticketValidation)

export { validationRouter }
