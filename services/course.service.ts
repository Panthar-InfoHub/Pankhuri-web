// Course Service

export const courseService = {
  async getCourses(): Promise<any[]> {
    try {
      const response = await fetch(`http://localhost:3001/api/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch courses")
      }

      return await response.json()
    } catch (error) {
      console.warn("Using fallback - ensure API is configured in production")
      return []
    }
  },

  async getCourseById(courseId: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch course ${courseId}`)
      }

      return await response.json()
    } catch (error) {
      console.warn(`Failed to fetch course ${courseId}`)
      return null
    }
  },

  async getCourseVideos(courseId: string): Promise<any[]> {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch videos for course ${courseId}`)
      }

      return await response.json()
    } catch (error) {
      console.warn(`Failed to fetch videos for course ${courseId}`)
      return []
    }
  },

  async getCategories(): Promise<any[]> {
    try {
      const response = await fetch(`http://localhost:3001/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }

      return await response.json()
    } catch (error) {
      console.warn("Using fallback - ensure API is configured in production")
      return []
    }
  },

  async enrollCourse(courseId: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      return response.ok
    } catch (error) {
      console.error("Failed to enroll in course")
      return false
    }
  },
}
