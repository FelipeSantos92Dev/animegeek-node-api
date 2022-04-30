import { Request, Response, NextFunction } from 'express'
import { prismaClient } from '../database/prismaClient'
import AppError from '../errors/AppError'

export default class ensureAccessByRole {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (user?.roleName !== 'Administrador') {
      throw new AppError('Usuário sem permissões de acesso!', 401)
    } else {
      next()
    }
  }
}
