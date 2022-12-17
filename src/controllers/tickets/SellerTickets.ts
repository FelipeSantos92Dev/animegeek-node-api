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
          category_id: '3393b90e-1849-470b-910a-ed3f3581f18e', // Sábado Estudante
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
          category_id: 'c2617c0a-4b9b-4c4e-9ea0-a7d281f3de11', // Sábado Estudante
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
          category_id: 'a6ba73ae-39c0-441f-a344-0b550d05601b', // Sábado Estudante
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
          category_id: '1b7045c6-5216-4334-87b8-e7d4cd3b519a', // Sábado Social
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
          category_id: '3a71bd91-11bb-4a35-97aa-afd5482cb8bd', // Sábado Social
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
