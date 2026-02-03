import Link from "next/link";
import Image from "next/image";
import { Star, Award, Users, ChevronRight } from "lucide-react";
import { Trainer } from "@/types/course";

interface TrainerSectionProps {
    trainer: Trainer;
}

export function TrainerSection({ trainer }: TrainerSectionProps) {
    return (
        <section className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Meet the Instructor</h2>

            <div className="bg-gray-50 border border-gray-300 rounded-3xl p-8 group hover:border-purple-500 transition-all">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
<div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-300 shrink-0">
                        <Image
                            src={trainer.user.profileImage || "/placeholder.svg"}
                            alt={trainer.user.displayName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {trainer.user.displayName}
                            </h3>
                            <p className="text-purple-600 text-xs font-bold uppercase tracking-widest">
                                Professional Instructor
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6 py-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-medium text-gray-900 text-xs uppercase tracking-wider">Top Rated</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Award className="w-4 h-4 text-purple-600" />
                                <span className="font-medium text-gray-900 text-xs uppercase tracking-wider">Expert Instructor</span>
                            </div>
                        </div>

                        <Link
                            href={`/trainer/${trainer.id}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors group/link"
                        >
                            View Full Profile
                            <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
