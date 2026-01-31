import { getCourseBySlug, getAllCourses } from "@/api/courses"
import { CourseHeader } from "@/components/course/CourseHeader"
import { CourseCurriculum } from "@/components/course/CourseCurriculum"
import { CourseGrid } from "@/components/home/CourseGrid"
import { notFound } from "next/navigation"
import { Award, Check, Shield } from "lucide-react"
import { CourseDescription } from "@/components/course/CourseDescription"

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  const response = await getCourseBySlug(slug);

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

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <section>
              <h2 className="text-2xl font-bold text-white mb-8">About this course</h2>
              <CourseDescription description={course.description} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-tight">Curriculum</h2>
                <p className="text-gray-500 text-sm font-medium">
                  {curriculum.length} Modules • {curriculum.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} Lessons
                </p>
              </div>
              <CourseCurriculum curriculum={curriculum} courseSlug={course.slug} hasAccess={course.hasAccess} />
            </section>

            {course.metadata?.whatYouWillLearn && (
              <section className="bg-white/3 border border-white/5 rounded-3xl p-10">
                <h2 className="text-xl font-bold text-white mb-8">What you&apos;ll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.metadata.whatYouWillLearn.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 self-start">
            <div className="sticky top-24 space-y-8">
              {course.metadata?.prerequisites && (
                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Prerequisites
                  </h3>
                  <ul className="space-y-4">
                    {course.metadata.prerequisites.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-blue-500 font-bold text-sm">•</span>
                        <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Related Courses</h2>
          <CourseGrid title="" courses={relatedCourses} />
        </section>
      )}
    </main>
  )
}
