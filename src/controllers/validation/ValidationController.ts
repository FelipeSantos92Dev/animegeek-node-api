import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
// import AppError from '../../errors/AppError'

export default class ValidationController {
  async handle(request: Request, response: Response) {
    const { qrcodeId } = request.body.validation
    console.log(qrcodeId)

    const ticket = await prismaClient.ticket.findFirst({
      where: {
        id: qrcodeId
      }
    })

    if (!ticket) {
      return response.status(200).json({ message: 'Ingresso Não Encontrado!' })
    }

    if (ticket.category_id === 'fb6c5dd6-66e6-472f-b484-aac9fe6baf64') {
      if (ticket.validations > 0) {
        return response
          .status(200)
          .json({ message: 'Ingresso Válido Para Sábado Já Utilizado!' })
      } else {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            validations: 1
          }
        })
        return response
          .status(200)
          .json({ message: 'Ingresso Válido Para Sábado!' })
      }
    }

    if (ticket.category_id === 'd8356f00-c334-4a75-92d2-503e90e3d6ba') {
      if (ticket.validations > 0) {
        return response
          .status(200)
          .json({ message: 'Ingresso Válido Para Domingo Já Utilizado!' })
      } else {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            validations: 1
          }
        })
        return response
          .status(200)
          .json({ message: 'Ingresso Válido Para Domingo!' })
      }
    }

    if (ticket.category_id === '72970a23-06a3-4778-aead-b75a4f38fd4a') {
      if (ticket.validations > 1) {
        return response
          .status(200)
          .json({ message: 'Ingresso Combo Já Utilizado!' })
      } else if (ticket.validations === 0) {
          await prismaClient.ticket.update({
            where: {
              id: qrcodeId
            },
            data: {
              validations: 1
            }
          })
          return response.status(200).json({ message: 'Ingresso Combo Válido! Leitura #1' })
      } else if (ticket.validations === 1) {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            validations: 2
          }
        })
        return response.status(200).json({ message: 'Ingresso Combo Válido! Leitura #2' })
      }
    }

    // return response.status(200).json({ ticket })
  }
}
