import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name
      }
    })

    if (categoryAlreadyExists) {
      response.status(401).json({ message: 'Categoria já existente!' })
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
