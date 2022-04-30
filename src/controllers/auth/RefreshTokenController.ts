import { prismaClient } from '../../database/prismaClient'
import dayjs from 'dayjs'

export default class RefreshTokenController {
  async handle(userId: string) {
    const expiresIn = dayjs().add(15, 'second').unix()

    const refresfhToken = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })

    return refresfhToken
  }
}
