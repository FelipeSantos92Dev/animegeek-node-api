import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class SellerTickets {
  async handle(request: Request, response: Response) {
    const { uuid, geekName, geekEmail, type, validations } = request.body.ticket
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    await prismaClient.ticket.create({
      data: {
        id: uuid,
        category_id: 'd8356f00-c334-4a75-92d2-503e90e3d6ba',
        geekName,
        geekEmail,
        status: 'Approved',
        validations,
        type,
        userId: id
      }
    })

    return response.status(200).json('Ingresso gerado!')
  }
}
