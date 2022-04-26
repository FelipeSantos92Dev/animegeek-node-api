import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../../config/auth'

interface ResponseData {
  user: {
    email: string
  }
  token: string
}

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      return response.status(403).json({ message: 'Email ou senha inválido!' })
    } else {
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        return response
          .status(403)
          .json({ message: 'Email ou senha inválido!' })
      }

      const { secret, expiresIn } = authConfig.jwt

      const token = sign({}, secret, {
        subject: user.id,
        expiresIn
      })
      const tokenReturn: ResponseData = {
        token,
        user: {
          email
        }
      }

      response.status(200).json({ tokenReturn })
    }
  }
}
