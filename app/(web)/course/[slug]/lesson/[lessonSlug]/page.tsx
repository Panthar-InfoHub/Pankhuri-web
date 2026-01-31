import { getCourseBySlug } from "@/lib/api/course.server";
import { getLessonBySlug } from "@/lib/api/lessons";
import { notFound, redirect } from "next/navigation";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Paywall } from "@/components/lesson/Paywall";
import { ContentPlaceholder } from "@/components/lesson/ContentPlaceholder";
import { LessonCurriculumSidebar } from "@/components/lesson/LessonCurriculumSidebar";
import { ChevronLeft, ChevronRight, BookOpen, Clock, BarChart, FileText } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonPageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonSlug } = await params;

  // 1. Get course to get the courseId
  const courseResponse = await getCourseBySlug(slug);
  if (!courseResponse?.success || !courseResponse.data) {
    notFound();
  }
  const course = courseResponse.data;

  // 2. Get lesson details
  const lessonResponse = await getLessonBySlug(course.id, lessonSlug);

  // Handle Unauthenticated or SUBSCRIPTION_REQUIRED errors
  if (
    !lessonResponse.success &&
    (lessonResponse.code === "NO_TOKEN" ||
      lessonResponse.code === "UNAUTHORIZED" ||
      lessonResponse.code === "SUBSCRIPTION_REQUIRED")
  ) {
    const isAuthError =
      lessonResponse.code === "NO_TOKEN" || lessonResponse.code === "UNAUTHORIZED";

    return (
      <div className="bg-[#010001] min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/course/${slug}`}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Course
          </Link>
          <Paywall
            title={lessonResponse.data?.title || "Premium Lesson"}
            courseId={course.id}
            slug={slug}
            lessonSlug={lessonSlug}
            mode={isAuthError ? "auth" : "subscribe"}
          />
        </div>
      </div>
    );
  }

  if (!lessonResponse.success || !lessonResponse.data) {
    notFound();
  }

  const lesson = lessonResponse.data;

  return (
    <main className="bg-[#010001] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs / Backlink */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/course/${slug}`}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{course.title}</span>
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Lesson {lesson.sequence}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration} min</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            {lesson.type === "video" && lesson.videoLesson?.video ? (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl shadow-purple-500/10">
                <VideoPlayer
                  videoId={lesson.videoLesson.video.id}
                  title={lesson.videoLesson.video.title}
                  thumbnailUrl={lesson.videoLesson.video.thumbnailUrl}
                />
              </div>
            ) : lesson.type === "video" ? (
              <ContentPlaceholder
                type="video"
                courseSlug={slug}
                nextLesson={lesson.navigation.next}
              />
            ) : null}

            {/* Text Lesson Section */}
            {lesson.type === "text" && lesson.textLesson ? (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 text-purple-400">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Reading Material • {lesson.textLesson.estimatedReadTime || lesson.duration} min
                    read
                  </span>
                </div>
                <div className="prose prose-invert prose-purple max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson.textLesson.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : lesson.type === "text" ? (
              <ContentPlaceholder
                type="text"
                courseSlug={slug}
                nextLesson={lesson.navigation.next}
              />
            ) : null}

            {/* Title & Description */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {lesson.title}
              </h1>

              {lesson.lessonDescription?.textContent ? (
                <div
                  className="prose prose-invert prose-purple max-w-none text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: lesson.lessonDescription.textContent }}
                />
              ) : null}
            </div>
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-12 border-t border-white/5">
              {lesson.navigation.previous ? (
                <Link
                  href={`/course/${slug}/lesson/${lesson.navigation.previous.slug}`}
                  className="flex flex-col gap-1 text-left group"
                >
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Previous Lesson
                  </span>
                  <div className="flex items-center gap-2 text-white group-hover:text-purple-400 transition-colors font-medium">
                    <ChevronLeft className="w-5 h-5" />
                    {lesson.navigation.previous.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {lesson.navigation.next ? (
                <Link
                  href={`/course/${slug}/lesson/${lesson.navigation.next.slug}`}
                  className="flex flex-col gap-1 text-right group"
                >
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Next Lesson
                  </span>
                  <div className="flex items-center gap-2 text-white group-hover:text-purple-400 transition-colors font-medium">
                    {lesson.navigation.next.title}
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              ) : (
                <Link href={`/course/${slug}`} className="flex flex-col gap-1 text-right group">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Finish
                  </span>
                  <div className="flex items-center gap-2 text-white group-hover:text-purple-400 transition-colors font-medium">
                    Back to Course
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar / More Info */}
          <div className="space-y-8">
            {course.curriculum && (
              <LessonCurriculumSidebar
                curriculum={course.curriculum}
                courseSlug={slug}
                currentLessonSlug={lessonSlug}
                hasAccess={course.hasAccess}
              />
            )}

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Lesson Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <BarChart className="w-4 h-4" />
                    Difficulty
                  </span>
                  <span className="text-white capitalize">
                    {lesson.metadata?.difficulty || "General"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration
                  </span>
                  <span className="text-white">{lesson.duration} minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Type
                  </span>
                  <span className="text-white capitalize">{lesson.type}</span>
                </div>
              </div>
            </div>

            {/* Quick tips or CTA */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/20 p-6">
              <h3 className="font-bold text-white mb-2">Need Help?</h3>
              <p className="text-sm text-gray-400 mb-4">
                If you have questions about this lesson, join our community discussion.
              </p>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white text-sm font-bold rounded-xl transition-colors">
                Jump to Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
