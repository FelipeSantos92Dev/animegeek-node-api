import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class ListAllCartsController {
  async handle(request: Request, response: Response) {
    const carts = await prismaClient.cart.findMany({
      orderBy: {
        created_at: 'asc'
      }
    })

    return response.status(200).json(carts)
  }
}
