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
          id: oldToken.user_id
        },
        include: {
          profile: {}
        }
      })

      if (!user) {
        throw new AppError('Credenciais inválidas!', 401)
      } else {
        const generateToken = new GenerateToken()
        const token = await generateToken.execute(oldToken.user_id)

        const email = user.email
        const name = user.profile?.name
        const role = user.role

        const refreshTokenExpired = dayjs().isAfter(
          dayjs.unix(oldToken.expires_in)
        )

        if (refreshTokenExpired) {
          await prismaClient.refreshToken.deleteMany({
            where: {
              user_id: oldToken.user_id
            }
          })

          const generateRefreshToken = new GenerateRefreshToken()
          const refreshToken = await generateRefreshToken.execute(
            oldToken.user_id
          )

          const email = user.email
          const name = user.profile?.name
          const role = user.role

          return { token, refreshToken, email, name, role }
        }

        return { token, refreshToken, email, name, role }
      }
    }
  }
}
