import { Router } from 'express'
import CreateTransactionController from '../controllers/transactions/CreateTransactionController'
import PostbackController from '../controllers/transactions/PostbackController'

const transactionsRouter = Router()

const createTransaction = new CreateTransactionController().handle
const postback = new PostbackController().handle

transactionsRouter.post('/', createTransaction)
transactionsRouter.post('/postbacks/pagarme', postback)

export { transactionsRouter }
