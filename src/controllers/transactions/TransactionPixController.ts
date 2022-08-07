/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Yup from 'yup'
import parsePhoneNumber from 'libphonenumber-js'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { Request, Response } from 'express'

import AppError from '../../errors/AppError'
import { prismaClient } from '../../database/prismaClient'
import TransactionPixService from '../../services/TransactionPixService'

export default class TransactionPixController {
  async handle(request: Request, response: Response) {
    const {
      cartCode,
      paymentType,
      customerName,
      customerEmail,
      customerMobile,
      customerDocument,
      userId
    } = request.body

    console.log(request.body)

    const schema = Yup.object({
      cartCode: Yup.string().required(),
      paymentType: Yup.mixed()
        .oneOf(['credit_card', 'billet', 'pix'])
        .required(),
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
      userId: Yup.string().required()
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
      throw new AppError('Carrinho não encontrado!', 404)
    }

    const service = new TransactionPixService(null)
    const result = await service.execute({
      cartCode,
      paymentType,
      customer: {
        name: customerName,
        email: customerEmail,
        mobile: parsePhoneNumber(customerMobile, 'BR')!.format('E.164'),
        document: customerDocument
      },
      pix: {
        expires_in: 360
      },
      userId
    })

    return response.status(200).json(result)
  }
}
