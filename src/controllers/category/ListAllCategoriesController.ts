import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class ListAllCategoriesController {
  async handle(request: Request, response: Response) {
    const categories = await prismaClient.category.findMany({
      orderBy: { updated_at: 'desc' }
    })

    return response.json(categories)
  }
}
