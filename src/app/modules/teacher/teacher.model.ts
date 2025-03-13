import { Schema, model } from 'mongoose'
import { ITeacher } from './teacher.interface'

const TeacherSchema = new Schema<ITeacher>(
  {
    bio: { type: String, required: true, minlength: 10 },
    profileImage: { type: String, required: false },
    subjects: { type: [String], required: true },
    gradeLevel: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    availability: { type: String, required: true },
    address: { type: String, required: true, minlength: 5 },
    tutionType: {
      type: String,
      enum: ['Online', 'Offline', 'Both'],
      required: true
    },
    bankAccout: { type: String, required: true, minlength: 5 },
    socialLinks: {
      facebook: { type: String, match: /^https?:\/\//, required: false },
      linkedin: { type: String, match: /^https?:\/\//, required: false },
      twitter: { type: String, match: /^https?:\/\//, required: false },
      youtub: { type: String, match: /^https?:\/\//, required: false }
    },
    vedioResume: { type: String, match: /^https?:\/\//, required: false }
  },
  { timestamps: true, versionKey: false }
)

export const TeacherModel = model('teacher', TeacherSchema)
