import { Request, Response, NextFunction } from 'express'
import { prismaClient } from '../database/prismaClient'

export default class ensureAccessByRole {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (user?.roleName !== 'Administrador') {
      response
        .status(401)
        .json({ message: 'Usuário sem permissões de acesso!' })
    } else {
      next()
    }
  }
}
