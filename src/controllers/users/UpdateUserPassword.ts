import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class UpdateUserPassword {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body.user

    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    const encryptedPassword = await hash(password, 8)

    if (!user) {
      throw new AppError('Usuário não enconrado!', 404)
    }

    await prismaClient.user.update({
      where: {
        email
      },
      data: {
        password: encryptedPassword
      }
    })

    return response.json(user)
  }
}
