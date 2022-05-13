import dayjs from 'dayjs'
import { prismaClient } from '../../database/prismaClient'

export default class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(1, 'day').unix()
    const generateRefreshToken = await prismaClient.refreshToken.create({
      data: {
        user_id: userId,
        expires_in: expiresIn
      }
    })

    return generateRefreshToken.id
  }
}
