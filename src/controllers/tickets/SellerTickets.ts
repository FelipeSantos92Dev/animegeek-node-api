import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class SellerTickets {
  async handle(request: Request, response: Response) {
    const { uuid, geekName, geekEmail, type } = request.body.ticket
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    const quantity = await prismaClient.ticket.count({
      where: {
        userId: id
      }
    })

    if (quantity > 75) {
      return response.send(null)
    }

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    await prismaClient.ticket.create({
      data: {
        id: uuid,
        category_id: '72970a23-06a3-4778-aead-b75a4f38fd4a',
        geekName,
        geekEmail,
        status: 'Approved',
        type,
        userId: id
      }
    })

    return response.status(200).json('Ingresso gerado!')
  }
}
