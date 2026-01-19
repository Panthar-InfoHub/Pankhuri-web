"use client"

// import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
// import { useCourse } from "@/hooks/useCourse"
import { courses } from "@/data/courses"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AccountPage() {
  // const { isLoggedIn, user, logout } = useAuth()
  // const { purchasedCourses } = useCourse()
  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login")
  //   }
  // }, [isLoggedIn, router])

  const myCourses = courses.filter((course) => true)

  const handleLogout = () => {
    // logout()
    router.push("/")
  }

  // if (!isLoggedIn || !user) {
  //   return null
  // }

  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {/* {user.name.charAt(0).toUpperCase()} */}
            </div>
            <div className="flex-1">
              {/* <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1> */}
              {/* <p className="text-gray-400 mb-4">{user.email}</p> */}
              {/* TODO: Fetch real user data from auth.service.ts */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-950 rounded p-4">
              <p className="text-gray-400 text-sm">Courses Enrolled</p>
              <p className="text-3xl font-bold text-white">{myCourses.length}</p>
            </div>
            <div className="bg-gray-950 rounded p-4">
              <p className="text-gray-400 text-sm">Total Spending</p>
              <p className="text-3xl font-bold text-white">
                ₹{myCourses.reduce((sum, course) => sum + course.price, 0)}
              </p>
            </div>
            <div className="bg-gray-950 rounded p-4">
              <p className="text-gray-400 text-sm">Member Since</p>
              <p className="text-3xl font-bold text-white">2024</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            Logout
          </Button>
        </div>

        {/* My Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">My Courses ({myCourses.length})</h2>
          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myCourses.map((course) => (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3 aspect-video bg-gray-900">
                      <Image
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <span className="text-black font-bold ml-1">▶</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{course.instructor.name}</p>
                    <p className="text-white font-bold mt-2">₹{course.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-lg mb-6">You haven't enrolled in any courses yet.</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 text-white border-0">
                  Explore Courses
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
