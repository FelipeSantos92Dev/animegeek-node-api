import { Router } from 'express'
import CreateRoleController from '../controllers/roles/CreateRoleController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const rolesRouter = Router()

rolesRouter.use(new ensureAuthenticated().handle)
rolesRouter.use(new ensureAccessByRole().handle)

const createRole = new CreateRoleController()

rolesRouter.post('/', createRole.handle)

export { rolesRouter }
