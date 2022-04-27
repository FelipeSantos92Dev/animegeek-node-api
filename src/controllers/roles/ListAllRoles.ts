import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class ListAllRoles {
  async handle(request: Request, response: Response) {
    const roles = await prismaClient.role.findMany({
      orderBy: {
        name: 'desc'
      }
    })

    return response.json(roles)
  }
}
