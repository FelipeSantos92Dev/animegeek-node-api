import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class CreateCartController {
  async handle(request: Request, response: Response) {
    const { price, quantity } = request.body

    let count = quantity

    while (count > 0) {
      await prismaClient.cart.create({
        data: {
          price: price * 100
        }
      })

      count = count - 1
    }

    return response.json()
  }
}
