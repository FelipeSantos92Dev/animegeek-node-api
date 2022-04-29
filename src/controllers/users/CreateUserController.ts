import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { hash } from 'bcryptjs'

export default class CreateUserController {
  async handle(request: Request, response: Response) {
    const { user } = request.body

    const encryptedPassword = await hash(user.password, 8)

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: user.email
      }
    })

    if (userAlreadyExists) {
      response.status(403).json({ message: 'Usuário já existente!' })
    } else {
      try {
        await prismaClient.user.create({
          data: {
            email: user.email,
            password: encryptedPassword,
            role: {
              connectOrCreate: {
                where: {
                  name: 'Geek'
                },
                create: {
                  name: 'Geek',
                  description: 'Usuário padrão'
                }
              }
            },
            profile: {
              create: {
                name: user.name
              }
            }
          }
        })
        response.status(201).json({ message: 'Usuário(a) cadastrado(a)!' })
      } catch (error) {
        response.status(400).json({ message: error.message })
      }
    }
  }
}
