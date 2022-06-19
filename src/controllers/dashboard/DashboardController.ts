import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DashboardController {
  async handle(request: Request, response: Response) {
    const totalCombo = await prismaClient.ticket.count({
      where: {
        category_id: '72970a23-06a3-4778-aead-b75a4f38fd4a',
        status: 'approved',
        type: 'online'
      }
    })

    const totalSab = await prismaClient.ticket.count({
      where: {
        category_id: 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64',
        status: 'approved',
        type: 'online'
      }
    })

    const totalDom = await prismaClient.ticket.count({
      where: {
        category_id: 'd8356f00-c334-4a75-92d2-503e90e3d6ba',
        status: 'approved',
        type: 'online'
      }
    })

    return response.json({
      totalSab,
      totalDom,
      totalCombo
    })
  }
}
