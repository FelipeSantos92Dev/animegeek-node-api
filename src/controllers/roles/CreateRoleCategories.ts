import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class CreateRoleCategories {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const roleAlreadyExists = await prismaClient.role.findFirst({
      where: {
        name
      }
    })

    if (roleAlreadyExists) {
      response.status(403).json({ message: 'Cargo já existente!' })
    } else {
      await prismaClient.role.create({
        data: {
          name,
          description
        }
      })
      response.status(201).json({ message: 'Cargo criado!' })
    }
  }
}
