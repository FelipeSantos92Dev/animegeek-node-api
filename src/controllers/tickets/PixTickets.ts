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
            category_id: '138ab1e5-86c6-480a-b591-d0e03a81e617',
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
            category_id: '044b166d-2172-4478-a86a-c816550deb44',
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
