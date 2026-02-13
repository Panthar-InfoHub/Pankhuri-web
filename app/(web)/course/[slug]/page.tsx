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

              <CourseCurriculum
                curriculum={curriculum}
                courseSlug={course.slug}
                hasAccess={course.hasAccess}
                completedLessonIds={completedLessonIds}
              />
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

            {course.trainer && <TrainerSection trainer={course.trainer} />}

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
