import { CourseCard } from "@/components/course/CourseCard"
import { Course } from "@/types/course"

interface CourseGridProps {
  title: string
  courses: Course[]
}

export function CourseGrid({ title, courses }: CourseGridProps) {
  if (!courses?.length) return null;

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 tracking-tight">
            {title}
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}


