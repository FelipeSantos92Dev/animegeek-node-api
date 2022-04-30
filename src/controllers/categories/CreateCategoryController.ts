import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name
      }
    })

    if (categoryAlreadyExists) {
      throw new AppError('Categoria já existente!', 401)
    } else {
      await prismaClient.category.create({
        data: {
          name,
          description
        }
      })
      response.status(201).json({ message: 'Categoria criada!' })
    }
  }
}
