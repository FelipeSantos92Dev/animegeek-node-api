import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class ListAllCartsController {
  async handle(request: Request, response: Response) {
    const carts = await prismaClient.cart.findMany({
      orderBy: {
        updated_at: 'desc'
      }
    })

    return response.status(200).json(carts)
  }
}
