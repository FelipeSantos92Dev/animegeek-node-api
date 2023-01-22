import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class PixTickets {
  async handle(request: Request, response: Response) {
    const { geekName, geekEmail, valid, quantity, status } = request.body.ticket

    const user = await prismaClient.user.findFirst({
      where: {
        email: geekEmail
      },
      select: {
        id: true
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (valid === 'Sábado Estudante') {
      let countOne = quantity
      while (countOne > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: 'a6ba73ae-39c0-441f-a344-0b550d05601b',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'onlinePix',
            userId: user.id
          }
        })
        countOne = countOne - 1
      }

      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Sábado Social') {
      let countTwo = quantity
      while (countTwo > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'onlinePix',
            userId: user.id
          }
        })
        countTwo = countTwo - 1
      }

      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Domingo Estudante') {
      let countThree = quantity
      while (countThree > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: '22f505c7-6fae-47fc-9325-8efc9f94c3a0',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'onlinePix',
            userId: user.id
          }
        })
        countThree = countThree - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Domingo Social') {
      let countFour = quantity
      while (countFour > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'onlinePix',
            userId: user.id
          }
        })
        countFour = countFour - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Combo') {
      let countFive = quantity
      while (countFive > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: 'c73e9ff7-bb6c-43da-b3b0-6e638374312f',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'onlinePix',
            userId: user.id
          }
        })
        countFive = countFive - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Cortesia Combo') {
      let countSix = quantity
      while (countSix > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: '73cbc22e-cfd4-493e-a914-dc237f1eb909',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'cortesia',
            userId: user.id
          }
        })
        countSix = countSix - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Cortesia Sábado') {
      let countSeven = quantity
      while (countSeven > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: 'e0c908a2-2635-4d89-8d92-4cd1e99b8016',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'cortesia',
            userId: user.id
          }
        })
        countSeven = countSeven - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Cortesia Domingo') {
      let countEight = quantity
      while (countEight > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: 'eeb47ea9-4d51-4d12-8634-c4c6f2539b6f',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'cortesia',
            userId: user.id
          }
        })
        countEight = countEight - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }

    if (valid === 'Carna') {
      let countNine = quantity
      while (countNine > 0) {
        await prismaClient.ticket.create({
          data: {
            category_id: '89f0f8da-bc89-441a-b51e-32ffd092a3cb',
            geekName,
            geekEmail,
            status,
            // type: 'store',
            type: 'onlinePix',
            userId: user.id
          }
        })
        countNine = countNine - 1
      }
      return response.status(200).json('Ingresso gerado!')
    }
  }
}
