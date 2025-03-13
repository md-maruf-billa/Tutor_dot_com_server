// save teacher info on db

import { JwtPayload } from 'jsonwebtoken'
import { ITeacher } from './teacher.interface'
import { TeacherModel } from './teacher.model'
import { UserModel } from '../auth_user/auth_user.model'

// save teacher data into db
const saveTeacherInfoIntoDB = async (
  payload: ITeacher,
  userInfo: JwtPayload
) => {
  const result = await TeacherModel.create(payload)

  if (result._id) {
    await UserModel.findOneAndUpdate(
      { email: userInfo.userEmail },
      {
        referencedModel: 'teacher',
        referencedUser: result._id
      }
    )
  }

  return result
}
// retrided all teacher data
const getAllTeacherFromDB = async () => {
  const result = await UserModel.find()
    .populate('referencedUser')
    .select('-password')
  return result
}

// get single teacher data
const getSpecificUserFromDB = async (email: string) => {
  const result = await UserModel.findOne()
    .populate('referencedUser')
    .select('-password')
  return result
}

//delete a teacher
const deleteTeacherFromDB = async (email: string) => {
  await UserModel.findOneAndUpdate({ email }, { isDeleted: true })
  return null
}

export const teacherService = {
  saveTeacherInfoIntoDB,
  getAllTeacherFromDB,
  getSpecificUserFromDB,
  deleteTeacherFromDB
}
