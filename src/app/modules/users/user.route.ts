import express from 'express'

import usersController from './users.controller'
const router = express.Router()

router.post('/creat-user', usersController.creatUsers)

export default router
