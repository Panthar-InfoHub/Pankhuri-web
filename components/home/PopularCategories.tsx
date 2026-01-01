// components/home/PopularCategories.tsx

import { getCategories } from "@/lib/api/categories";
import { CategoryGrid } from "./CategoryGrid";
import { ErrorState } from "@/components/shared/error-state";
import { CategorySkeleton } from "@/components/shared/skeletons";
import { Suspense } from "react";

async function CategoriesContent() {
    try {
        const response = await getCategories({ status: 'active', limit: 8 });

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
        <Suspense fallback={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <CategorySkeleton key={i} />)}
            </div>
        }>
            <CategoriesContent />
        </Suspense>
    );
}
