import express from 'express'
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(router)

app.listen(4000, () =>
  console.log('⚡ Server started on http://localhost:4000')
)
