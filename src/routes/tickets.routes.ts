import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import GetTicketByUserController from '../controllers/tickets/GetTicketByUserController'
import GetTicketsByCartController from '../controllers/tickets/GetTicketsByCartController'
import SellerTickets from '../controllers/tickets/SellerTickets'

const ticketsRouter = Router()
const getTickets = new GetTicketByUserController().handle
const getTicketsCart = new GetTicketsByCartController().handle
const sellTicket = new SellerTickets().handle

ticketsRouter.use(new ensureAuthenticated().handle)

ticketsRouter.get('/', getTickets)
ticketsRouter.get('/:id', getTicketsCart)
ticketsRouter.post('/', sellTicket)

export { ticketsRouter }
