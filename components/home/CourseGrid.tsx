import { CourseCard } from "@/components/course/CourseCard"
import { Course } from "@/types/course"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface CourseGridProps {
  title: string
  courses: Course[]
}

export function CourseGrid({ title, courses }: CourseGridProps) {
  if (!courses?.length) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 tracking-tight">
            {title}
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4 pb-4">
          {courses.map((course) => (
            <CarouselItem key={course.id} className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[29%]">
              <div className="h-full select-none">
                <CourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
          {/* User requested duplicates for looping effect */}
          {courses.map((course) => (
            <CarouselItem key={`${course.id}-dup`} className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[29%]">
              <div className="h-full select-none">
                <CourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Blur Effects */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white/80 via-white/40 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />

        <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 z-20" />
        <CarouselNext className="hidden md:flex -right-4 lg:-right-12 z-20" />
      </Carousel>
    </div>
  )
}


