import { compare, hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class UpdateUserPassword {
  async handle(request: Request, response: Response) {
    const { password, newPassword } = request.body.user
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não enconrado!', 404)
    } else {
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        throw new AppError('Credenciais inválidas!', 401)
      }
      const encryptedPassword = await hash(newPassword, 8)

      await prismaClient.user.update({
        where: {
          id
        },
        data: {
          password: encryptedPassword
        }
      })
    }

    return response.json(user)
  }
}
