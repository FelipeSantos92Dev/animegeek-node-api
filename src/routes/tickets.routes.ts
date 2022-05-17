import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import GetTicketByUserController from '../controllers/tickets/GetTicketByUserController'
import GetTicketsByCartController from '../controllers/tickets/GetTicketsByCartController'

const ticketsRouter = Router()
const getTickets = new GetTicketByUserController().handle
const getTicketsCart = new GetTicketsByCartController().handle

ticketsRouter.use(new ensureAuthenticated().handle)

ticketsRouter.get('/', getTickets)
ticketsRouter.get('/:id', getTicketsCart)

export { ticketsRouter }
