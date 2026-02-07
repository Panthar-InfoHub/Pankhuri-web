import { getLessonBySlug } from "@/lib/api/lessons";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Paywall } from "@/components/lesson/Paywall";
import { ContentPlaceholder } from "@/components/lesson/ContentPlaceholder";
import { CurriculumSidebarWrapper } from "@/components/lesson/CurriculumSidebarWrapper";
import { MarkCompleteButton } from "@/components/lesson/MarkCompleteButton";
import { ChevronLeft, ChevronRight, BookOpen, Clock, BarChart, FileText } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LessonPageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonSlug } = await params;

  // 1. Get lesson details directly using course slug and lesson slug
  const lessonResponse = await getLessonBySlug(slug, lessonSlug);

  // 2. Handle Unauthenticated or SUBSCRIPTION_REQUIRED errors
  if (
    !lessonResponse.success &&
    (lessonResponse.code === "NO_TOKEN" ||
      lessonResponse.code === "UNAUTHORIZED" ||
      lessonResponse.code === "SUBSCRIPTION_REQUIRED")
  ) {
    const isAuthError =
      lessonResponse.code === "NO_TOKEN" || lessonResponse.code === "UNAUTHORIZED";

    return (
      <div className="bg-white min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/course/${slug}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Course
          </Link>
          <Paywall
            title={lessonResponse.data?.title || "Premium Lesson"}
            courseId={lessonResponse.data?.courseId || ""}
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
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs / Backlink */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/course/${slug}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{lesson.course.title}</span>
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-600">
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
              <div className="rounded-2xl overflow-hidden border border-gray-300 bg-black aspect-video shadow-lg">
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
              <div className="bg-gray-50 rounded-2xl border border-gray-300 p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-8 text-purple-600">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Reading Material • {lesson.textLesson.estimatedReadTime || lesson.duration} min
                    read
                  </span>
                </div>
                <div className="prose prose-slate max-w-none">
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {lesson.title}
              </h1>

              {lesson.lessonDescription?.textContent ? (
                <div
                  className="prose prose-slate max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: lesson.lessonDescription.textContent }}
                />
              ) : null}
            </div>
            {/* Navigation Buttons */}
            <div className="pt-12 border-t border-gray-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                {/* Previous */}
                <div className="w-full sm:w-1/3 flex justify-start order-2 sm:order-1">
                  {lesson.navigation.previous && (
                    <Link
                      href={`/course/${slug}/lesson/${lesson.navigation.previous.slug}`}
                      className="group flex flex-col gap-1 items-start"
                    >
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                        Previous
                      </span>
                      <div className="flex items-center gap-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="font-bold text-sm truncate max-w-[150px]">
                          {lesson.navigation.previous.title}
                        </span>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Mark Complete - Center */}
                <div className="w-full sm:w-auto flex justify-center order-1 sm:order-2">
                  <MarkCompleteButton
                    lessonId={lesson.id}
                    courseSlug={slug}
                    nextLessonSlug={lesson.navigation.next?.slug}
                  />
                </div>

                {/* Next / Finish */}
                <div className="w-full sm:w-1/3 flex justify-end order-3">
                  {lesson.navigation.next ? (
                    <Link
                      href={`/course/${slug}/lesson/${lesson.navigation.next.slug}`}
                      className="group flex flex-col gap-1 items-end text-right"
                    >
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                        Up Next
                      </span>
                      <div className="flex items-center gap-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                        <span className="font-bold text-sm truncate max-w-[150px]">
                          {lesson.navigation.next.title}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ) : (
                    <Link href={`/course/${slug}`} className="group flex flex-col gap-1 items-end text-right">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                        End of Course
                      </span>
                      <div className="flex items-center gap-2 text-gray-900 group-hover:text-purple-600 transition-colors font-bold text-sm">
                        Course Home
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / More Info */}
          <div className="space-y-8">
            <CurriculumSidebarWrapper
              slug={slug}
              lessonSlug={lessonSlug}
            />

            <div className="bg-gray-50 rounded-2xl border border-gray-300 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Lesson Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <BarChart className="w-4 h-4" />
                    Difficulty
                  </span>
                  <span className="text-gray-900 capitalize">
                    {lesson.metadata?.difficulty || "General"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration
                  </span>
                  <span className="text-gray-900">{lesson.duration} minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Type
                  </span>
                  <span className="text-gray-900 capitalize">{lesson.type}</span>
                </div>
              </div>
            </div>

            {/* Quick tips or CTA */}
            {/* <div className="bg-purple-100 rounded-2xl border border-purple-300 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                If you have questions about this lesson, join our community discussion.
              </p>
              <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-colors">
                Jump to Community
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
