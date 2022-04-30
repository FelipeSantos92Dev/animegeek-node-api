import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../../config/auth'
import AppError from '../../errors/AppError'

interface ResponseData {
  user: {
    email: string
    name?: string | null
    role?: string | null
  }
  token: string
}

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body
    const user = await prismaClient.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        password: true,
        roleName: true,
        profile: {
          select: {
            name: true
          }
        }
      }
    })

    if (!user) {
      throw new AppError('Email ou senha inválido!', 403)
    } else {
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        throw new AppError('Email ou senha inválido!', 403)
      }

      const { secret, expiresIn } = authConfig.jwt

      const tokenUser = {
        email: user.email,
        name: user.profile.name,
        role: user.roleName
      }

      const token = sign({ tokenUser }, secret, {
        subject: user.id,
        expiresIn
      })
      const tokenReturn: ResponseData = {
        token,
        user: {
          email,
          name: user.profile.name,
          role: user.roleName
        }
      }

      response.status(200).json({ tokenReturn })
    }
  }
}
