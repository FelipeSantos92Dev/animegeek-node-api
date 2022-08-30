import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DashboardController {
  async handle(request: Request, response: Response) {
    const totalSabCredit = await prismaClient.ticket.count({
      where: {
        category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
        status: 'approved',
        type: 'online'
      }
    })

    const totalDomCredit = await prismaClient.ticket.count({
      where: {
        category_id: '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361',
        status: 'approved',
        type: 'online'
      }
    })

    const totalComboCredit = await prismaClient.ticket.count({
      where: {
        category_id: 'c73e9ff7-bb6c-43da-b3b0-6e638374312f',
        status: 'approved',
        type: 'online'
      }
    })

    const totalSabPix = await prismaClient.ticket.count({
      where: {
        category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalDomPix = await prismaClient.ticket.count({
      where: {
        category_id: '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalComboPix = await prismaClient.ticket.count({
      where: {
        category_id: 'c73e9ff7-bb6c-43da-b3b0-6e638374312f',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalPresentSingle = await prismaClient.ticket.count({
      where: {
        validations: 1
      }
    })

    const totalPresentCombo = await prismaClient.ticket.count({
      where: {
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
