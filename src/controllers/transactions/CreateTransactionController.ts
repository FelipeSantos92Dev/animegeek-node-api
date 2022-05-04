/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Yup from 'yup'
import parsePhoneNumber from 'libphonenumber-js'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { Request, Response } from 'express'
import AppError from '../../errors/AppError'
import { prismaClient } from '../../database/prismaClient'
import TransactionService from '../../services/TransactionService'

export default class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const {
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
    } = request.body

    const schema = Yup.object({
      cart_code: Yup.string().required(),
      payment_type: Yup.mixed().oneOf(['credit_card', 'billet']).required(),
      installments: Yup.number()
        .min(1)
        .when('payment_type', (payment_type, schema) =>
          payment_type === 'credit_card' ? schema.max(12) : schema.max(1)
        ),
      customer_name: Yup.string().required().min(2),
      customer_email: Yup.string().required().email(),
      customer_mobile: Yup.string()
        .required()
        .test('is-valid-mobile', '${path} is not a mobile number!', (value) =>
          parsePhoneNumber(value!, 'BR')!.isValid()
        ),
      customer_document: Yup.string()
        .required()
        .test(
          'is-valid-document',
          '${path} is not a valid CPF / CNPJ!',
          (value) => cpf.isValid(value!) || cnpj.isValid(value!)
        ),
      billing_address: Yup.string().required(),
      billing_number: Yup.string().required(),
      billing_neighborhood: Yup.string().required(),
      billing_city: Yup.string().required(),
      billing_state: Yup.string().required(),
      billing_zip_code: Yup.string().required(),
      credit_card_number: Yup.string().when(
        'payment_type',
        (payment_type, schema) =>
          payment_type === 'credit_card' ? schema.required() : schema
      ),
      credit_card_expiration: Yup.string().when(
        'payment_type',
        (payment_type, schema) =>
          payment_type === 'credit_card' ? schema.required() : schema
      ),
      credit_card_holder_name: Yup.string().when(
        'payment_type',
        (payment_type, schema) =>
          payment_type === 'credit_card' ? schema.required() : schema
      ),
      credit_card_cvv: Yup.string().when(
        'payment_type',
        (payment_type, schema) =>
          payment_type === 'credit_card' ? schema.required() : schema
      )
    })

    if (!(await schema.isValid(request.body))) {
      throw new AppError('Error on validate schema', 400)
    }

    const cart = await prismaClient.cart.findFirst({
      where: {
        id: cart_code
      }
    })

    if (!cart) {
      throw new AppError('Carrinho não encontrado', 404)
    }

    const service = new TransactionService()
    const result = await service.execute({
      cart_code,
      payment_type,
      installments,
      customer_name,
      customer_email,
      customer_mobile: parsePhoneNumber(customer_mobile, 'BR')!.format('E.164'),
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

    return response.status(201).json(result)
  }
}
