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
            category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
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
            category_id: '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361',
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
