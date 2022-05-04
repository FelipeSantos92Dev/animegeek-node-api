import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { hash } from 'bcryptjs'
import AppError from '../../errors/AppError'

export default class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name, role } = request.body.user

    const encryptedPassword = await hash(password, 8)

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      throw new AppError('Usuário já existente!', 403)
    } else {
      try {
        await prismaClient.user.create({
          data: {
            email,
            password: encryptedPassword,
            role,
            profile: {
              create: {
                name
              }
            }
          }
        })
        response.status(201).json({ message: 'Usuário(a) cadastrado(a)!' })
      } catch (error) {
        throw new AppError(error.message, 400)
      }
    }
  }
}
