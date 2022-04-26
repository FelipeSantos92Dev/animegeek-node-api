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
      throw new Error('Categoria já existente!')
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
        throw new Error(error.message)
      }
    }
  }
}
