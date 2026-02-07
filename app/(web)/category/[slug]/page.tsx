import { getCategoryBySlug } from "@/lib/api/category.server";
import { CourseCard } from "@/components/course/CourseCard";
import { BookOpen, FolderTree } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategorySubscriptionButton } from "@/components/category/CategorySubscriptionButton";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    const response = await getCategoryBySlug(slug, true);

    if (!response.success || !response.data) {
      notFound();
    }

    const category = response.data;
    console.log("cat data ",category)

    return (
      <main className="bg-white min-h-screen">
        {/* Category Header */}
        <section className="relative border-b border-gray-200 overflow-hidden bg-gray-50">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex items-start gap-6">
              {category.icon && (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                  <Image src={category.icon} alt={category.name} fill className="object-cover" />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{category.name}</h1>
                <p className="text-gray-600 text-lg mb-4 max-w-3xl">{category.description}</p>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-purple-400" />
                    <span>{category._count.courses} Courses</span>
                  </div>
                  {category.children && category.children.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FolderTree size={16} className="text-blue-400" />
                      <span>{category.children.length} Subcategories</span>
                    </div>
                  )}
                  {!category.hasAccess && category.isPaid && (
                    <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase">
                      Premium
                    </div>
                  )}
                  {category.hasAccess && category.isPaid && (
                    <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase">
                      Unlocked
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Options - Show if category is paid and user doesn't have access */}
        {category.isPaid &&
          !category.hasAccess &&
          category.pricing &&
          category.pricing.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Subscribe to {category.name}</h2>
                <p className="text-gray-600 text-lg">
                  Get unlimited access to all courses and content in this category
                </p>
              </div>
              <CategorySubscriptionButton
                categoryName={category.name}
                pricing={category.pricing}
                hasAccess={category.hasAccess}
              />
            </section>
          )}

        {/* Subcategories */}
        {category.children && category.children.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subcategories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.children.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/category/${subCategory.slug}`}
                  className="group bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 hover:border-purple-400 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {subCategory.icon && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                        <Image
                          src={subCategory.icon}
                          alt={subCategory.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-bold group-hover:text-purple-600 transition-colors mb-1">
                        {subCategory.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {subCategory.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>{subCategory._count.courses} courses</span>
                        {!subCategory.hasAccess && subCategory.isPaid && (
                          <span className="text-yellow-400">Premium</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {category.courses && category.courses.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {category.children && category.children.length > 0
                ? "Featured Courses"
                : "All Courses"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={
                    {
                      ...course,
                      category: { name: category.name },
                      trainer: undefined,
                      pricing: undefined,
                      totalReviews: 0,
                      language: "English",
                      averageRating: course.rating,
                    } as any
                  }
                  hasAccess={category.hasAccess}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!category.courses || category.courses.length === 0) &&
          (!category.children || category.children.length === 0) && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
              <div className="text-gray-400 mb-4">
                <BookOpen size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Content Available</h3>
              <p className="text-gray-600">
                This category doesn't have any courses or subcategories yet.
              </p>
            </section>
          )}
      </main>
    );
  } catch (error) {
    console.error("❌ [Category Page] Error loading category:", error);
    notFound();
  }
}
