import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userService from './app/modules/users/user.service'
import usersRouter from './app/modules/users/user.route'
const app: Application = express()
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routs
app.use('/api/v1/users/', usersRouter)

// Testing
app.get('/', async (req: Request, res: Response) => {
  await userService.creatUser({
    id: '999',
    password: '1234',
    role: 'student',
  })
  res.send('Working successfull!')
})

export default app

// asdfaf
