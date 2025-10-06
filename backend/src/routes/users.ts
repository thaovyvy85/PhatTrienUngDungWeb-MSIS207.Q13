import { Router, Request, Response } from 'express'

const router = Router()

// Fake database
let users: { id: number; name: string; email: string }[] = []
let idCounter = 1

// CREATE
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body

  const newUser = { id: idCounter++, name, email }
  users.push(newUser)

  res.status(201).json(newUser)
})

// READ ALL
router.get('/', (req: Request, res: Response) => {
  res.json(users)
})

// READ ONE
router.get('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

// UPDATE
router.put('/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ message: 'User not found' })

  user.name = req.body.name ?? user.name
  user.email = req.body.email ?? user.email

  res.json(user)
})

// DELETE
router.delete('/:id', (req: Request, res: Response) => {
  users = users.filter(u => u.id !== Number(req.params.id))
  res.status(204).send()
})

export default router
