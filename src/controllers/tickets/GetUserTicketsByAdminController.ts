import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class GetUserTicketsByAdminController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    const user = await prismaClient.user.findFirst({
      where: {
        email
      },
      select: {
        id: true
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const tickets = await prismaClient.ticket.findMany({
      where: {
        OR: [
          {
            userId: user.id,
            status: 'approved'
          },
          {
            userId: user.id,
            type: 'Approved'
          }
        ]
      },
      select: {
        id: true,
        category: {
          select: {
            name: true
          }
        }
      },
      // where: {
      //   userId: id,
      //   type: 'online'
      // },
      orderBy: {
        category_id: 'asc'
      }
    })

    return response.status(200).json({ tickets })
  }
}
