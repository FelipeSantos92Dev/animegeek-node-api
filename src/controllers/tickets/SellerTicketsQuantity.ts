import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class SellerTicketsQuantity {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    // console.log(id)

    const tickets = await prismaClient.ticket.count({
      where: {
        userId: id
      }
    })

    const selledTickets = await prismaClient.ticket.findMany({
      where: {
        OR: [
          {
            userId: id,
            selled: 1
          },
          {
            userId: id,
            selled: 2
          }
        ]
      },
      orderBy: {
        created_at: 'asc'
      }
    })

    return response.send({ tickets, selledTickets })
  }
}
