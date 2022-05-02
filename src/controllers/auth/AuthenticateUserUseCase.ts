import { compare } from 'bcryptjs'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'
import GenerateRefreshToken from './GenerateRefreshToken'
import GenerateToken from './GenerateToken'

interface RequestData {
  email: string
  password: string
}

export default class AuthenticateUserUseCase {
  async execute({ email, password }: RequestData) {
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
      throw new AppError('Credenciais inválidas!', 401)
    } else {
      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        throw new AppError('Credenciais inválidas!', 401)
      }

      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: user.id
        }
      })

      const generateToken = new GenerateToken()
      const token = await generateToken.execute(user.id)

      const generateRefreshToken = new GenerateRefreshToken()
      const refreshToken = await generateRefreshToken.execute(user.id)

      const name = user.profile.name
      const role = user.roleName

      return { token, refreshToken, email, name, role }
    }
  }
}
