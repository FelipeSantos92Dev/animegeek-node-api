import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetCartByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const cart = await prismaClient.cart.findFirst({
      where: {
        user_id: id
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    if (!cart) {
      throw new AppError('Carrinho não encontrado!', 404)
    }

    const code = cart.code

    return response.status(200).json(code)
  }
}
