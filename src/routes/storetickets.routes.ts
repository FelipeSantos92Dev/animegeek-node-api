import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import SellerTicketsQuantity from '../controllers/tickets/SellerTicketsQuantity'

const storeTicketsRouter = Router()
const getTickets = new SellerTicketsQuantity().handle

storeTicketsRouter.use(new ensureAuthenticated().handle)

storeTicketsRouter.get('/', getTickets)

export { storeTicketsRouter }
