import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetTicketsByCartController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const tickets = await prismaClient.ticket.findMany({
      where: {
        cart_id: id
      }
    })

    if (!tickets) {
      throw new AppError('Ingressos não encontrados!', 404)
    }

    return response.status(200).json(tickets)
  }
}
