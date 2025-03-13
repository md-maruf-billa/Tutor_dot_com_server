import { Model, Schema } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'admin'
  isDeleted: boolean
  accountStatus: 'active' | 'block'
  referencedModel: 'teacher' | 'student'
  referencedUser?: Schema.Types.ObjectId
}

export interface ILoginUser {
  email: string
  password: string
}

export interface IUserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExist(id: string): Promise<IUser>
}
