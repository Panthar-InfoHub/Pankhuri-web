export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Category {
  id: string
  name: string
  description: string
  thumbnail: string
  courseCount: number
}

export interface Video {
  id: string
  title: string
  duration: number
  videoUrl: string
  description: string
  order: number
}

export interface Curriculum {
  id: string
  title: string
  videos: Video[]
}

export interface Course {
  id: string
  title: string
  description: string
  categoryId: string
  instructor: {
    name: string
    avatar: string
  }
  thumbnail: string
  price: number
  rating: number
  studentCount: number
  curriculum: Curriculum[]
}

export interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

export interface CourseContextType {
  purchasedCourses: string[]
  purchaseCourse: (courseId: string) => void
  hasPurchased: (courseId: string) => boolean
}
