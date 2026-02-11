import { CourseCard } from "@/components/course/CourseCard";
import { getAllCourses } from "@/lib/api/course.server";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  try {
    const response = await getAllCourses();
    const courses = response.data || [];

    return (
      <main className="bg-white min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600 mb-8">Browse our complete collection of courses</p>
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      </main>
    );

  } catch (error) {
    throw new Error("Failed to load courses. Please try again later.");
  }
}
