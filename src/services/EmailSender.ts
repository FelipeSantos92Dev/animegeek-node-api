import { Request, Response } from 'express'

const email = process.env.MAILADDRESS

export default class EmailSender {
  async handle(request: Request, response: Response) {
    // Your code here!

    return response.json()
  }
}
