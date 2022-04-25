import { Router } from 'express'

const categoriesRoutes = Router()

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body
})

export { categoriesRoutes }
