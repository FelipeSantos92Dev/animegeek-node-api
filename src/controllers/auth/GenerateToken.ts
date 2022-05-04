import { sign } from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GenerateToken {
  async execute(userId: string) {
    const { secret, expiresIn } = authConfig.jwt

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      },
      include: {
        profile: true
      }
    })

    if (!user) {
      throw new AppError('Credenciais inválidas!', 401)
    } else {
      const tokenUser = {
        email: user.email,
        name: user.profile?.name,
        role: user.role
      }

      const token = sign({ tokenUser }, secret, {
        subject: userId,
        expiresIn
      })

      return token
    }
  }
}
