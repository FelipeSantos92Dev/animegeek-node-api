import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateTransactionController from '../controllers/transactions/CreateTransactionController'
import PostbackController from '../controllers/transactions/PostbackController'
import TransactionPixController from '../controllers/transactions/TransactionPixController'

const transactionsRouter = Router()
const postback = new PostbackController().handle
const createTransaction = new CreateTransactionController().handle
const pixTransaction = new TransactionPixController().handle

transactionsRouter.post('/postbacks/pagarme', postback)

transactionsRouter.use(new ensureAuthenticated().handle)

transactionsRouter.post('/', createTransaction)
transactionsRouter.post('/pix', pixTransaction)

export { transactionsRouter }
