import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class ListAllUsersController {
  async handle(request: Request, response: Response) {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true
      },
      orderBy: {
        updated_at: 'desc'
      }
    })

    return response.json(users)
  }
}
