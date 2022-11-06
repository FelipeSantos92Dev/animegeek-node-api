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

    if (ticket.category_id === '1b7045c6-5216-4334-87b8-e7d4cd3b519a') {
      if (ticket.validations > 0) {
        return response
          .status(200)
          .json({ message: 'Ingresso Vendido Para Sábado Já Autenticado!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Sábado Já Utilizado!' })
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
          .json({ message: 'Ingresso Vendido Para Sábado!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Sábado!' })
      }
    }

    if (ticket.category_id === '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361') {
      if (ticket.validations > 0) {
        return response
          .status(200)
          .json({ message: 'Ingresso Vendido Para Domingo Já Autenticado!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Domingo Já Utilizado!' })
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
          .json({ message: 'Ingresso Vendido Para Domingo!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Domingo!' })
      }
    }

    if (ticket.category_id === 'c73e9ff7-bb6c-43da-b3b0-6e638374312f') {
      if (ticket.validations > 1) {
        return response
          .status(200)
          .json({ message: 'Ingresso Combo Já Autenticado!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Combo Já Utilizado!' })
      } else if (ticket.validations === 0) {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            validations: 1
          }
        })
        return response.status(200).json({ message: 'Ingresso Combo Vendido' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Combo Válido! Leitura #1' })
      } else if (ticket.validations === 1) {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            validations: 2
          }
        })
        return response.status(200).json({ message: 'Ingresso Combo Vendido' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Combo Válido! Leitura #2' })
      }
    }

    // return response.status(200).json({ ticket })
  }
}
