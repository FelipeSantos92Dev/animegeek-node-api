import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    await prismaClient.user.delete({
      where: { id }
    })

    return response.status(200).send(null)
  }
}
