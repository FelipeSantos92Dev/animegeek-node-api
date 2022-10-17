import { Router } from 'express'
import ResetPasswordController from '../controllers/auth/ResetPasswordController'

const passwordRouter = Router()

const resetPassword = new ResetPasswordController().handle

passwordRouter.post('/', resetPassword)

export { passwordRouter }
