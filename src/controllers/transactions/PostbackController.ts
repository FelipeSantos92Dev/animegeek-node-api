import { Request, Response } from 'express'

import { prismaClient } from '../../database/prismaClient'
import TransactionService from '../../services/TransactionService'

export default class PostbackController {
  async handle(request: Request, response: Response) {
    const { id, object, current_status } = request.body

    // pagarme.postback.verifySignature(process.env.PAGARME_API_KEY, req.body, 'X-Hub-Signature')

    try {
      if (object === 'transaction') {
        const transaction = await prismaClient.transaction.findFirst({
          where: {
            transactionId: id
          }
        })

        if (!transaction) {
          return response.status(404).json()
        }

        const service = new TransactionService(null)
        await service.updateStatus({
          code: transaction.code,
          providerStatus: current_status
        })
        return response.status(200).json()
      }
    } catch (err) {
      console.log(err)
      return response.status(500).json({ error: 'Internal server error!' })
    }
  }
}
