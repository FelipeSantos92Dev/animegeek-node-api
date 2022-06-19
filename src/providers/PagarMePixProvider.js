import { cpf } from 'cpf-cnpj-validator'
import pagarme from 'pagarme'

class PagarMePixProvider {
  async execute({ transactionCode, total, customer, billing, items }) {
    const pixParams = {
      payment_method: 'pix',
      pix: {
        amount: total,
        expires_in: 360
      }
    }

    let paymentParams = pixParams

    const customerParams = {
      customer: {
        external_id: customer.email,
        name: customer.name,
        email: customer.email,
        type: cpf.isValid(customer.document) ? 'individual' : 'corporation',
        country: 'br',
        phone_numbers: [customer.mobile],
        documents: [
          {
            type: cpf.isValid(customer.document) ? 'cpf' : 'cnpj',
            number: customer.document.replace(/[^?0-9]/g, '')
          }
        ]
      }
    }

    const billingParams = billing?.zipcode
      ? {
          billing: {
            name: 'Billing Address',
            address: {
              country: 'br',
              state: billing.state,
              city: billing.city,
              neighborhood: billing.neighborhood,
              street: billing.address,
              street_number: billing.number,
              zipcode: billing.zipcode.replace(/[^?0-9]/g, '')
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
              unit_price: item?.amount,
              quantity: item?.quantity || 1,
              tangible: false
            }))
          }
        : {
            items: [
              {
                id: '1',
                title: `t-${transactionCode}`,
                unit_price: total,
                quantity: 1,
                tangible: false
              }
            ]
          }

    const metadataParams = {
      metadata: {
        transaction_code: transactionCode
      }
    }

    const transactionParams = {
      async: false,
      postback_url: process.env.PAGARME_WEBHOOK_URL,
      ...paymentParams,
      ...customerParams,
      ...billingParams,
      ...itemsParams,
      ...metadataParams
    }

    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY
    })

    const response = await client.transactions.create(transactionParams)

    return {
      transactionId: response.id,
      status: this.translateStatus(response.status),
      processorResponse: JSON.stringify(response)
    }
  }

  translateStatus(status) {
    const statusMap = {
      processing: 'processing',
      waiting_payment: 'pending',
      authorized: 'pending',
      paid: 'approved',
      refused: 'refused',
      pending_refunded: 'refunded',
      refunded: 'refunded',
      chargeback: 'chargeback',
      with_error: 'with error',
      failed: 'failure'
    }

    return statusMap[status]
  }
}

export default PagarMePixProvider
