import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name, avatar, cellphone } = request.body

    const encryptedPassword = await hash(password, 8)

    if (email === '' || password === '') {
      response
        .status(403)
        .json({ message: 'Campos obrigatórios não preenchidos!' })
    } else {
      const { id } = request.user

      const user = await prismaClient.user.update({
        where: {
          id
        },
        data: {
          email,
          password: encryptedPassword,
          profile: {
            update: {
              name,
              avatar,
              cellphone
            }
          }
        },
        include: {
          profile: {
            select: {
              name: true,
              cellphone: true
            }
          }
        }
      })

      return response.json(user)
    }
  }
}
