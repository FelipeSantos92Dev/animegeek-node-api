import { Router } from 'express'
import StoreSellTicketController from '../controllers/tickets/StoreSellTicketController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const ticketSelledRouter = Router()

const ticketSelled = new StoreSellTicketController().handle

const protectedRoutes = new ensureAuthenticated().handle
const adminRole = new ensureAccessByRole().handle

ticketSelledRouter.post('/', protectedRoutes, adminRole, ticketSelled)

export { ticketSelledRouter }
