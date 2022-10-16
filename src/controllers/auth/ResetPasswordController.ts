import { Request, Response } from 'express'

export default class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    return response.json()
  }
}
