import { Request, Response } from 'express'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticate = new AuthenticateUserUseCase()

    const token = await authenticate.execute({
      email,
      password
    })

    return response.status(201).json(token)
  }
}
