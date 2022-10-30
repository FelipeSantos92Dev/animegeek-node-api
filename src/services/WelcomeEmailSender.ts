import nodemailer from 'nodemailer'
import AppError from '../errors/AppError'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const email = process.env.MAILADDRESS
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
)

export default async function WelcomeEmailSender(
  name: string | null | undefined,
  emailSender: string | null | undefined,
  content: string | null | undefined
) {
  try {
    if (!emailSender?.trim() || !name?.trim()) {
      throw new AppError('Ocorreu um erro', 403)
    }
    const message = {
      from: email,
      to: emailSender,
      subject: `Nova mensagem de contato - ${name}`,
      html: `<p><b>Email: </b>${emailSender}<br /><b>Mensagem: </b>${content}</p>`,
      replyTo: emailSender
    }

    await transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Mensagem enviada', info)
      }
    })
  } catch (err) {
    throw new AppError('Erro ao enviar o e-mail', 500)
  }
}
