import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class SellerTickets {
  async handle(request: Request, response: Response) {
    const { uuid, geekName, geekEmail, type } = request.body.ticket
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    // const cart = await prismaClient.cart.create({
    //   data: {
    //     price: 30 * 100,
    //     user_id: user.id,
    //     items: {}
    //   }
    // })

    await prismaClient.ticket.create({
      data: {
        id: uuid,
        category_id: '3f3437ab-00ac-4a16-9a2f-2b8745b721bb',
        geekName,
        geekEmail,
        status: 'Approved',
        type,
        userId: '05b711dd-3bf3-4cfc-a1f9-6093c12a4542'
      }
    })

    return response.status(200).json('Ingresso gerado!')
  }
}
