import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { prismaClient } from '../database/prismaClient'
import authConfig from '../config/auth'

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
      // throw new Error('Token inexistente!')
      response.status(403).json({ message: 'Token inexistente!' })
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
          // throw new Error('Usuário inexistente!')
          response.status(404).json({ message: 'Usuário inexistente!' })
        }

        next()
      } catch {
        // throw new Error('Token inválido!')
        response.status(401).json({ message: 'Token inválido!' })
      }
    }
  }
}
