import express, { Request, Response } from 'express'
import userRoutes from './routes/users'

const app = express()
const PORT = 3000

app.use(express.json()) // để parse JSON

// Debug middleware để thấy request nào đi vào server
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`)
  next()
})

app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('RESTful API with CRUD using Express + TypeScript')
})
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})
