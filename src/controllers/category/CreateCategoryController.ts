import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name
      }
    })

    if (categoryAlreadyExists) {
      response.status(200).json({ message: 'Categoria já existente!' })
    } else {
      try {
        const category = await prismaClient.category.create({
          data: {
            name,
            description
          }
        })
        response
          .status(201)
          .json({ message: `Categoria ${category.name} criada!` })
      } catch (error) {
        response.status(200).json({ message: error.message })
      }
    }
  }
}