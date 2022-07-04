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
        category_id: 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64',
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
