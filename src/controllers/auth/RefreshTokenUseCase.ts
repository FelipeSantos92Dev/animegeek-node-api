import dayjs from 'dayjs'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'
import GenerateToken from './GenerateToken'
import GenerateRefreshToken from './GenerateRefreshToken'

interface ResponseData {
  user: {
    email: string
    name?: string | null
    role?: string | null
  }
  token: string
}

export default class RefreshTokenUseCase {
  async execute(refreshToken: string) {
    const oldToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    })

    if (!oldToken) {
      throw new AppError('Token inválido!', 401)
    } else {
      const user = await prismaClient.user.findFirst({
        where: {
          id: oldToken.userId
        },
        include: {
          profile: true
        }
      })

      if (!user) {
        throw new AppError('Email ou senha inválido!', 403)
      } else {
        const generateToken = new GenerateToken()
        const token = await generateToken.execute(oldToken.userId)

        const tokenReturn: ResponseData = {
          token,
          user: {
            email: user.email,
            name: user.profile.name,
            role: user.roleName
          }
        }

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
          const newRefreshToken = await generateRefreshToken.execute(
            oldToken.userId
          )

          return { tokenReturn, newRefreshToken }
        }

        return { tokenReturn }
      }
    }
  }
}
