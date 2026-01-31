import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.slug}`} className="group">
          <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#0A0A0A] hover:border-purple-500/30 transition-all duration-300">
            <Image
              src={category.icon || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-80"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-center text-sm md:text-base group-hover:text-purple-400 transition-colors">
                {category.name}
              </h3>
              {/* <p className="text-[10px] text-gray-400 text-center mt-1">
                {category._count.courses} Courses
              </p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
