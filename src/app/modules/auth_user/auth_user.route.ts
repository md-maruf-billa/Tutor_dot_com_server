import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userValidations } from './auth_user.validation'
import { userControllers } from './auth_user.controller'
const userRouter = Router()

// create a user
userRouter.post(
  '/create-account',
  validateRequest(userValidations.registerUserValidation),
  userControllers.registerUser
)

userRouter.post(
  '/login',
  validateRequest(userValidations.loginUserValidation),
  userControllers.loginUser
)

export default userRouter
