import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import AppError from '../../errors/AppError'

export default class SellerTickets {
  async handle(request: Request, response: Response) {
    const { uuid, geekName, geekEmail, type, validations, status, cost } =
      request.body.ticket
    console.log(cost)

    const { id } = request.user

    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if (type === 'laser') {
      await prismaClient.ticket.create({
        data: {
          id: uuid,
          category_id: '19a6d4bf-7ddb-4c7d-94a6-fbf3923d6ee7', // Sábado Estudante
          geekName: 'LaserTag',
          geekEmail,
          validations,
          type,
          status,
          userId: id
        }
      })
      return response.status(200).json('Ticket Game gerado!')
    }

    if (type === 'saber') {
      await prismaClient.ticket.create({
        data: {
          id: uuid,
          category_id: '8e76ca6c-0d9f-4f37-a1c7-1225ffd6bfbc', // Sábado Estudante
          geekName: 'BeatSaber',
          geekEmail,
          validations,
          type,
          status,
          userId: id
        }
      })
      return response.status(200).json('Ticket Game gerado!')
    }

    if (cost === 'estudante') {
      await prismaClient.ticket.create({
        data: {
          id: uuid,
          category_id: '22f505c7-6fae-47fc-9325-8efc9f94c3a0', // Domingo Estudante
          geekName,
          geekEmail,
          validations,
          type,
          status,
          userId: id
        }
      })
      return response.status(200).json('Ingresso gerado!')
    }

    if (cost === 'social') {
      await prismaClient.ticket.create({
        data: {
          id: uuid,
          category_id: '0be4c521-f8eb-4e13-ae61-5bd8b1bb4361', // Domingo Social
          geekName,
          geekEmail,
          validations,
          type,
          status,
          userId: id
        }
      })
      return response.status(200).json('Ingresso gerado!')
    }

    if (cost === 'inteira') {
      await prismaClient.ticket.create({
        data: {
          id: uuid,
          category_id: '7490cc3c-c198-4f32-88a3-21e2661b6c0f', // Sábado Social
          geekName,
          geekEmail,
          validations,
          type,
          status,
          userId: id
        }
      })
      return response.status(200).json('Ingresso gerado!')
    }

    if (cost === 'carna') {
      await prismaClient.ticket.create({
        data: {
          id: uuid,
          category_id: '89f0f8da-bc89-441a-b51e-32ffd092a3cb', // Sábado Social
          geekName,
          geekEmail,
          validations,
          type,
          status,
          userId: id
        }
      })
      return response.status(200).json('Ingresso gerado!')
    }

    await prismaClient.ticket.create({
      data: {
        id: uuid,
        category_id: 'c73e9ff7-bb6c-43da-b3b0-6e638374312f', // Combo
        geekName,
        geekEmail,
        status: 'Approved',
        validations,
        type,
        userId: id
      }
    })

    return response.status(200).json('Ingresso gerado!')
  }
}
