import { Router } from 'express'
import CreateRoleController from '../controllers/roles/CreateRoleController'
import ListAllRoles from '../controllers/roles/ListAllRoles'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureAccessByRole from '../middlewares/ensureAccessByRole'

const rolesRouter = Router()

rolesRouter.use(new ensureAuthenticated().handle)
rolesRouter.use(new ensureAccessByRole().handle)

const createRole = new CreateRoleController().handle
const listRoles = new ListAllRoles().handle

rolesRouter.post('/', createRole)
rolesRouter.get('/', listRoles)

export { rolesRouter }
