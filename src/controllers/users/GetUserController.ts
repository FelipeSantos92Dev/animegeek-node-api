import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

interface ResponseData {
  user: {
    id: string
    email?: string | null
    name?: string | null
    cellphone?: string | null
    address?: string | null
    number?: string | null
    neighborhood?: string | null
    complement?: string | null
    city?: string | null
    state?: string | null
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
        role: true,
        created_at: true,
        updated_at: true,
        profile: {}
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404)
    }

    const userReturn: ResponseData = {
      user: {
        id,
        email: user.email,
        name: user.profile?.name,
        cellphone: user.profile?.cellphone,
        address: user.profile?.address,
        number: user.profile?.number,
        neighborhood: user.profile?.neighborhood,
        complement: user.profile?.complement,
        city: user.profile?.city,
        state: user.profile?.state,
        role: user.role,
        avatar: user.profile?.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    }

    return response.json(userReturn)
  }
}
