"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("❌ [Categories Error]:", error);
  }, [error]);

  return (
    <main className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-red-500/10 p-4 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Unable to Load Categories</h2>
            <p className="text-zinc-400 text-sm">
              {error.message || "Something went wrong while loading the categories."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="bg-white text-black hover:bg-white/90">
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
