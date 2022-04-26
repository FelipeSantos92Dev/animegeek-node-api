import { Router } from 'express'
import CreateRoleController from '../controllers/roles/CreateRoleController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const rolesRouter = Router()

rolesRouter.use(new ensureAuthenticated().handle)

const createRole = new CreateRoleController()

rolesRouter.post('/', createRole.handle)

export { rolesRouter }
