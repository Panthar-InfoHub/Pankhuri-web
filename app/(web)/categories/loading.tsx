import { Loader2 } from "lucide-react";

export default function CategoriesLoading() {
  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {/* Header skeleton */}
          <div className="space-y-2">
            <div className="h-10 w-64 bg-zinc-100 rounded-lg animate-pulse" />
            <div className="h-5 w-96 bg-zinc-100 rounded-lg animate-pulse" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-xl p-6 space-y-4 animate-pulse">
                <div className="h-32 bg-zinc-200 rounded-lg" />
                <div className="h-6 bg-zinc-200 rounded w-3/4" />
                <div className="h-4 bg-zinc-200 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading indicator */}
      <div className="fixed bottom-8 right-8 bg-white shadow-xl border border-zinc-200 rounded-full p-4">
        <Loader2 className="w-6 h-6 text-zinc-900 animate-spin" />
      </div>
    </main>
  );
}
