import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import Image from "next/image"

const courses = [
  {
    title: "Complete Makeup Artistry",
    tagline: "From basics to bridal makeup mastery",
    image: "/landing/makeup-artistry-course-brushes-palette.jpg",
    price: "₹2,999",
    originalPrice: "₹5,999",
    discount: "50% OFF",
    duration: "12 weeks",
    students: "15k+",
    rating: 4.9,
  },
  {
    title: "Mehndi Design Mastery",
    tagline: "Traditional & modern henna patterns",
    image: "/landing/mehndi-henna-design-hands.jpg",
    price: "₹1,999",
    originalPrice: "₹3,999",
    discount: "50% OFF",
    duration: "8 weeks",
    students: "22k+",
    rating: 4.8,
  },
  {
    title: "Home Baking Business",
    tagline: "Start your cake & pastry venture",
    image: "/landing/baking-cakes-pastries-decorating.jpg",
    price: "₹2,499",
    originalPrice: "₹4,999",
    discount: "50% OFF",
    duration: "10 weeks",
    students: "18k+",
    rating: 4.9,
  },
  {
    title: "Yoga & Wellness Instructor",
    tagline: "Teach yoga professionally",
    image: "/landing/yoga-wellness-meditation-instructor.jpg",
    price: "₹3,499",
    originalPrice: "₹6,999",
    discount: "50% OFF",
    duration: "16 weeks",
    students: "12k+",
    rating: 4.7,
  },
  {
    title: "Jewellery Making",
    tagline: "Craft beautiful handmade pieces",
    image: "/landing/handmade-jewelry-making-beads.jpg",
    price: "₹1,799",
    originalPrice: "₹3,599",
    discount: "50% OFF",
    duration: "6 weeks",
    students: "9k+",
    rating: 4.8,
  },
  {
    title: "Digital Marketing",
    tagline: "Grow businesses online",
    image: "/landing/digital-marketing-social-media-laptop.jpg",
    price: "₹2,999",
    originalPrice: "₹5,999",
    discount: "50% OFF",
    duration: "12 weeks",
    students: "25k+",
    rating: 4.9,
  },
]

export function FeaturedCourses() {
  return (
    <section id="courses" className="py-20 md:py-28 bg-gradient-to-b from-background to-pink-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover courses designed to help you learn, grow, and build a successful career.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 rounded-full">
                  {course.discount}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1 text-foreground">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.tagline}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                  </div>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
