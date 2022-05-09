import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateTransactionController from '../controllers/transactions/CreateTransactionController'
import PostbackController from '../controllers/transactions/PostbackController'

const transactionsRouter = Router()
const postback = new PostbackController().handle
const createTransaction = new CreateTransactionController().handle

transactionsRouter.post('/postbacks/pagarme', postback)

transactionsRouter.use(new ensureAuthenticated().handle)

transactionsRouter.post('/', createTransaction)

export { transactionsRouter }
