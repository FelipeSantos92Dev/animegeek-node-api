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
        price: totalCost,
        user_id: user.id,
        items: { cartOne, cartTwo, cartThree }
      }
    })

    let countOne = cartOne

    while (countOne > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: '35aeb1ac-edea-4481-841d-8be5dc61a0f7'
        }
      })
      countOne = countOne - 1
    }

    let countTwo = cartTwo

    while (countTwo > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: '8c01e317-6e7b-499c-9555-f103132606c1'
        }
      })
      countTwo = countTwo - 1
    }

    let countThree = cartThree

    while (countThree > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: 'dc575398-c268-4e73-b891-aadba875b861'
        }
      })
      countThree = countThree - 1
    }

    return response.send()
  }
}
