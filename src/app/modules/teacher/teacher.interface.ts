export interface ITeacher {
  bio: string
  profileImage?: string
  subjects: string[]
  gradeLevel: string
  hourlyRate: number
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
