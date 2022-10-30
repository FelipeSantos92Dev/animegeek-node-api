import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetTicketsByCartController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    console.log(id)

    const tickets = await prismaClient.ticket.findMany({
      where: {
        cart_id: id
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    if (!tickets) {
      throw new AppError('Ingressos não encontrados!', 404)
    }

    return response.status(200).json(tickets)
  }
}
