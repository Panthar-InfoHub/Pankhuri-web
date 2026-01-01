// components/shared/skeletons.tsx

export function CourseCardSkeleton() {
    return (
        <div className="bg-[#0A0A0A] rounded-xl overflow-hidden animate-pulse border border-white/5">
            <div className="aspect-video bg-white/5" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                    <div className="h-4 bg-white/10 rounded w-1/4" />
                </div>
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <CourseCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg animate-pulse">
            <div className="w-12 h-12 bg-white/10 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/2" />
                <div className="h-3 bg-white/5 rounded w-1/3" />
            </div>
        </div>
    );
}
