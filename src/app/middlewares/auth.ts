import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/appError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { UserModel } from '../modules/auth_user/auth_user.model'

type TUserRole = 'admin' | 'student' | 'teacher'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // checking if the token is missing
    if (!token) {
      throw new AppError(403, 'You are not authorized!')
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload

    const { role, userEmail, iat } = decoded

    // checking if the user is exist
    const user = await UserModel.isUserExist(userEmail)

    if (!user) {
      throw new AppError(404, 'This user is not found !')
    }
    // checking if the user is already deleted
    if (user?.isDeleted) {
      throw new AppError(403, 'This user is deleted !')
    }
    if (user?.accountStatus === 'block') {
      throw new AppError(403, 'This user is blocked ! !')
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
