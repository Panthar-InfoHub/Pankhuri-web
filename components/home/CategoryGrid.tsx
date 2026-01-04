"use client"

import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/context/types"

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`} className="group">
          <div className="w-full h-32 relative rounded-lg overflow-hidden cursor-pointer">
            <Image
              src={category.thumbnail || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <h3 className="text-white font-bold text-center text-lg">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
