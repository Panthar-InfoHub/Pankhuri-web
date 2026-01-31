import { getAllCourses } from "@/lib/api/course.server";
import { CourseGrid } from "@/components/home/CourseGrid";

export default async function CoursesPage() {
  try {
    const response = await getAllCourses();
    const courses = response.data || [];

    return (
      <main className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">All Courses</h1>
          <p className="text-zinc-400 mb-8">Browse our complete collection of courses</p>
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-lg">No courses available at the moment.</p>
            </div>
          ) : (
            <CourseGrid title="" courses={courses} />
          )}
        </section>
      </main>
    );
  } catch (error) {
    throw new Error("Failed to load courses. Please try again later.");
  }
}
