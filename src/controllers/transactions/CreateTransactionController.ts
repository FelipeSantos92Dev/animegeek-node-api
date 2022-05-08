/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Yup from 'yup'
import parsePhoneNumber from 'libphonenumber-js'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { Request, Response } from 'express'

import AppError from '../../errors/AppError'
import { prismaClient } from '../../database/prismaClient'
import TransactionService from '../../services/TransactionService'

type RequestData = {
  cartCode: string
  paymentType: string
  installments: number
  customerName: string
  customerEmail: string
  customerMobile: string
  customerDocument: string
  billingAddress: string
  billingNumber: string
  billingNeighborhood: string
  billingCity: string
  billingState: string
  billingZipCode: string
  creditCardNumber: string
  creditCardExpiration: string
  creditCardHolderName: string
  creditCardCvv: string
}
export default class CreateTransactionController {
  async handle(request: Request<RequestData>, response: Response) {
    const {
      cartCode,
      paymentType,
      installments,
      customerName,
      customerEmail,
      customerMobile,
      customerDocument,
      billingAddress,
      billingNumber,
      billingNeighborhood,
      billingCity,
      billingState,
      billingZipCode,
      creditCardNumber,
      creditCardExpiration,
      creditCardHolderName,
      creditCardCvv
    } = request.body

    const schema = Yup.object({
      cartCode: Yup.string().required(),
      paymentType: Yup.mixed().oneOf(['credit_card', 'billet']).required(),
      installments: Yup.number()
        .min(1)
        .when('paymentType', (paymentType, schema) =>
          paymentType === 'credit_card' ? schema.max(12) : schema.max(1)
        ),
      customerName: Yup.string().required().min(2),
      customerEmail: Yup.string().required().email(),
      customerMobile: Yup.string()
        .required()
        .test('is-valid-mobile', '${path} is not a mobile number!', (value) =>
          parsePhoneNumber(value!, 'BR')!.isValid()
        ),
      customerDocument: Yup.string()
        .required()
        .test(
          'is-valid-document',
          '${path} is not a valid CPF / CNPJ!',
          (value) => cpf.isValid(value!) || cnpj.isValid(value!)
        ),
      billingAddress: Yup.string().required(),
      billingNumber: Yup.string().required(),
      billingNeighborhood: Yup.string().required(),
      billingCity: Yup.string().required(),
      billingState: Yup.string().required(),
      billingZipCode: Yup.string().required(),
      creditCardNumber: Yup.string().when(
        'paymentType',
        (paymentType, schema) =>
          paymentType === 'credit_card' ? schema.required() : schema
      ),
      creditCardExpiration: Yup.string().when(
        'paymentType',
        (paymentType, schema) =>
          paymentType === 'credit_card' ? schema.required() : schema
      ),
      creditCardHolderName: Yup.string().when(
        'paymentType',
        (paymentType, schema) =>
          paymentType === 'credit_card' ? schema.required() : schema
      ),
      creditCardCvv: Yup.string().when('paymentType', (paymentType, schema) =>
        paymentType === 'credit_card' ? schema.required() : schema
      )
    })

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Error on validate schema', 400)
    }

    const cart = await prismaClient.cart.findFirst({
      where: {
        code: cartCode
      }
    })

    if (!cart) {
      throw new AppError('Carrinho não encontrado', 404)
    }

    const service = new TransactionService(null)
    const result = await service.execute({
      cartCode,
      paymentType,
      installments,
      customer: {
        name: customerName,
        email: customerEmail,
        mobile: parsePhoneNumber(customerMobile, 'BR')!.format('E.164'),
        document: customerDocument
      },
      billing: {
        address: billingAddress,
        number: billingNumber,
        neighborhood: billingNeighborhood,
        city: billingCity,
        state: billingState,
        zipcode: billingZipCode
      },
      creditCard: {
        number: creditCardNumber,
        expiration: creditCardExpiration,
        holdername: creditCardHolderName,
        cvv: creditCardCvv
      }
    })

    return response.status(200).json(result)
  }
}
