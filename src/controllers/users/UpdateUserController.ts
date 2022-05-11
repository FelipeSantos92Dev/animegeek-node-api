import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const {
      name,
      avatar,
      cellphone,
      address,
      number,
      neighborhood,
      complement,
      city,
      state,
      zipcode
    } = request.body.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não enconrado!', 404)
    }

    await prismaClient.user.update({
      where: {
        id
      },
      data: {
        profile: {
          update: {
            name,
            avatar,
            cellphone,
            address,
            number,
            neighborhood,
            complement,
            city,
            state,
            zipcode
          }
        }
      }
    })

    return response.json(user)
  }
}
