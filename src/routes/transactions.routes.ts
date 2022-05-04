import { Router } from 'express'
import CreateTransactionController from '../controllers/transactions/CreateTransactionController'

const transactionsRouter = Router()

const createTransaction = new CreateTransactionController().handle

transactionsRouter.post('/', createTransaction)

export { transactionsRouter }
