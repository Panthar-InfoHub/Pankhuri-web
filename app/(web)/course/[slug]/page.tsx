import { getCourseBySlug } from "@/lib/api/course.server";
import { CourseHeader } from "@/components/course/CourseHeader";
import { CourseCurriculum } from "@/components/course/CourseCurriculum";
import { RelatedCourses } from "@/components/course/RelatedCourses";
import { notFound } from "next/navigation";
import { Award, Check, Shield } from "lucide-react";
import { CourseDescription } from "@/components/course/CourseDescription";
import { TrainerSection } from "@/components/course/TrainerSection";
import { CertificateClaim } from "@/components/course/CertificateClaim";
import { CourseReviews } from "@/components/course/CourseReviews";
import { getCourseProgressServer } from "@/lib/api/progress.server";
import { Progress } from "@/components/ui/progress";
import { CourseFAQ } from "@/components/course/CourseFAQ";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  const response = await getCourseBySlug(slug);

  if (!response?.success || !response.data) {
    notFound();
  }


  const course = response.data;

  const curriculum = course.curriculum || [];

  let progressData = null;
  if (course.hasAccess) {
    const progressResponse = await getCourseProgressServer(course.id);
    if (progressResponse.success) {
      progressData = progressResponse.data;
    }
  }

  const completedLessonIds = progressData?.lessonProgress
    ?.filter(lp => lp.isCompleted)
    ?.map(lp => lp.lessonId) || [];

  return (
    <main className="bg-white min-h-screen">
      <CourseHeader course={course} />

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="">
          {/* Main Content */}
          <div className="w-full space-y-20">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">About this course</h2>
              <CourseDescription description={course.description} />

              {/* Course WhatsApp Community */}
              {(course as any).whatsappCommunityLink && (
                <div className="mt-8 p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#25D366] p-3 rounded-2xl text-white shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-5 h-5 fill-current"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32C100.3 32 0 132.3 0 256C0 295.4 10.3 334 30 368.1L0 480l114.6-30c33.1 18.1 70.4 27.7 109.1 27.7h.1c123.6 0 223.9-100.3 223.9-223.9c0-59.3-23.1-115.1-65.1-157.1zm-157 325.3c-33.3 0-66-8.9-94.6-25.8L123 392l-67.2 17.6L73.5 344l-5.1-8.1c-18.5-29.4-28.2-63.3-28.2-98C40.2 147.1 122.5 64.9 224 64.9c49.2 0 95.3 19.2 130 53.9c34.8 34.7 54 80.8 54 130c.1 101.5-82.1 183.6-184.1 183.6zm101.1-138.6c-5.5-2.8-32.8-16.2-37.9-18s-8.8-2.8-12.5 2.8c-3.7 5.6-14.3 18-17.6 21.8s-6.5 4.2-12 1.4c-5.5-2.8-23.4-8.6-44.5-27.4c-16.4-14.6-27.5-32.7-30.7-38.2c-3.2-5.6-.3-8.6 2.5-11.4c2.5-2.5 5.5-6.5 8.3-9.7c2.8-3.2 3.7-5.6 5.6-9.3s.9-6.9-.5-9.7c-1.4-2.8-12.5-30.1-17.1-41.2c-4.5-11-9.1-9.3-12.5-9.5H164c-3.7 0-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s20 53.7 22.7 57.4c2.8 3.7 39.3 60 95.3 84.2c13.3 5.7 23.7 9.1 31.9 11.7c13.4 4.3 25.4 3.7 35 2.3c10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.4-2.3-5.1-3.7-10.6-6.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-base">Course WhatsApp Group</h3>
                      <p className="text-gray-500 text-sm mt-0.5">Join describing students taking this course.</p>
                    </div>
                  </div>
                  <a
                    href={(course as any).whatsappCommunityLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-5 py-3 rounded-2xl text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 self-end sm:self-auto"
                  >
                    Join Group
                  </a>
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Curriculum</h2>
                <div className="text-right">
                  <p className="text-gray-600 text-sm font-medium">
                    {curriculum.length} Modules •{" "}
                    {curriculum.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0)}{" "}
                    Lessons
                  </p>
                  {progressData && (
                    <p className="text-purple-600 text-xs font-bold mt-1">
                      {progressData.completedLessons} / {progressData.totalLessons} Lessons Completed
                    </p>
                  )}
                </div>
              </div>

              {progressData?.courseProgress && (
                <div className="mb-8 p-6 bg-purple-50 border border-purple-100 rounded-3xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900">Your Progress</span>
                    <span className="text-sm font-bold text-purple-600">
                      {typeof progressData.courseProgress.progress === 'number'
                        ? progressData.courseProgress.progress.toFixed(2)
                        : progressData.courseProgress.progress}%
                    </span>
                  </div>
                  <Progress value={progressData.courseProgress.progress} className="h-2 bg-purple-100" />
                </div>
              )}

              {curriculum.length > 0 ? (
                <CourseCurriculum
                  curriculum={curriculum}
                  courseSlug={course.slug}
                  hasAccess={course.hasAccess}
                  completedLessonIds={completedLessonIds}
                />
              ) : (
                <div className="p-12 bg-gray-50 border border-gray-100 rounded-3xl text-center flex flex-col items-center justify-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100">
                    <Shield className="w-6 h-6 text-purple-600 fire-gradient-icon" />
                  </div>
                  <p className="text-gray-500 font-bold text-sm">Curriculum is being updated. Stay tuned for lessons!</p>
                </div>
              )}
            </section>

            {course.hasCertificate && (
              <CertificateClaim
                courseId={course.id}
                courseTitle={course.title}
                certificateInfo={course.certificateInfo}
              />
            )}

            {course.metadata?.whatYouWillLearn && (
              <section className="bg-gray-50 border border-gray-200 rounded-3xl p-10">
                <h2 className="text-xl font-bold text-gray-900 mb-8">What you&apos;ll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.metadata.whatYouWillLearn.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600">
                        <Check className="w-3 h-3" />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Course FAQ Section */}
            <CourseFAQ faqData={(course as any).faqData} />

            {/* Reviews Section */}
            <CourseReviews courseId={course.id} />
          </div>

          {/* Sidebar */}
          {/* <div className="lg:col-span-4 self-start">
            <div className="sticky top-24 space-y-8">
              {course.metadata?.prerequisites && (course.metadata.prerequisites as string[]).length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-gray-900 font-bold mb-6 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    Prerequisites
                  </h3>
                  <ul className="space-y-4">
                    {(course.metadata.prerequisites as string[]).map(
                      (item: string, idx: number) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-blue-600 font-bold text-sm">•</span>
                          <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>

      {/* Related Courses */}
      <RelatedCourses courseId={course.id} />
    </main>
  );
}
