import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class ListAllUsersController {
  async handle(request: Request, response: Response) {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        email: true,
        created_at: true,
        updated_at: true,
        role: {
          select: {
            name: true
          }
        },
        profile: {
          select: {
            id: true,
            name: true,
            avatar: true,
            cellphone: true
          }
        }
      },
      orderBy: {
        updated_at: 'desc'
      }
    })

    const usersNumber = users.length

    return response.json({ usersNumber, users })
  }
}
