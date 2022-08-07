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
          category_id: '138ab1e5-86c6-480a-b591-d0e03a81e617',
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
          category_id: '044b166d-2172-4478-a86a-c816550deb44',
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
          category_id: '4eef78f7-fe15-46f2-90e2-b3dd766d6a27',
          userId: id,
          type: 'online'
        }
      })
      countThree = countThree - 1
    }

    return response.send()
  }
}
