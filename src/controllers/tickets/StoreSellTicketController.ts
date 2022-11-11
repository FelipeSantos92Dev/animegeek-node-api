import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class StoreSellTicketController {
  async handle(request: Request, response: Response) {
    const { uuid } = request.body.ticket

    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const ticket = await prismaClient.ticket.findFirst({
      where: {
        id: uuid
      }
    })

    if (!ticket) {
      throw new AppError('Ingresso não encontrado', 404)
    }

    if (ticket.selled === 1) {
      throw new AppError('Ingresso já validado', 404)
    }

    await prismaClient.ticket.update({
      where: {
        id: uuid
      },
      data: {
        selled: 1
      }
    })

    return response.status(200).json('Ingresso vendido!')
  }
}
