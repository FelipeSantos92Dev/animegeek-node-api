import { Router } from 'express'

import DashboardController from '../controllers/dashboard/DashboardController'

const dashboardRouter = Router()

const dashboard = new DashboardController().handle

dashboardRouter.get('/', dashboard)

export { dashboardRouter }
