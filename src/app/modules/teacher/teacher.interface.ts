export interface ITeacher {
  bio: string
  subjects: string[]
  gradeLevel: string
  hourlyRate: string
  availability: string
  address: string
  tutionType: 'Online' | 'Offline' | 'Both'
  bankAccout: string
  socialLinks?: {
    facebook: string
    linkedin: string
    twitter: string
    youtub: string
  }
  vedioResume?: string
}
