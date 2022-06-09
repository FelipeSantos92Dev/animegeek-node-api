import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class SellerTicketsQuantity {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    console.log(id)

    const tickets = await prismaClient.ticket.count({
      where: {
        userId: id
      }
    })

    return response.send({ tickets })
  }
}
