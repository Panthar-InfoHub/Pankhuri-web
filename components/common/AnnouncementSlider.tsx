"use client";

import * as React from "react";
import Link from "next/link";

interface Announcement {
    id: string;
    text: string;
    link?: string;
    isActive: boolean;
    styles?: {
        bgColor?: string;
        textColor?: string;
    };
}

interface AnnouncementSliderProps {
    announcements: Announcement[];
}

export function AnnouncementSlider({ announcements }: AnnouncementSliderProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (!announcements || announcements.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [announcements]);

    if (!announcements || announcements.length === 0) return null;

    if (announcements.length === 1) {
        const item = announcements[0];
        return (
            <div
                className="w-full text-center py-2.5 px-4 text-sm font-medium transition-all duration-300 relative z-50 flex items-center justify-center"
                style={{
                    backgroundColor: item.styles?.bgColor || "#4F46E5",
                    color: item.styles?.textColor || "#FFFFFF",
                }}
            >
                {item.link ? (
                    <Link href={item.link} className="hover:underline flex items-center justify-center gap-1">
                        {item.text}
                    </Link>
                ) : (
                    <span>{item.text}</span>
                )}
            </div>
        );
    }

    return (
        <div className="w-full relative overflow-hidden h-10 flex items-center justify-center z-50">
            {announcements.map((item, index) => {
                const isActive = index === currentIndex;

                return (

                    <div
                        key={item.id}
                        className={`absolute inset-0 flex items-center justify-center py-2 px-4 text-sm font-medium transition-opacity duration-700 ease-in-out ${
                            isActive 
                                ? "opacity-100 z-10" 
                                : "opacity-0 z-0 pointer-events-none"
                        }`}


                        style={{
                            backgroundColor: item.styles?.bgColor || "#4F46E5",
                            color: item.styles?.textColor || "#FFFFFF",
                        }}
                    >
                        {item.link ? (
                            <Link href={item.link} className="hover:underline flex items-center justify-center gap-1">
                                {item.text}
                            </Link>
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

