import { cpf } from 'cpf-cnpj-validator'
import pagarme from 'pagarme'
import AppError from '../errors/AppError'

type Item = {
  id: string
  title: string
  amount: number
  quantity: number
}

type TransactionData = {
  code: string
  payment_type: string
  total: number
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
  items: Item[]
}

export default class PagarMeProvider {
  async execute({
    code,
    payment_type,
    total,
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
    credit_card_cvv,
    items
  }: TransactionData) {
    const billetParams = {
      payment_method: 'boleto',
      amount: 795,
      installments: 1
    }

    const creditCardParams = {
      payment_method: 'credit_card',
      amount: 795,
      installments,
      credit_card_holder_name,
      card_number: credit_card_number.replace(/[^?0-9]/g, ''),
      card_expiration_date: credit_card_expiration.replace(/[^?0-9]/g, ''),
      card_cvv: credit_card_cvv,
      capture: true
    }

    let paymentParams

    switch (payment_type) {
      case 'credit_card':
        paymentParams = creditCardParams
        break
      case 'billet':
        paymentParams = billetParams
        break

      default:
        throw new AppError(
          `Tipo de pagamento ${payment_type} não encontrado`,
          400
        )
    }

    const customerParams = {
      customer: {
        external_id: customer_email,
        name: customer_name,
        email: customer_email,
        type: cpf.isValid(customer_document) ? 'individual' : 'corporation',
        country: 'br',
        phone_numbers: [customer_mobile],
        documents: [
          {
            type: cpf.isValid(customer_document) ? 'cpf' : 'cnpj',
            number: customer_document.replace(/[^?0-9]/g, '')
          }
        ]
      }
    }

    const billingParams = billing_zip_code
      ? {
          billing: {
            name: 'Billing Address',
            address: {
              country: 'br',
              state: billing_state,
              city: billing_city,
              neighborhood: billing_neighborhood,
              street: billing_address,
              street_number: billing_number,
              zipcode: billing_zip_code.replace(/[^?0-9]/g, '')
            }
          }
        }
      : {}

    const itemsParams =
      items && items.length > 0
        ? {
            items: items.map((item) => ({
              id: item?.id.toString(),
              title: item?.title,
              unit_price: 256,
              quantity: item?.quantity || 1,
              tangible: false
            }))
          }
        : {
            items: [
              {
                id: '1',
                title: `t-${code}`,
                unit_price: Number((total * 100).toFixed()),
                quantity: 1,
                tangible: false
              }
            ]
          }

    const metadataParams = {
      metadata: {
        transaction_code: code
      }
    }

    const transactionParams = {
      async: false,
      postback_url: 'https://animegeek.vercel.app/tickets',
      ...paymentParams,
      ...customerParams,
      ...billingParams,
      ...itemsParams,
      ...metadataParams
    }
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY
    })
    try {
      const response = await client.transactions.create(null, transactionParams)
      console.debug('response', response)
    } catch (error) {
      console.log({ error })
    }
  }
}
