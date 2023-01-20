import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class CreateCartController {
  async handle(request: Request, response: Response) {
    const { cartOne, cartTwo, cartThree, cartFour, cartFive, totalCost } =
      request.body.cart
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      },
      include: {
        profile: {
          select: {
            name: true
          }
        }
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const cart = await prismaClient.cart.create({
      data: {
        price: totalCost * 100,
        user_id: user.id,
        items: { cartOne, cartTwo, cartThree, cartFour, cartFive }
      }
    })

    let countOne = cartOne

    while (countOne > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: 'a6ba73ae-39c0-441f-a344-0b550d05601b',
          userId: id,
          geekEmail: user.email,
          geekName: user.profile?.name,
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
          category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
          userId: id,
          geekEmail: user.email,
          geekName: user.profile?.name,
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
          category_id: 'a6ba73ae-39c0-441f-a344-0b550d05601b',
          userId: id,
          geekEmail: user.email,
          geekName: user.profile?.name,
          type: 'online'
        }
      })
      countThree = countThree - 1
    }

    let countFour = cartFour

    while (countFour > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361',
          userId: id,
          geekEmail: user.email,
          geekName: user.profile?.name,
          type: 'online'
        }
      })
      countFour = countFour - 1
    }

    let countFive = cartFive

    while (countFive > 0) {
      await prismaClient.ticket.create({
        data: {
          cart_id: cart.id,
          category_id: 'c73e9ff7-bb6c-43da-b3b0-6e638374312f',
          userId: id,
          geekEmail: user.email,
          geekName: user.profile?.name,
          type: 'online'
        }
      })
      countFive = countFive - 1
    }

    return response.send()
  }
}
