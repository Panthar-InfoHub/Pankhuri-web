import { Loader2 } from "lucide-react";

export default function CategoryLoading() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header skeleton */}
      <section className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-zinc-100 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="h-12 w-96 bg-zinc-100 rounded-lg animate-pulse" />
              <div className="h-6 w-full max-w-2xl bg-zinc-100 rounded-lg animate-pulse" />
              <div className="flex gap-6">
                <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse" />
                <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="h-8 w-48 bg-zinc-100 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-zinc-200" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-zinc-200 rounded w-full" />
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-4 bg-zinc-200 rounded w-16" />
                  <div className="h-4 bg-zinc-200 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-8 right-8 bg-white shadow-xl border border-zinc-200 rounded-full p-4">
        <Loader2 className="w-6 h-6 text-zinc-900 animate-spin" />
      </div>
    </main>
  );
}
