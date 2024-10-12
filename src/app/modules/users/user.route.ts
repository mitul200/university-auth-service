import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/creat-user', UserController.creatUsers)

export const UserRoutes = router

// gose to ===>>> app.ts
