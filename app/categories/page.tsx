"use client"

import { categories } from "@/data/categories"
import { CategoryGrid } from "@/components/home/CategoryGrid"

export default function CategoriesPage() {
  return (
    <main className="bg-black min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">All Categories</h1>
        <p className="text-gray-400 mb-8">Explore all our course categories and find what interests you</p>
        <CategoryGrid categories={categories} />
      </section>
    </main>
  )
}
