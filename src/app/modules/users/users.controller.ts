import { Request, Response } from 'express'
import userService from './user.service'

const creatUsers = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.creatUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successFully',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Faild to create user',
    })
    console.log(err)
  }
}

export default { creatUsers }
