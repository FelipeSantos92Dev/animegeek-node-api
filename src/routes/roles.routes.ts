import { Router } from 'express'
import CreateRoleController from '../controllers/roles/CreateRoleController'
import ListAllRoles from '../controllers/roles/ListAllRoles'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const rolesRouter = Router()

const createRole = new CreateRoleController().handle
const listRoles = new ListAllRoles().handle

rolesRouter.use(new ensureAuthenticated().handle)
rolesRouter.get('/', listRoles)
rolesRouter.use(new ensureAccessByRole().handle)

rolesRouter.post('/', createRole)

export { rolesRouter }
