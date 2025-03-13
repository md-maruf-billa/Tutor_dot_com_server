import config from '../../../config'
import AppError from '../../errors/appError'
import { ILoginUser, IUser } from './auth_user.interface'
import { UserModel } from './auth_user.model'
import bcrypt from 'bcrypt'
import { createToken } from './auth_user.utils'
import jwt from 'jsonwebtoken'

// save user info in to db
const saveUserInfoOnDB = async (payload: IUser) => {
  const hashPassword = bcrypt.hashSync(payload?.password, Number(config.salt!))
  const result = await UserModel.create({ ...payload, password: hashPassword })
  return result
}

// login user
const loginUserFromDB = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await UserModel.isUserExist(payload?.email)

  if (!user) {
    throw new AppError(404, 'This user is not found !')
  }
  // checking if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(403, 'This user is deleted !')
  }
  // check account status
  if (user?.accountStatus === 'block') {
    throw new AppError(403, 'This user is blocked ! !')
  }

  // decod password and check it
  const savePassword = await bcrypt.compare(payload?.password, user?.password)

  if (!savePassword) throw new AppError(404, 'Password or email not matched')

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as jwt.SignOptions['expiresIn']
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as jwt.SignOptions['expiresIn']
  )
  return {
    accessToken,
    refreshToken
  }
}

// export all
export const userServices = {
  saveUserInfoOnDB,
  loginUserFromDB
}
