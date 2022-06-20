import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import GetTicketByUserPixController from '../controllers/tickets/GetTicketByUserPixController'
import PixTickets from '../controllers/tickets/PixTickets'

const ticketsPixRouter = Router()

const ticketsPix = new GetTicketByUserPixController().handle
const ticketsPixGenerator = new PixTickets().handle

ticketsPixRouter.use(new ensureAuthenticated().handle)

ticketsPixRouter.get('/', ticketsPix)
ticketsPixRouter.post('/', ticketsPixGenerator)

export { ticketsPixRouter }
