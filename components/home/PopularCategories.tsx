// components/home/PopularCategories.tsx

import { getCategories } from "@/lib/api/category.server";
import { CategoryGrid } from "./CategoryGrid";
import { ErrorState } from "@/components/shared/error-state";
import { CategorySkeleton } from "@/components/shared/skeletons";
import { Suspense } from "react";

async function CategoriesContent() {
  try {
    const response = await getCategories({ status: "active", limit: 4 });

    if (!response.success || !response.data) {
      return <ErrorState message={response.message || "Failed to load categories."} />;
    }

    return <CategoryGrid categories={response.data as any} />;
  } catch (error) {
    console.error("CategoriesContent Error:", error);
    return <ErrorState message="An unexpected error occurred." />;
  }
}

export function PopularCategories() {
  return (
    <Suspense
      fallback={
        <div className="flex gap-4 md:gap-6 overflow-hidden px-4 md:px-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5 shrink-0">
              <CategorySkeleton />
            </div>
          ))}
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
