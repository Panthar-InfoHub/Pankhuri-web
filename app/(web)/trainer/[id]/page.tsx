import { getTrainerById } from "@/lib/api/trainer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    Twitter,
    Globe,
    Linkedin,
    Instagram,
    Award,
    Users,
    Star,
    BookOpen,
    ExternalLink,
    ChevronRight,
    ArrowLeft
} from "lucide-react";

interface TrainerPageProps {
    params: Promise<{ id: string }>;
}

export default async function TrainerPage({ params }: TrainerPageProps) {
    const { id } = await params;
    const response = await getTrainerById(id);

    if (!response?.success || !response.data) {
        notFound();
    }

    const trainer = response.data;

    return (
        <main className="bg-[#010001] min-h-screen text-white pb-20">
            {/* Header / Hero Section */}
            <div className="relative h-[40vh] min-h-[400px] overflow-hidden flex items-end">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#010001]/80 to-[#010001]" />

                <div className="max-w-7xl mx-auto px-4 w-full pb-12 relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-end w-full">
                        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl ring-1 ring-white/5 shrink-0">
                            <Image
                                src={trainer.user.profileImage || "/placeholder.svg"}
                                alt={trainer.user.displayName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-6 w-full">
                            <div className="space-y-3">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                                    {trainer.user.displayName}
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                                    {trainer.specialization.map((spec, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-2">
                                <div className="flex flex-col md:flex-row items-center gap-2 group/stat">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    </div>
                                    <div className="flex flex-col md:items-start text-center md:text-left">
                                        <span className="font-black text-lg leading-none">{trainer.rating}</span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Rating</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-2 group/stat">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Users className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="flex flex-col md:items-start text-center md:text-left">
                                        <span className="font-black text-lg leading-none">{trainer.totalStudents.toLocaleString()}</span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Students</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-2 group/stat">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Award className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div className="flex flex-col md:items-start text-center md:text-left">
                                        <span className="font-black text-lg leading-none">{trainer.experience}+</span>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Years Exp.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center justify-center md:self-end md:pb-2">
                            {trainer.socialLinks?.twitter && (
                                <a href={trainer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            )}
                            {trainer.socialLinks?.linkedin && (
                                <a href={trainer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            {trainer.socialLinks?.instagram && (
                                <a href={trainer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            )}
                            {trainer.socialLinks?.website && (
                                <a href={trainer.socialLinks.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Bio & Info */}
                    <div className="lg:col-span-2 space-y-16">
                        <section className="space-y-8">
                            <h2 className="text-3xl font-bold border-b border-white/5 pb-4 tracking-tight">About Instructor</h2>
                            <div className="prose prose-invert prose-purple max-w-none text-gray-400 text-lg leading-relaxed">
                                {trainer.bio}
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
                                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                                    <BookOpen className="w-4 h-4" />
                                    {trainer.courses?.length || 0} Total Courses
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20 md:pb-0">
                                {trainer.courses?.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/course/${course.slug}`}
                                        className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all"
                                    >
                                        <div className="relative aspect-video">
                                            <Image
                                                src={course.thumbnailImage || "/placeholder.svg"}
                                                alt={course.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-wider">
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                                                {course.title}
                                            </h3>
                                            <div className="mt-4 flex items-center justify-between text-gray-500">
                                                <span className="text-xs font-bold uppercase tracking-widest">View Course</span>
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Links & Verification (Hidden on mobile to prioritize bio/courses) */}
                    <div className="hidden lg:block space-y-8">
                        <div className="bg-white/3 border border-white/5 rounded-3xl p-8 sticky top-24">
                            <h3 className="text-xl font-bold mb-8">Professional Verification</h3>
                            <div className="space-y-6">
                                <div className="p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                                        <Award className="w-8 h-8 text-purple-500" />
                                    </div>
                                    <h4 className="font-bold text-white mb-2 text-sm">Verified Professional</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Top Tier Instructor • Vetted Content</p>
                                </div>

                                {trainer.socialLinks?.website && (
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Visit Portfolio</p>
                                        <a href={trainer.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                                            <p className="font-bold text-white truncate max-w-[200px]">{trainer.socialLinks.website.replace(/^https?:\/\//, '')}</p>
                                            <ExternalLink className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
