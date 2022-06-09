import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class CreateCartController {
  async handle(request: Request, response: Response) {
    const { cartOne, cartTwo, cartThree, totalCost } = request.body.cart
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const cart = await prismaClient.cart.create({
      data: {
        price: totalCost * 100,
        user_id: user.id,
        items: { cartOne, cartTwo, cartThree }
      }
    })

    let countOne = cartOne

    while (countOne > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64',
          userId: id,
          type: 'online'
        }
      })
      countOne = countOne - 1
    }

    let countTwo = cartTwo

    while (countTwo > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: 'd8356f00-c334-4a75-92d2-503e90e3d6ba',
          userId: id,
          type: 'online'
        }
      })
      countTwo = countTwo - 1
    }

    let countThree = cartThree

    while (countThree > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: '72970a23-06a3-4778-aead-b75a4f38fd4a',
          userId: id,
          type: 'online'
        }
      })
      countThree = countThree - 1
    }

    return response.send()
  }
}
