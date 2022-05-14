import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import GetTicketByUserController from '../controllers/tickets/GetTicketByUserController'

const ticketsRouter = Router()
const getTickets = new GetTicketByUserController().handle

ticketsRouter.use(new ensureAuthenticated().handle)

ticketsRouter.get('/', getTickets)

export { ticketsRouter }
