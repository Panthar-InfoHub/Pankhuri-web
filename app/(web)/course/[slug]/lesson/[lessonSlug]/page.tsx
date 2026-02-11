import { getLessonBySlug } from "@/lib/api/lessons";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { Paywall } from "@/components/lesson/Paywall";
import { ContentPlaceholder } from "@/components/lesson/ContentPlaceholder";
import { CurriculumSidebarWrapper } from "@/components/lesson/CurriculumSidebarWrapper";
import { MarkCompleteButton } from "@/components/lesson/MarkCompleteButton";
import { ChevronLeft, ChevronRight, BookOpen, Clock, BarChart, FileText, Paperclip, Download } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLessonProgressServer } from "@/lib/api/progress.server";
import { LessonDescription } from "@/components/lesson/LessonDescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VideoMetadata } from "@/components/video/VideoMetadata";

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

  console.log("lesson data ", lesson)

  // 3. Get lesson progress if available (authenticated)
  let lessonProgress = null;
  try {
    const progressResponse = await getLessonProgressServer(lesson.id);
    if (progressResponse.success) {
      lessonProgress = progressResponse.data;
    }
  } catch (error) {
    console.error("Failed to fetch lesson progress", error);
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumbs / Backlink */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/course/${slug}`}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform border border-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">{lesson.course.title}</span>
          </Link>

          {lesson.duration > 0 && (
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>{lesson.duration} min duration</span>
              </div>
            </div>
          )}
        </div>

        {/* TOP SECTION: Player & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Video / Content Player (LHS) */}
          <div className="lg:col-span-8 xl:col-span-9">
            {lesson.type === "video" && lesson.videoLesson?.video ? (
              <div className="rounded-[2.5rem] overflow-hidden border border-gray-200 bg-black aspect-video shadow-2xl shadow-purple-500/10 ring-1 ring-white/10">
                <VideoPlayer
                  videoId={lesson.videoLesson.video.id}
                  title={lesson.videoLesson.video.title}
                  thumbnailUrl={lesson.videoLesson.video.thumbnailUrl}
                  initialTimestamp={lessonProgress?.currentTimestamp || 0}
                  lessonId={lesson.id}
                  externalUrl={lesson.videoLesson.video.externalUrl}
                />
              </div>
            ) : lesson.type === "text" && lesson.textLesson ? (
              <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 md:p-16 shadow-2xl shadow-purple-500/5 aspect-video overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-200">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 mb-1 block">
                      Study Material
                    </span>
                    <h2 className="text-sm font-bold text-gray-400">
                      Reading Time: {lesson.textLesson.estimatedReadTime || lesson.duration} mins
                    </h2>
                  </div>
                </div>
                <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:text-lg prose-p:leading-relaxed wrap-break-word">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson.textLesson.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <ContentPlaceholder
                type={lesson.type}
                courseSlug={slug}
                nextLesson={lesson.navigation.next}
              />
            )}
          </div>

          {/* Curriculum Sidebar (RHS) */}
          <div className="lg:col-span-4 xl:col-span-3 h-[300px] lg:h-auto lg:max-h-[calc(100vh-200px)] sticky top-8">
            <div className="h-full bg-white rounded-[2.5rem] border border-gray-200 shadow-xl shadow-purple-500/5 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900">Course Curriculum</h3>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <CurriculumSidebarWrapper
                  slug={slug}
                  lessonSlug={lessonSlug}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Metadata, Descriptions, Navigation */}
        <div className="w-full space-y-12">
          {/* Title and Navigation Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
            <div className="space-y-4">
              <h1 className="text-2xl capitalize md:text-4xl font-black text-gray-900 tracking-tighter leading-[1.1]">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 bg-white border border-gray-100 px-4 py-2 rounded-full w-fit shadow-sm">
                <span className="capitalize">{lesson.type} Lesson</span>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="capitalize">{lesson.metadata?.difficulty || "General"}</span>
              </div>
            </div>

            <MarkCompleteButton
              lessonId={lesson.id}
              courseSlug={slug}
              nextLessonSlug={lesson.navigation.next?.slug}
              isCompleted={lessonProgress?.isCompleted || false}
            />
          </div>

          {/* Content Stack */}
          <div className="space-y-6">
            {/* Video Metadata (Products, Timestamps, Video Desc) */}
            {lesson.type === "video" && lesson.videoLesson?.video?.videoDescription && (
              <VideoMetadata description={lesson.videoLesson.video.videoDescription} />
            )}

            {/* General Lesson Description */}
            {lesson.lessonDescription?.textContent && (
              <LessonDescription content={lesson.lessonDescription.textContent} />
            )}

            {/* Attachments Section */}
            {lesson.lessonAttachments && lesson.lessonAttachments.length > 0 && (
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <Paperclip className="w-4 h-4 text-purple-600" />
                  </div>
                  Lesson Attachments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lesson.lessonAttachments.map((attachment: any) => (
                    <a
                      key={attachment.id}
                      href={attachment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-3xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-all">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {attachment.title || attachment.fileName}
                          </p>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            {attachment.type || 'file'} • {attachment.fileSize ? (attachment.fileSize / (1024 * 1024)).toFixed(2) + ' MB' : 'Size unknown'}
                          </p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-purple-50 transition-colors shrink-0">
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pagination Navigation */}
          <div className="pt-12 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {/* Previous */}
              <div className="w-full sm:w-1/2 flex justify-start">
                {lesson.navigation.previous && (
                  <Link
                    href={`/course/${slug}/lesson/${lesson.navigation.previous.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-[2rem] border border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Previous
                      </span>
                      <span className="font-bold text-sm text-gray-900 truncate max-w-[200px]">
                        {lesson.navigation.previous.title}
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Next / Finish */}
              <div className="w-full sm:w-1/2 flex justify-end">
                {lesson.navigation.next ? (
                  <Link
                    href={`/course/${slug}/lesson/${lesson.navigation.next.slug}`}
                    className="group flex flex-col gap-1 items-end text-right p-4 rounded-[2rem] border border-gray-100 bg-white hover:border-purple-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                          Up Next
                        </span>
                        <span className="font-bold text-sm text-gray-900 truncate max-w-[200px]">
                          {lesson.navigation.next.title}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shadow-lg shadow-purple-200">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={`/course/${slug}`} className="group flex items-center gap-4 p-4 rounded-[2rem] border border-purple-100 bg-purple-50 hover:bg-purple-100 transition-all">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest leading-none mb-1">
                        End of Course
                      </span>
                      <span className="font-bold text-sm text-purple-900">
                        Back to Course Home
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
