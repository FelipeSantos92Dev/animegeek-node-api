import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const email = process.env.MAILADDRESS
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
)

const pathToAttachment = `${__dirname}/attachment.pdf`

// const attachment = fs.readFileSync(pathToAttachment).toString('base64')

export default class EmailSender {
  async handle(request: Request, response: Response) {
    try {
      const { senderMail, name } = request.body
      console.log(senderMail, name)
      // console.log(pathToAttachment)

      if (!senderMail.trim() || !name.trim()) {
        return response.status(403).send('')
      }
      const message = {
        from: email,
        to: senderMail,
        subject: `Nova mensagem de contato - ${name}`,
        html: `<p><b>Email: </b>${senderMail}<br /><b>Mensagem: </b>Teste</p>`,
        replyTo: senderMail,
        attachments: [
          {
            path: pathToAttachment
          }
          // {
          //   content: attachment,
          //   filename: 'attachment.pdf',
          //   type: 'application/pdf',
          //   disposition: 'attachment'
          // }
        ]
      }

      await transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Mensagem enviada', info)
        }
      })

      return response.send('')
    } catch (err) {
      return response.json({
        error: true,
        message: err.message
      })
    }
  }
}
