import { Router } from 'express'
import GetTicketsAdminController from '../controllers/tickets/GetTicketsAdminController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const adminTicketsRouter = Router()

const listTicketsAdmin = new GetTicketsAdminController().handle

const protectedRoutes = new ensureAuthenticated().handle
const adminRole = new ensureAccessByRole().handle

adminTicketsRouter.get('/', protectedRoutes, adminRole, listTicketsAdmin)

export { adminTicketsRouter }
