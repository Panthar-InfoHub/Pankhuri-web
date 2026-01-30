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

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <section className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-purple-500 rounded-full" />
                <h2 className="text-3xl font-bold text-white tracking-tight">About this course</h2>
              </div>
              <CourseDescription description={course.description} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-500 rounded-full" />
                  <h2 className="text-3xl font-bold text-white tracking-tight">Course Curriculum</h2>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {curriculum.length} Modules • {curriculum.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} Lessons
                </p>
              </div>
              <CourseCurriculum curriculum={curriculum} courseSlug={course.slug} hasAccess={course.hasAccess} />
            </section>

            {course.metadata?.whatYouWillLearn && (
              <section className="bg-linear-to-br from-white/5 to-transparent rounded-3xl p-10 border border-white/10 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                  <Award className="text-purple-400 w-6 h-6" />
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.metadata.whatYouWillLearn.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-4 text-gray-300 group">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Quick Access / Extra Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* This area can be used for extra course info like skills, requirements, etc. */}
              {course.metadata?.prerequisites && (
                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Prerequisites
                  </h3>
                  <ul className="space-y-3">
                    {course.metadata.prerequisites.map((item, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex gap-2">
                        <span className="text-blue-500">•</span>
                        {item}
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
        <section className="max-w-7xl mx-auto px-4 py-24 border-t border-white/5">
          <CourseGrid title="Related Courses" courses={relatedCourses} />
        </section>
      )}
    </main>
  )
}
