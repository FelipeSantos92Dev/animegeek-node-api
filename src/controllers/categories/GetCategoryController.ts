import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetCategoryController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const category = await prismaClient.category.findFirst({
      where: {
        id
      }
    })

    if (!category) {
      throw new AppError('Categoria não encontrada!', 404)
    }

    return response.status(200).json(category)
  }
}
