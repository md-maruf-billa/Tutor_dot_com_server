import { Model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'admin'
  isDeleted: boolean
  accountStatus: 'active' | 'block'
}

export interface ILoginUser {
  email: string
  password: string
}

export interface IUserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExist(id: string): Promise<IUser>
}
