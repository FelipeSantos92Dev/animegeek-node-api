import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DashboardController {
  async handle(request: Request, response: Response) {
    const totalComboCredit = await prismaClient.ticket.count({
      where: {
        category_id: '72970a23-06a3-4778-aead-b75a4f38fd4a',
        status: 'approved',
        type: 'online'
      }
    })

    const totalSabCredit = await prismaClient.ticket.count({
      where: {
        category_id: 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64',
        status: 'approved',
        type: 'online'
      }
    })

    const totalDomCredit = await prismaClient.ticket.count({
      where: {
        category_id: 'd8356f00-c334-4a75-92d2-503e90e3d6ba',
        status: 'approved',
        type: 'online'
      }
    })

    const totalComboPix = await prismaClient.ticket.count({
      where: {
        category_id: '72970a23-06a3-4778-aead-b75a4f38fd4a',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalSabPix = await prismaClient.ticket.count({
      where: {
        category_id: 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalDomPix = await prismaClient.ticket.count({
      where: {
        category_id: 'd8356f00-c334-4a75-92d2-503e90e3d6ba',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalPresentSingle = await prismaClient.ticket.count({
      where:{
        validations: 1
      }
    })

    const totalPresentCombo = await prismaClient.ticket.count({
      where:{
        validations: 2
      }
    })

    const totalPresent = totalPresentSingle + totalPresentCombo

    const totalSab = totalSabCredit + totalSabPix
    const totalDom = totalDomCredit + totalDomPix
    const totalCombo = totalComboCredit + totalComboPix

    return response.json({
      totalSab,
      totalDom,
      totalCombo,
      totalPresent
    })
  }
}
