import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DashboardController {
  async handle(request: Request, response: Response) {
    const totalSabCredit = await prismaClient.ticket.count({
      where: {
        category_id: '138ab1e5-86c6-480a-b591-d0e03a81e617',
        status: 'approved',
        type: 'online'
      }
    })

    const totalDomCredit = await prismaClient.ticket.count({
      where: {
        category_id: '044b166d-2172-4478-a86a-c816550deb44',
        status: 'approved',
        type: 'online'
      }
    })

    const totalComboCredit = await prismaClient.ticket.count({
      where: {
        category_id: '4eef78f7-fe15-46f2-90e2-b3dd766d6a27',
        status: 'approved',
        type: 'online'
      }
    })

    const totalSabPix = await prismaClient.ticket.count({
      where: {
        category_id: '138ab1e5-86c6-480a-b591-d0e03a81e617',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalDomPix = await prismaClient.ticket.count({
      where: {
        category_id: '044b166d-2172-4478-a86a-c816550deb44',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalComboPix = await prismaClient.ticket.count({
      where: {
        category_id: '4eef78f7-fe15-46f2-90e2-b3dd766d6a27',
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
