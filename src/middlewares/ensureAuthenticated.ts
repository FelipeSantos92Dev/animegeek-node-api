import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { prismaClient } from '../database/prismaClient'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface PayloadData {
  sub: string
}

export default class ensureAuthenticated {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError('Token inexistente!', 404)
    } else {
      const [, token] = authHeader.split(' ')

      try {
        const { sub: user_id } = verify(
          token,
          authConfig.jwt.secret
        ) as PayloadData

        const user = await prismaClient.user.findFirst({
          where: {
            id: user_id
          }
        })

        if (!user) {
          throw new AppError('Usuário inexistente!', 404)
        } else {
          request.user = {
            id: user_id
          }

          next()
        }
      } catch {
        throw new AppError('invalid.token', 401)
      }
    }
  }
}
