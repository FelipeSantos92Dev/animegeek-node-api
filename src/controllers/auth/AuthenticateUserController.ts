import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

// interface RequestData {
//   email: string
//   password: string
// }

interface ResponseData {
  user: {
    email: string
  }
  token: string
}

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      return response.status(400).json({ message: 'Email ou senha inválido!' })
    } else {
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        return response
          .status(400)
          .json({ message: 'Email ou senha inválido!' })
      }

      const token = sign({}, '2a60281155c038123d02e5cfc8cb338c', {
        subject: user.id,
        expiresIn: '1d'
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
