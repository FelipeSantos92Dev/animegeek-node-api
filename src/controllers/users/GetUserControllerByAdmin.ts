import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetUserControllerByAdmin {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const user = await prismaClient.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
        profile: {}
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404)
    }

    return response.status(200).json(user)
  }
}
