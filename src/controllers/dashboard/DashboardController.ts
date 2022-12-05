import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export default class DashboardController {
  async handle(request: Request, response: Response) {
    const totalSabEstCredit = await prismaClient.ticket.count({
      where: {
        category_id: 'a6ba73ae-39c0-441f-a344-0b550d05601b',
        status: 'approved',
        type: 'online'
      }
    })
    const totalSabSocCredit = await prismaClient.ticket.count({
      where: {
        category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
        status: 'approved',
        type: 'online'
      }
    })

    const totalDomEstCredit = await prismaClient.ticket.count({
      where: {
        category_id: '22f505c7-6fae-47fc-9325-8efc9f94c3a0',
        status: 'approved',
        type: 'online'
      }
    })
    const totalDomSocCredit = await prismaClient.ticket.count({
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

    const totalSabEstPix = await prismaClient.ticket.count({
      where: {
        category_id: 'a6ba73ae-39c0-441f-a344-0b550d05601b',
        status: 'approved',
        type: 'onlinePix'
      }
    })
    const totalSabSocPix = await prismaClient.ticket.count({
      where: {
        category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
        status: 'approved',
        type: 'onlinePix'
      }
    })

    const totalDomEstPix = await prismaClient.ticket.count({
      where: {
        category_id: '22f505c7-6fae-47fc-9325-8efc9f94c3a0',
        status: 'approved',
        type: 'onlinePix'
      }
    })
    const totalDomSocPix = await prismaClient.ticket.count({
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

    const totalCortesiaCombo = await prismaClient.ticket.count({
      where: {
        category_id: '73cbc22e-cfd4-493e-a914-dc237f1eb909',
        status: 'approved',
        type: 'cortesia'
      }
    })

    const totalSortidaoSelled = await prismaClient.ticket.count({
      where: {
        geekEmail: 'sortidao@animegeekoficial.com.br',
        selled: 1
      }
    })

    const totalSmartSelled = await prismaClient.ticket.count({
      where: {
        geekEmail: 'smartgeek@animegeekoficial.com.br',
        selled: 1
      }
    })

    const totalKawaiiSelled = await prismaClient.ticket.count({
      where: {
        geekEmail: 'kawaiiclub@animegeekoficial.com.br',
        selled: 1
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

    const cortesiaSabPresent = await prismaClient.ticket.count({
      where: {
        validations: 1,
        category_id: 'e0c908a2-2635-4d89-8d92-4cd1e99b8016'
      }
    })

    const cortesiaDomPresent = await prismaClient.ticket.count({
      where: {
        validations: 1,
        category_id: 'eeb47ea9-4d51-4d12-8634-c4c6f2539b6f'
      }
    })

    const totalPresent = totalPresentSingle + totalPresentCombo

    const totalSabEst = totalSabEstCredit + totalSabEstPix
    const totalSabSoc = totalSabSocCredit + totalSabSocPix
    const totalDomEst = totalDomEstCredit + totalDomEstPix
    const totalDomSoc = totalDomSocCredit + totalDomSocPix
    const totalCombo = totalComboCredit + totalComboPix

    const totalCredit =
      totalSabEstCredit +
      totalSabSocCredit +
      totalDomEstCredit +
      totalDomSocCredit +
      totalComboCredit

    const totalPix =
      totalSabEstPix +
      totalSabSocPix +
      totalDomEstPix +
      totalDomSocPix +
      totalComboPix

    return response.json({
      totalSabEst,
      totalSabSoc,
      totalDomEst,
      totalDomSoc,
      totalCombo,
      totalCortesiaCombo,
      totalPresent,
      totalSortidaoSelled,
      totalSmartSelled,
      totalKawaiiSelled,
      totalCredit,
      totalPix,
      cortesiaSabPresent,
      cortesiaDomPresent
    })
  }
}
