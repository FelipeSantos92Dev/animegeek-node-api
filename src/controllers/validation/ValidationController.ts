import { Request, Response } from 'express'

export default class ValidationController {
  async handle(request: Request, response: Response) {
    // Your code here!

    return response.json()
  }
}
