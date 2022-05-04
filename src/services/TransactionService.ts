import { prismaClient } from '../database/prismaClient'
import AppError from '../errors/AppError'
import PagarMeProvider from '../providers/PagarMeProvider'

type TransactionData = {
  cart_code: string
  payment_type: string
  installments: number
  customer_name: string
  customer_email: string
  customer_mobile: string
  customer_document: string
  billing_address: string
  billing_number: string
  billing_neighborhood: string
  billing_city: string
  billing_state: string
  billing_zip_code: string
  credit_card_number: string
  credit_card_expiration: string
  credit_card_holder_name: string
  credit_card_cvv: number
}

export default class TransactionService {
  private paymentProvider

  constructor(paymentProvider: any) {
    this.paymentProvider = paymentProvider || new PagarMeProvider()
  }

  async execute({
    cart_code,
    payment_type,
    installments,
    customer_name,
    customer_email,
    customer_mobile,
    customer_document,
    billing_address,
    billing_number,
    billing_neighborhood,
    billing_city,
    billing_state,
    billing_zip_code,
    credit_card_number,
    credit_card_expiration,
    credit_card_holder_name,
    credit_card_cvv
  }: TransactionData) {
    const cart = await prismaClient.cart.findFirst({
      where: {
        id: cart_code
      }
    })

    if (!cart) {
      throw new AppError('Carrinho não encontrado', 404)
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        cart_code: cart.id,
        total: cart.price,
        payment_type,
        installments,
        customer_name,
        customer_email,
        customer_mobile,
        customer_document,
        billing_address,
        billing_number,
        billing_neighborhood,
        billing_city,
        billing_state,
        billing_zip_code,
        status: 'started'
      }
    })

    this.paymentProvider.execute({
      code: transaction.code,
      payment_type,
      total: transaction.total,
      installments,
      customer_name,
      customer_email,
      customer_mobile,
      customer_document,
      billing_address,
      billing_number,
      billing_neighborhood,
      billing_city,
      billing_state,
      billing_zip_code,
      credit_card_number,
      credit_card_expiration,
      credit_card_holder_name,
      credit_card_cvv
    })

    return transaction
  }
}
