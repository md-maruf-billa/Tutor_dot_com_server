import { z } from 'zod'

export const updateTeacherValidation = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters long'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  gradeLevel: z.string().min(1, 'Grade level is required'),
  hourlyRate: z.number(),
  availability: z.string().min(1, 'Availability is required'),
  address: z.string().min(5, 'Address must be at least 5 characters long'),
  tutionType: z.enum(['Online', 'Offline', 'Both']),
  bankAccout: z.string().min(5, 'Bank account information is required'),
  socialLinks: z
    .object({
      facebook: z.string().url('Invalid Facebook URL'),
      linkedin: z.string().url('Invalid LinkedIn URL'),
      twitter: z.string().url('Invalid Twitter URL'),
      youtub: z.string().url('Invalid YouTube URL')
    })
    .partial(),
  vedioResume: z.string().url('Invalid video resume URL').optional()
})

export const teacherValidations = {
  updateTeacherValidation
}
