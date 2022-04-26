import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { prismaClient } from '../database/prismaClient'
import authConfig from '../config/auth'

interface PayloadData {
  sub: string
}

export class ensureAuthenticated {
  async handle(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(403).json({ message: 'Token inexistente!' })
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
          return response.status(400).json({ message: 'Usuário inexistente!' })
        }

        next()
      } catch {
        return response.status(403).json({ message: 'Token inválido!' })
      }
    }

    return response.json()
  }
}
