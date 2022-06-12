import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DashboardController {
  async handle(request: Request, response: Response) {
    const totalCombo = await prismaClient.ticket.count({
      where: {
        category_id: '72970a23-06a3-4778-aead-b75a4f38fd4a',
        status: 'approved' || 'Approved'
      }
    })

    return response.json(totalCombo)
  }
}
