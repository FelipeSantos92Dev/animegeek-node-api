import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class ValidationController {
  async handle(request: Request, response: Response) {
    const { ticketId } = request.body

    const ticket = await prismaClient.ticket.findFirst({
      where: {
        id: ticketId
      }
    })

    if (!ticket) {
      throw new AppError('Ingresso não enconrado!', 404)
    }

    if (ticket.category_id === 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64') {
      return response.status(200).json({ message: 'Ingresso de Sábado!' })
    }

    if (ticket.category_id === 'd8356f00-c334-4a75-92d2-503e90e3d6ba') {
      return response.status(200).json({ message: 'Ingresso de Domingo!' })
    }

    if (ticket.category_id === '72970a23-06a3-4778-aead-b75a4f38fd4a') {
      return response.status(200).json({ message: 'Combo!' })
    }

    // return response.status(200).json({ ticket })
  }
}
