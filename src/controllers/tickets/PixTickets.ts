import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class PixTickets {
  async handle(request: Request, response: Response) {
    const { geekName, geekEmail, valid, quantity, status } = request.body.ticket

    const user = await prismaClient.user.findFirst({
      where: {
        email: geekEmail
      },
      select: {
        id: true
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (valid === 'Sábado') {
      let countOne = quantity
      while (countOne > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64',
            geekName,
            geekEmail,
            status,
            type: 'onlinePix',
            userId: user.id
          }
        })
        countOne = countOne - 1
      }

      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Domingo') {
      let countTwo = quantity
      while (countTwo > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: 'd8356f00-c334-4a75-92d2-503e90e3d6ba',
            geekName,
            geekEmail,
            status,
            type: 'onlinePix',
            userId: user.id
          }
        })
        countTwo = countTwo - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }
  }
}
