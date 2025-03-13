import userRouter from './app/modules/auth_user/auth_user.route'
import teacherRoute from './app/modules/teacher/teacher.route'

const routes = [
  { path: '/auth', route: userRouter },
  { path: '/teacher', route: teacherRoute }
]

export default routes
