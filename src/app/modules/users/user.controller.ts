import { RequestHandler } from 'express'
import { UserService } from './user.service'

const creatUsers: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.creatUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successFully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  creatUsers,
}
