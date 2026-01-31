import { getAllCategories } from "@/lib/api/category.server";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export default async function CategoriesPage() {
  try {
    const response = await getAllCategories();
    const categories = response.data || [];

    return (
      <main className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">All Categories</h1>
          <p className="text-zinc-400 mb-8">
            Explore all our course categories and find what interests you
          </p>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-lg">No categories available at the moment.</p>
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
