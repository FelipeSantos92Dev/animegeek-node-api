import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const roleAlreadyExists = await prismaClient.role.findFirst({
      where: {
        name
      }
    })

    if (roleAlreadyExists) {
      throw new AppError('Cargo já existente!', 403)
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
