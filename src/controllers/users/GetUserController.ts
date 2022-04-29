import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class GetUserController {
  async handle(request: Request, response: Response) {
    const user = await prismaClient.user.findFirst({
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
      }
    })

    return response.json(user)
  }
}
