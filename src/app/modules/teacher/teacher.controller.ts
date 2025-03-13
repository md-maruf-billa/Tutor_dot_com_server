// update teacher account

import catchAsync from '../../utils/catchAsync'
import manageResponse from '../../utils/manageResponse'
import { teacherService } from './teacher.service'

const updateTeacherAccount = catchAsync(async (req, res) => {
  const result = await teacherService.saveTeacherInfoIntoDB(
    req.body,
    req.user,
    req.file?.path
  )
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile update successfull',
    data: result
  })
})

const getAllTeacher = catchAsync(async (req, res) => {
  const result = await teacherService.getAllTeacherFromDB()
  manageResponse(res, {
    success: true,
    message: 'All teacher data retrived',
    statusCode: 200,
    data: result
  })
})

//get specific teacher
const getSpecificTeacher = catchAsync(async (req, res) => {
  const result = await teacherService.getSpecificUserFromDB(req?.params?.email)
  manageResponse(res, {
    success: true,
    message: 'Teacher data retrived',
    statusCode: 200,
    data: result
  })
})
//delete teacher
const deleteTeacher = catchAsync(async (req, res) => {
  const result = await teacherService.deleteTeacherFromDB(req?.params?.email)
  manageResponse(res, {
    success: true,
    message: 'Teacher deleted successfull',
    statusCode: 200,
    data: result
  })
})

export const teacherController = {
  updateTeacherAccount,
  getAllTeacher,
  getSpecificTeacher,
  deleteTeacher
}
