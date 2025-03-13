import { z } from 'zod'

const registerUserValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['admin', 'student', 'teacher'])
})
const loginUserValidation = z.object({
  email: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' })
})

export const userValidations = {
  registerUserValidation,
  loginUserValidation
}
