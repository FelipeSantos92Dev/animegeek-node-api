import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class GetTicketByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const tickets = await prismaClient.ticket.findMany({
      where: {
        OR: [
          {
            userId: id,
            type: 'online'
          },
          {
            userId: id,
            type: 'store'
          },
          {
            userId: id,
            type: 'cortesia'
          }
        ]
      },
      // where: {
      //   userId: id,
      //   type: 'online'
      // },
      orderBy: {
        created_at: 'desc'
      }
    })

    return response.status(200).json({ tickets })
  }
}
