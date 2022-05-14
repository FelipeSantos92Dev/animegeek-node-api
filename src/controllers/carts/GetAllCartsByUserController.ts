import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetAllCartsByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const carts = await prismaClient.cart.findMany({
      where: {
        user_id: id
      }
    })

    if (!carts) {
      throw new AppError('Nenhum carrinho encontrado!', 404)
    }

    return response.status(200).json(carts)
  }
}
