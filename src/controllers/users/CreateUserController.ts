import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { hash } from 'bcryptjs'
import AppError from '../../errors/AppError'
import WelcomeEmailSender from '../../services/WelcomeEmailSender'

export default class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name, role } = request.body.user

    const userRole = role ? role : 'Geek'

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
            role: userRole,
            profile: {
              create: {
                name
              }
            }
          }
        })

        //const content = 'Bem vindo(a) à Plataforma AnimeGeek!'
        //WelcomeEmailSender(name, email, content)
        response.status(201).json({ message: 'Usuário(a) cadastrado(a)!' })
      } catch (error) {
        throw new AppError(error.message, 400)
      }
    }
  }
}
