"use client"

import { useState } from "react"
import { ChevronDown, Video } from "lucide-react"

const curriculumData = [
  {
    category: "MAKEUP",
    subcategories: [
      {
        name: "Self-Makeup & Basic Makeup",
        courses: [
          "A to Z of Makeup: Masterclass",
          "A-Z Self Makeup Masterclass",
          "Basic Make-Up Masterclass",
          "Basic Makeup : Masterclass",
          "Basic Makeup Artistry",
          "Basic Makeup Masterclass",
          "Basics Of Make-Up",
          "An Introduction to Applying Makeup",
          "Introduction to Makeup : Masterclass",
          "Learn the Basics of Makeup",
          "College Make-Up Look",
          "Everyday Makeup Looks",
          "Do's And Don'ts of Makeup",
          "Makeup Hacks : Masterclass",
          "Makeup Using Only 3 Products",
          "Makeup Trends 2022",
          "Build your Makeup Vanity",
        ],
      },
      {
        name: "Advance / Professional Makeup",
        courses: [
          "Advance Make Up Masterclass",
          "Advance Make-Up Masterclass",
          "Advance Makeup : Masterclass",
          "Advance Makeup 2.0",
          "Advance Makeup Masterclass",
          "Advanced Makeup Artistry",
          "Advanced Course In Makeup Artistry",
          "Beginner to Professional Makeup Masterclass",
          "Creative Makeup Certification",
          "Fashion Makeup Masterclass",
        ],
      },
      {
        name: "Bridal & Special Looks",
        courses: [
          "All About Bridal Makeup",
          "Bridal Makeup : Masterclass",
          "Bridal Makeup Masterclass",
          "ENGLISH- HD Bridal Makeup Masterclass",
          "HINDI- HD Bridal Makeup Masterclass",
          "Indian Bridal Makeup Masterclass",
          "5 days Wedding Make-Up Looks",
          "20 Poses For Your Bridal Portrait",
          "Bride with Bold Eyes : Makeup Look",
          "Alia Bhatt Wedding Look : Masterclass",
          "Deepika Inspired Makeup Masterclass",
          "Gigi Hadid's Glittery Makeup Look",
          "Glam21: Cocktail Party Look",
        ],
      },
      {
        name: "Eye Makeup",
        courses: [
          "Eye Makeup Masterclass: Beginner to Pro",
          "10 Eye Makeup Looks",
          "5 Minutes Eye Makeup Looks",
          "Iconic Eye Makeup Masterclass",
          "Kitten Eye Makeup Look",
          "Blurred Eyeliner Makeup Look",
          "Detailed Brows and Smokey Eyes",
          "5 Types Of Eyeliner Trends",
        ],
      },
      {
        name: "Face Makeup",
        courses: [
          "Ace The Base: Makeup Masterclass",
          "Flawless Base Masterclass",
          "Flawless Foundation Application",
          "Contouring 101",
          "5 Steps Contouring And Highlighting",
          "All About Contouring : Masterclass",
        ],
      },
      {
        name: "Hairstyling",
        courses: [
          "3D Hairstyling : Masterclass",
          "Advance Hairstyling Masterclass",
          "Basic Hairstyling Masterclass",
          "Basic to Advance Hairstyling Masterclass",
          "10 Simple and Easy Hairstyle Trends",
          "10 Summer Hairstyle Trends",
          "5 Easy Hairstyles Masterclass",
          "Hair Curling & Straightening Masterclass",
          "Hairstyle Trends 2022",
          "Celebrity Inspired Hairstyling",
          "Bride and Bridesmaid Hairstyle : Masterclass",
        ],
      },
    ],
  },
  {
    category: "NAIL ART",
    subcategories: [
      {
        name: "Beginner Nail Art",
        courses: [
          "10 Nail Art Techniques : Masterclass",
          "11 Nailart Techniques Masterclass",
          "A to Z Nail Art Masterclass",
          "Basic Nail Art : Masterclass",
          "Basic Nail Art Masterclass",
          "Beginner to Professional Nail Art Masterclass",
        ],
      },
      {
        name: "Advance Nail Art",
        courses: [
          "Advance Nail Art Masterclass",
          "Advance Nail Art 2.0",
          "Advanced Nail Art Masterclass",
          "Expert Nail Art Technician Masterclass",
        ],
      },
      {
        name: "Seasonal / Special Nail Art",
        courses: [
          "Christmas Special Nail Art Masterclass",
          "Festive Season Special Nail Art",
          "Independence Day Special Nail Art",
          "Diwali Special Nail Art",
          "5 Days Summer Nail Art",
        ],
      },
      {
        name: "Nail Extensions",
        courses: [
          "5 Nail Extensions : Masterclass",
          "5 Days 5 Nail Extensions Masterclass",
          "All About Nail Extensions : Masterclass",
          "Classic Eyelashes Extension Masterclass",
        ],
      },
      {
        name: "Creative Nail Art",
        courses: [
          "Butterfly Nail Art",
          "Candy Cane Christmas Nail Art",
          "Cat Eye Nailart Masterclass",
          "Animal Print Nail Art",
          "Landscape Nail Art",
          "Flower Nail Art",
        ],
      },
    ],
  },
  {
    category: "HENNA / MEHENDI",
    subcategories: [
      {
        name: "Basic & Advance Henna",
        courses: [
          "Basic Henna : Masterclass",
          "Advance Henna : Masterclass",
          "Advanced Henna Artistry Masterclass",
          "Beginner to Professional Henna Masterclass",
          "Basic to Advance Henna : Masterclass",
        ],
      },
      {
        name: "Design-Based Henna",
        courses: [
          "10 Simple and Quick Henna Designs",
          "5 Days 5 Henna Designs",
          "5 Latest Henna Designs : Masterclass",
          "6 Days 6 Henna Designs",
          "Arabic Henna Masterclass",
          "Indo Arabic Henna Masterclass",
          "Bridal Henna : Masterclass",
          "Full Hand Mehendi : Masterclass",
          "Finger Mehendi Design",
          "Curve Mehendi Design : Masterclass",
          "Bandhani Design : Henna Masterclass",
        ],
      },
      {
        name: "Special Occasion Henna",
        courses: [
          "Diwali Mehndi Masterclass",
          "Eid Special Mehendi",
          "Karva Chauth Special Mehendi Design",
          "Bridal Mehendi Masterclass",
        ],
      },
    ],
  },
  {
    category: "ART & CRAFT",
    subcategories: [
      {
        name: "Resin / Texture / Clay Art",
        courses: [
          "Advanced Resin Art Masterclass",
          "Advanced Resin Art 2.0",
          "Basic Resin Art",
          "Texture Art Masterclass",
          "Polymer Clay Masterclass",
        ],
      },
      {
        name: "Drawing / Painting / Mandala",
        courses: ["Mandala Art Masterclass", "Floral Mandala Art : Masterclass", "Dot Mandala Art"],
      },
      {
        name: "Craft Making",
        courses: [
          "Basic Jewellery Making : Masterclass",
          "Crochet Masterclass",
          "Macrame Art : Masterclass",
          "Bottle Art : Masterclass",
          "Advance Russian Sculpture Art Masterclass",
        ],
      },
      {
        name: "Soap / DIY Crafts",
        courses: [
          "Soap Making Masterclasses",
          "Candle Making Masterclasses",
          "Bath Bomb Making Masterclasses",
          "Cosmetics Making at Home Masterclass",
        ],
      },
    ],
  },
  {
    category: "CANDLE MAKING",
    subcategories: [
      {
        name: "Basic & Advance",
        courses: [
          "Candle Making : Masterclass",
          "Advance Candle Making Masterclass",
          "Designer Candle Making : Masterclass",
          "Creative Rose Candles : Masterclass",
        ],
      },
      {
        name: "Festive",
        courses: ["Diwali Special Candle Making", "Christmas Special Candle Making"],
      },
    ],
  },
  {
    category: "BAKING",
    subcategories: [
      {
        name: "Cakes",
        courses: [
          "5 Days 5 Eggless Cake Making",
          "Basic Baking Masterclass",
          "Eggless Basic Baking",
          "Advance Baking Masterclass",
          "Chocolate Cake, Fruit Cake, Plum Cake, Tea Cakes etc.",
        ],
      },
      {
        name: "Cookies",
        courses: ["10 Special Cookies", "Christmas Cookies", "Choco Chip Cookies", "Gingerbread Cookies"],
      },
      {
        name: "Chocolates",
        courses: ["50 Chocolate Making", "Truffles, Mousse, Ganache Workshops"],
      },
      {
        name: "Breads & Savoury",
        courses: ["Bread Making", "Garlic Knots", "Soda Bread", "Quiches"],
      },
    ],
  },
  {
    category: "ORGANIC SKINCARE CREATIONS",
    subcategories: [
      {
        name: "DIY Natural Skincare",
        courses: ["DIY Face Mask", "DIY Hair Mask", "DIY Foundation Powder", "DIY Perfume Making"],
      },
      {
        name: "Product-Based",
        courses: [
          "Lip Balm Making",
          "Face Serum Making",
          "Hair Oil Making",
          "Soap Making (Cold Process, Herbal, Glycerin)",
        ],
      },
    ],
  },
  {
    category: "FITNESS",
    subcategories: [
      {
        name: "Fitness Programs",
        courses: [
          "1 Month Zumba Fitness",
          "Basics of Yoga : Masterclass",
          "Celebrate Yoga - Masterclass",
          "Face Yoga Masterclass",
          "Fitness & Well-being short workshops",
        ],
      },
    ],
  },
]

export function CourseCurriculum() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null)

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-pink-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Course{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Curriculum
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive curriculum across multiple categories
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {curriculumData.map((category) => (
            <div key={category.category} className="rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                className="w-full flex items-center justify-between p-6 bg-purple-50/80 hover:bg-purple-100/80 transition-colors"
              >
                <span className="text-lg font-bold text-purple-700">{category.category}</span>
                <ChevronDown
                  className={`h-5 w-5 text-purple-600 transition-transform ${
                    openCategory === category.category ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openCategory === category.category && (
                <div className="bg-purple-50/40 p-4 space-y-3">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          setOpenSubcategory(openSubcategory === subcategory.name ? null : subcategory.name)
                        }
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-purple-50/50 transition-colors rounded-lg"
                      >
                        <span className="text-base font-semibold text-purple-700">{subcategory.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-purple-600 transition-transform ${
                            openSubcategory === subcategory.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openSubcategory === subcategory.name && (
                        <div className="bg-white p-4 space-y-2">
                          {subcategory.courses.map((course, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-2 px-3 hover:bg-purple-50/50 rounded">
                              <Video className="h-4 w-4 text-purple-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{course}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
