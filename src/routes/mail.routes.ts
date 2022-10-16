import { Router } from 'express'
import EmailSender from '../services/EmailSender'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const emailRouter = Router()

emailRouter.use(new ensureAuthenticated().handle)

const email = new EmailSender().handle

emailRouter.post('/', email)

export { emailRouter }
