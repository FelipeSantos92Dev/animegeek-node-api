import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class GetTicketsAdminController {
  async handle(request: Request, response: Response) {
    const admintickets = await prismaClient.ticket.findMany({
      where: {
        OR: [
          {
            status: 'approved'
          },
          {
            status: 'Approved'
          }
        ]
      },
      include: {
        user: {
          select: {
            profile: {
              select: {
                name: true
              }
            },
            email: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return response.status(200).json({ admintickets })
  }
}
