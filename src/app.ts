import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// console.log(app.get('env'))

//application routs
app.use('/api/v1/users/', UserRoutes)

// Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // next('baba re ba error')
//   // await userService.creatUser({
//   //   id: '999',
//   //   password: '1234',
//   //   role: 'student',
//   // })
//   // res.send('Working successfull!')
//   throw new Error('orre baba error')
// })
// global error handelar
app.use(globalErrorHandler)

export default app

// asdfaf
