import { Router } from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { teacherValidations } from './teacher.validation'
import { teacherController } from './teacher.controller'

const teacherRoute = Router()

// update teacher account
teacherRoute.patch(
  '/update-profile',
  auth('teacher'),
  validateRequest(teacherValidations.updateTeacherValidation),
  teacherController.updateTeacherAccount
)
// get all teacher
teacherRoute.get('/get-all-teacher', teacherController.getAllTeacher)
// get specific teacher

teacherRoute.get('/:email', teacherController.getSpecificTeacher)
// delete Teacher
teacherRoute.delete('/:email', teacherController.deleteTeacher)

export default teacherRoute
