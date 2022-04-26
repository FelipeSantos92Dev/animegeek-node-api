import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { hash } from 'bcryptjs'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const encryptedPassword = await hash(password, 8)

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      response.status(403).json({ message: 'Usuário já existente!' })
    } else {
      try {
        await prismaClient.user.create({
          data: {
            email,
            password: encryptedPassword
          }
        })
        response.status(201).json({ message: 'Usuário(a) cadastrado(a)!' })
      } catch (error) {
        response.status(400).json({ message: error.message })
      }
    }
  }
}
