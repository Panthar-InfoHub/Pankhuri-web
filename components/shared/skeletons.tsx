// components/shared/skeletons.tsx

export function CourseCardSkeleton() {
    return (
        <div className="bg-white rounded-[2rem] overflow-hidden animate-pulse border border-zinc-100 shadow-sm">
            <div className="aspect-[16/10] bg-zinc-100" />
            <div className="p-6 space-y-4">
                <div className="flex gap-2">
                    <div className="h-4 bg-zinc-100 rounded-full w-20" />
                </div>
                <div className="space-y-2">
                    <div className="h-6 bg-zinc-100 rounded-xl w-full" />
                    <div className="h-6 bg-zinc-100 rounded-xl w-3/4" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                    <div className="w-6 h-6 rounded-full bg-zinc-100" />
                    <div className="h-4 bg-zinc-100 rounded w-24" />
                </div>
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {Array.from({ length: count }).map((_, i) => (
                <CourseCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <div className="aspect-[9/11] bg-white rounded-[2rem] border border-zinc-100 animate-pulse flex flex-col justify-end p-6 shadow-sm">
            <div className="h-6 bg-zinc-100 rounded-xl w-3/4 mx-auto mb-2" />
            <div className="h-3 bg-zinc-50 rounded-full w-1/2 mx-auto" />
        </div>
    );
}

