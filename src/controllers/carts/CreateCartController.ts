import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class CreateCartController {
  async handle(request: Request, response: Response) {
    const { price } = request.body

    await prismaClient.cart.create({
      data: {
        price: price * 100
      }
    })

    return response.json()
  }
}
