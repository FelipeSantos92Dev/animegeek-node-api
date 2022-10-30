import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'
import ResetEmailSender from '../../services/ResetEmailSender'

export default class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body.restore

    const user = await prismaClient.user.findFirst({
      where: { email },
      include: {
        profile: true
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const userName = user.profile?.name
    const userEmail = user.email
    const newPassword = randomUUID()
    // console.log(newPassword)

    const [splitedPassword] = newPassword.split('-')
    const encryptedPassword = await hash(splitedPassword, 8)

    // console.log(splitedPassword)

    await prismaClient.user.update({
      where: { email },
      data: {
        password: encryptedPassword
      }
    })

    const content = `Senha temporária: ${splitedPassword}`

    ResetEmailSender(userName, userEmail, content)

    console.log(user)

    return response.json({ user })
  }
}
