import config from '../../../config'
import catchAsync from '../../utils/catchAsync'
import manageResponse from '../../utils/manageResponse'
import { userServices } from './auth_user.service'

// create a account
const registerUser = catchAsync(async (req, res) => {
  const result = await userServices.saveUserInfoOnDB(req?.body)

  manageResponse(res, {
    message: 'User registration successfull.',
    data: result,
    statusCode: 201,
    success: true
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUserFromDB(req.body)
  const { refreshToken, accessToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true
  })

  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken
    }
  })
})

export const userControllers = {
  registerUser,
  loginUser
}
