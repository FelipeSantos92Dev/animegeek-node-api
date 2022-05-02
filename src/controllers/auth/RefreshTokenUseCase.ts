import dayjs from 'dayjs'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'
import GenerateToken from './GenerateToken'
import GenerateRefreshToken from './GenerateRefreshToken'

export default class RefreshTokenUseCase {
  async execute(refreshToken: string) {
    const oldToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    })

    if (!oldToken) {
      throw new AppError('invalid.token', 401)
    } else {
      const user = await prismaClient.user.findFirst({
        where: {
          id: oldToken.userId
        },
        select: {
          email: true,
          roleName: true,
          profile: true
        }
      })

      if (!user) {
        throw new AppError('Credenciais inválidas!', 401)
      } else {
        const generateToken = new GenerateToken()
        const token = await generateToken.execute(oldToken.userId)

        const email = user.email
        const name = user.profile.name
        const role = user.roleName

        const refreshTokenExpired = dayjs().isAfter(
          dayjs.unix(oldToken.expiresIn)
        )

        if (refreshTokenExpired) {
          await prismaClient.refreshToken.deleteMany({
            where: {
              userId: oldToken.userId
            }
          })

          const generateRefreshToken = new GenerateRefreshToken()
          const refreshToken = await generateRefreshToken.execute(
            oldToken.userId
          )

          const email = user.email
          const name = user.profile.name
          const role = user.roleName

          return { token, refreshToken, email, name, role }
        }

        return { token, refreshToken, email, name, role }
      }
    }
  }
}
