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

    if (ticket.category_id === 'a6ba73ae-39c0-441f-a344-0b550d05601b') {
      if (ticket.validations > 0) {
        return response.status(200).json({
          message: 'Ingresso Vendido Para Sábado Estudante Já Autenticado!'
        })
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
          .json({ message: 'Ingresso Vendido Para Sábado Estudante!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Sábado!' })
      }
    }

    if (ticket.category_id === '1b7045c6-5216-4334-87b8-e7d4cd3b519a') {
      if (ticket.validations > 0) {
        return response.status(200).json({
          message: 'Ingresso Vendido Para Sábado Social Já Autenticado!'
        })
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
          .json({ message: 'Ingresso Vendido Para Sábado Social!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Sábado!' })
      }
    }

    if (ticket.category_id === '22f505c7-6fae-47fc-9325-8efc9f94c3a0') {
      if (ticket.validations > 0) {
        return response.status(200).json({
          message: 'Ingresso Vendido Para Domingo Estudante Já Autenticado!'
        })
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
          .json({ message: 'Ingresso Vendido Para Domingo Estudante!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Domingo!' })
      }
    }

    if (ticket.category_id === '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361') {
      if (ticket.validations > 0) {
        return response.status(200).json({
          message: 'Ingresso Vendido Para Domingo Social Já Autenticado!'
        })
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
          .json({ message: 'Ingresso Vendido Para Domingo Social!' })
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

    if (ticket.category_id === 'e0c908a2-2635-4d89-8d92-4cd1e99b8016') {
      if (ticket.validations > 0) {
        return response.status(200).json({
          message: 'Ingresso Cortesia Sábado Já Autenticado!'
        })
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
          .json({ message: 'Ingresso Cortesia Sábado Liberado' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Domingo!' })
      }
    }

    if (ticket.category_id === 'eeb47ea9-4d51-4d12-8634-c4c6f2539b6f') {
      if (ticket.validations > 0) {
        return response.status(200).json({
          message: 'Ingresso Cortesia Domingo Já Autenticado!'
        })
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
          .json({ message: 'Ingresso Cortesia Domingo Liberado' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Válido Para Domingo!' })
      }
    }

    if (ticket.category_id === '73cbc22e-cfd4-493e-a914-dc237f1eb909') {
      if (ticket.validations > 1) {
        return response
          .status(200)
          .json({ message: 'Ingresso Cortesia Combo Já Autenticado!' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Combo Já Utilizado!' })
      } else if (ticket.validations === 0) {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            selled: 1
          }
        })
        return response
          .status(200)
          .json({ message: 'Ingresso Cortesia Combo Liberado' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Combo Válido! Leitura #1' })
      } else if (ticket.validations === 1) {
        await prismaClient.ticket.update({
          where: {
            id: qrcodeId
          },
          data: {
            selled: 2
          }
        })
        return response
          .status(200)
          .json({ message: 'Ingresso Cortesia Combo Liberado' })
        // return response
        //   .status(200)
        //   .json({ message: 'Ingresso Combo Válido! Leitura #2' })
      }
    }

    // return response.status(200).json({ ticket })
  }
}
