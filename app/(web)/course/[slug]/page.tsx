import { getCourseBySlug, getAllCourses } from "@/lib/api/courses"
import { CourseHeader } from "@/components/course/CourseHeader"
import { CourseCurriculum } from "@/components/course/CourseCurriculum"
import { CourseGrid } from "@/components/home/CourseGrid"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  const response = await getCourseBySlug(slug);
  console.log(slug, response);

  if (!response?.success || !response.data) {
    notFound();
  }

  const course = response.data;
  const curriculum = course.curriculum || [];

  // Fetch related courses on the server
  const relatedResponse = await getAllCourses({
    limit: 4,
    categoryId: course.categoryId
  });
  const relatedCourses = relatedResponse.success
    ? relatedResponse.data.filter(c => c.id !== course.id)
    : [];

  return (
    <main className="bg-[#010001] min-h-screen">
      <CourseHeader course={course} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">About this course</h2>
              <p className="text-gray-400 leading-relaxed text-lg">{course.description}</p>
            </section>

            <CourseCurriculum curriculum={curriculum} courseSlug={course.slug} hasAccess={course.hasAccess} />

            {course.metadata?.whatYouWillLearn && (
              <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.metadata.whatYouWillLearn.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-3 text-gray-300">
                      <span className="text-purple-500 font-bold">✓</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - could be used for sticky pricing/CTA if needed */}
          <div className="hidden lg:block">
            {/* Sidebar content if any */}
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24 border-t border-white/5">
          <CourseGrid title="Related Courses" courses={relatedCourses} />
        </section>
      )}
    </main>
  )
}
