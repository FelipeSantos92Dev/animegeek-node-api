import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

interface ResponseData {
  user: {
    id: string
    email?: string | null
    name?: string | null
    role?: string | null
    avatar?: string | null
    created_at?: Date | null
    updated_at?: Date | null
  }
}
export default class GetUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const user = await prismaClient.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        roleName: true,
        profile: {
          select: {
            id: true,
            name: true,
            avatar: true,
            cellphone: true
          }
        },
        created_at: true,
        updated_at: true
      }
    })

    const tokenReturn: ResponseData = {
      user: {
        id,
        email: user?.email,
        name: user?.profile.name,
        role: user?.roleName,
        avatar: user?.profile.avatar,
        created_at: user?.created_at,
        updated_at: user?.updated_at
      }
    }

    return response.json(tokenReturn)
  }
}
