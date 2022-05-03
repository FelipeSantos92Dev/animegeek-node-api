import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors'
import AppError from './errors/AppError'

const app = express()
app.use(express.json())
app.use((request: Request, response: Response, next: NextFunction) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  response.header(
    'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'
  )
  app.use(cors())
  next()
})
app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })
  }
)

// app.listen(4000, () =>
//   console.log('⚡ Server started on http://localhost:4000')
// )
app.listen('https://animegeek-node-api.vercel.app', () =>
  console.log('⚡ Server started')
)
