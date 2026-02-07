import { CourseCard } from "@/components/course/CourseCard"
import { Course } from "@/types/course"

interface CourseGridProps {
  title: string
  courses: Course[]
}

export function CourseGrid({ title, courses }: CourseGridProps) {
  if (!courses?.length) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-tight border-l-4 border-purple-600 pl-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 items-stretch">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
