
import React from 'react';

export function ServiceSection() {
    const services = [
        {
            title: "Community access",
            description: "Get in the paid whatsapp group with fellow learners and instructor to clear any doubts or roadblocks.",
            number: "01",
        },
        {
            title: "Recordings and Certificate",
            description: "Recordings with lifetime access and a Certificate of completion along with making you an expert in a new skill.",
            number: "02",
        },
        {
            title: "Business set up support",
            description: "We help you in learning new skills along with the course which helps you setup your online and offline business.",
            number: "03",
        }
    ];

    return (
        <section className="pt-12 pb-24 md:pt-16 md:pb-32 relative overflow-hidden bg-zinc-50/30">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-50/50 to-pink-50/50 blur-[120px] -z-10 rounded-full opacity-60" />

            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:items-center text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 tracking-tight">
                        Why Choose <span className="text-pink-600">Pankhuri?</span>
                    </h2>
                    <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl font-medium">
                        Comprehensive learning support designed for your growth and success.
                    </p>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>

                <div className="space-y-12">
                    {services.map((service, index) => {
                        const isEven = index % 2 !== 0;
                        return (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group`}
                            >
                                {/* Number Box */}
                                <div className="bg-pink-50 md:w-[240px] flex items-center justify-center p-8 md:p-0 shrink-0 relative overflow-hidden">
                                    {/* Subtle pattern or glow inside number box */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-transparent" />
                                    <span className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter group-hover:scale-110 transition-transform duration-500 relative z-10">
                                        {service.number}
                                    </span>
                                </div>

                                {/* Content Box */}
                                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-800 mb-4 group-hover:text-pink-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
