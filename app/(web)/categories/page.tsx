import { getAllCategories } from "@/lib/api/category.server";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  try {
    const response = await getAllCategories();
    const categories = response.data || [];

    return (
      <main className="bg-white min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Categories</h1>
          <p className="text-gray-600 mb-8">
            Explore all our course categories and find what interests you
          </p>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No categories available at the moment.</p>
            </div>
          ) : (
            <CategoryGrid categories={categories} />
          )}
        </section>
      </main>
    );
  } catch (error) {
    throw new Error("Failed to load categories. Please try again later.");
  }
}
