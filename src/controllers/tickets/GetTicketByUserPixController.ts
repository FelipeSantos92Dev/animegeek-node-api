import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class GetTicketByUserPixController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const ticketspix = await prismaClient.ticket.findMany({
      where: {
        userId: id,
        type: 'onlinePix'
      },
      orderBy: {
        category_id: 'asc'
      }
    })

    return response.status(200).json({ ticketspix })
  }
}
