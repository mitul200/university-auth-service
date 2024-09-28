import config from '../../../config/index'
import { generateUserId } from './user.utlis'
import { IUser } from './users.interface'
import { User } from './users.model'

const creatUser = async (user: IUser): Promise<IUser | null> => {
  // auto generate increment id
  const id = await generateUserId()

  user.id = id

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!creatUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default { creatUser }
