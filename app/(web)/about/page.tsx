
import React from 'react';
import Link from 'next/link';
import {
    Users2,
    Award,
    Sparkles,
    Heart,
    Globe2,
    Clock,
    Palette,
    ChefHat,
    CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { label: "Community Members", value: "1M+", icon: Users2, color: "text-pink-600", bg: "bg-pink-100" },
        { label: "Expert Trainers", value: "500+", icon: Award, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Live Classes Daily", value: "100+", icon: Globe2, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Happy Learners", value: "4.8/5", icon: Heart, color: "text-red-600", bg: "bg-red-100" }
    ];

    const features = [
        {
            title: "Expert-Led Learning",
            description: "Master new skills with guidance from industry professionals who are passionate about teaching.",
            icon: Award
        },
        {
            title: "Diverse Categories",
            description: "From Makeup & Baking to Resin Art & Mehendi, explore a wide range of creative courses.",
            icon: Palette
        },
        {
            title: "Learn from Home",
            description: "Enjoy the comfort and safety of learning from your own home at your own pace.",
            icon: Clock
        },
        {
            title: "Supportive Community",
            description: "Join a vibrant community of women to share, learn, and grow together.",
            icon: Users2
        }
    ];

    const popularSkills = [
        "Makeup Artistry", "Baking & Cooking", "Resin Art", "Lippan Art", "Texture Art", "Mehendi Design", "Soap Making", "Fashion Styling"
    ];

    return (
        <div className="bg-zinc-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-purple-50/50 to-transparent -z-10" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/20 blur-[100px] rounded-full mix-blend-multiply opacity-70 animate-blob" />
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/20 blur-[100px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />

                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 shadow-sm text-pink-600 text-sm font-semibold mb-8 animate-fade-in-up">
                        <Sparkles size={16} className="fill-current" />
                        <span>Empowering Women Across India</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-8 max-w-4xl mx-auto">
                        Helping Indian Women to <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Know, Glow And Grow
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
                        Welcome to Pankhuri – India’s largest social community platform designed exclusively for women to learn new skills, connect with peers, and achieve their dreams.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-[2.5rem] bg-zinc-100 overflow-hidden relative shadow-2xl shadow-pink-500/10">
                                {/* Placeholder for an image - using a decorative gradient block for now if no image is available */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                    <Users2 className="w-32 h-32 text-pink-200/50" />
                                </div>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-90 mix-blend-overlay" />
                            </div>

                            {/* Floating decorative card */}
                            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-zinc-100 max-w-xs hidden md:block">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900">Verified Expert</p>
                                        <p className="text-xs text-zinc-500">Trainers</p>
                                    </div>
                                </div>
                                <p className="text-zinc-600 text-sm">Quality learning from industry professionals.</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight">
                                A Space Designed for <span className="text-pink-600">You.</span>
                            </h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Pankhuri is more than just a platform; it's a movement. We are dedicated to empowering women by providing engaging online classes in fields that matter to you.
                            </p>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Whether you want to master the art of <span className="font-semibold text-purple-600">makeup</span>, create stunning <span className="font-semibold text-purple-600">resin art</span>, bake delicious treats, or start your own business, we are here to support your journey.
                            </p>

                            <div className="flex flex-wrap gap-3 pt-4">
                                {popularSkills.map((skill, index) => (
                                    <span key={index} className="px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 text-sm font-medium hover:border-pink-300 hover:text-pink-600 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-zinc-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Why Choose Pankhuri?</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">We combine quality education with a warm, supportive community to ensure your success.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:border-pink-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-6">
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center group p-6 rounded-3xl hover:bg-zinc-50 transition-colors duration-300">
                                <div className={`w-20 h-20 mx-auto rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm`}>
                                    <stat.icon size={32} />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-2">{stat.value}</div>
                                <div className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-pink-500/30">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Glow & Grow?</h2>
                        <p className="text-lg md:text-xl text-pink-100 max-w-2xl mx-auto mb-10 relative z-10">
                            Join thousands of women who are transforming their lives through learning. Start your journey with Pankhuri today.
                        </p>

                        <Link href="/courses" className="relative z-10 inline-block">
                            <button className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-50 hover:scale-105 transition-all shadow-lg active:scale-95">
                                Explore Courses
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
