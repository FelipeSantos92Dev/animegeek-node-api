import { Router } from 'express'

// import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import GetUserTicketsByAdminController from '../controllers/tickets/GetUserTicketsByAdminController'

const userTicketsRouter = Router()
const getUserTickets = new GetUserTicketsByAdminController().handle

// userTicketsRouter.use(new ensureAuthenticated().handle)

userTicketsRouter.get('/', getUserTickets)

export { userTicketsRouter }
