import { model, Schema } from 'mongoose'
import { IUser, IUserModel } from './auth_user.interface'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'student', 'teacher']
    },
    isDeleted: { type: Boolean, default: false },
    accountStatus: {
      type: String,
      enum: ['active', 'block'],
      default: 'active'
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.statics.isUserExist = async function (email: string) {
  return await UserModel.findOne({ email })
}

export const UserModel = model<IUser, IUserModel>('user', userSchema)
