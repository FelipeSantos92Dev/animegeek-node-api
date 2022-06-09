import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import GetTicketByUserController from '../controllers/tickets/GetTicketByUserController'
import GetTicketsByCartController from '../controllers/tickets/GetTicketsByCartController'
import SellerTickets from '../controllers/tickets/SellerTickets'
import SellerTicketsQuantity from '../controllers/tickets/SellerTicketsQuantity'

const ticketsRouter = Router()
const getTickets = new GetTicketByUserController().handle
const getTicketsCart = new GetTicketsByCartController().handle
const sellTicket = new SellerTickets().handle
const quantityTickets = new SellerTicketsQuantity().handle

ticketsRouter.use(new ensureAuthenticated().handle)

ticketsRouter.get('/', getTickets)
ticketsRouter.get('/:id', getTicketsCart)
ticketsRouter.post('/', sellTicket)
ticketsRouter.get('/quantity', quantityTickets)

export { ticketsRouter }
