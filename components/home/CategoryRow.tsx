"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Category } from "@/context/types";

interface CategoryRowProps {
  categories: Category[];
}

export function CategoryRow({ categories }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute -left-12 top-1/3 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={32} className="text-white hover:text-purple-400" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex-shrink-0 group/card"
          >
            <div className="w-64 h-32 relative rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={category.thumbnail || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover/card:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <h3 className="text-white font-bold text-center text-xl">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute -right-12 top-1/3 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={32} className="text-white hover:text-purple-400" />
      </button>
    </div>
  );
}
