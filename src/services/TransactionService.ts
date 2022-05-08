/* eslint-disable @typescript-eslint/no-explicit-any */
import { prismaClient } from '../database/prismaClient'
import AppError from '../errors/AppError'
import PagarMeProvider from '../providers/PagarMeProvider'

type CustomerData = {
  name: string
  email: string
  mobile: string
  document: string
}

type BillingData = {
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipcode: string
}

type CreditCardData = {
  number: string
  expiration: string
  holdername: string
  cvv: string
}

type TransactionData = {
  cartCode: string
  paymentType: string
  installments: number
  customer: CustomerData
  billing: BillingData
  creditCard: CreditCardData
}

interface UpdateStatusProps {
  code: string
  providerStatus: string
}

class TransactionService {
  private paymentProvider

  constructor(paymentProvider: any) {
    this.paymentProvider = paymentProvider || new PagarMeProvider()
  }

  async execute({
    cartCode,
    paymentType,
    installments,
    customer,
    billing,
    creditCard
  }: TransactionData) {
    const cart = await prismaClient.cart.findFirst({
      where: {
        code: cartCode
      }
    })

    if (!cart) {
      throw new AppError('Carrinho não encontrado', 404)
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        cartCode: cart.code,
        total: cart.price,
        paymentType,
        installments,
        status: 'started',
        customerName: customer.name,
        customerEmail: customer.email,
        customerMobile: customer.mobile,
        customerDocument: customer.document,
        billingAddress: billing.address,
        billingNumber: billing.number,
        billingNeighborhood: billing.neighborhood,
        billingCity: billing.city,
        billingState: billing.state,
        billingZipCode: billing.zipcode
      }
    })

    const response = await this.paymentProvider.execute({
      transactionCode: transaction.code,
      total: transaction.total,
      paymentType,
      installments,
      customer,
      creditCard,
      billing
    })

    await prismaClient.transaction.update({
      where: {
        id: transaction.id
      },
      data: {
        transactionId: response.transactionId,
        status: response.status,
        processorResponse: response.processorResponse
      }
    })

    return response
  }

  async updateStatus({ code, providerStatus }: UpdateStatusProps) {
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        code
      }
    })

    if (!transaction) {
      throw new Error(`Transaction ${code} not found`)
    }

    const status = this.paymentProvider.translateStatus(providerStatus)

    if (!status) {
      throw new Error('Status is empty!')
    }

    await prismaClient.transaction.update({
      where: {
        id: transaction.id
      },
      data: {
        status
      }
    })
  }
}

export default TransactionService
