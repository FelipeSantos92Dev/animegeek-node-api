import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class GetTicketByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const tickets = await prismaClient.ticket.findMany({
      where: {
        userId: id
      }
    })

    return response.status(200).json({ tickets })
  }
}
