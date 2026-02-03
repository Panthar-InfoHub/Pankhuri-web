import { getMyCertificates } from "@/lib/api/certificate";
import {
    Award,
    Download,
    Calendar,
    ExternalLink,
    AlertCircle,
    Trophy
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function CertificatesPage() {
    const response = await getMyCertificates();

    if (!response?.success) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <AlertCircle className="w-16 h-16 text-rose-500 mb-4 opacity-50" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Failed to load certificates</h1>
                <p className="text-gray-600">There was an error fetching your achievements. Please try again later.</p>
            </div>
        );
    }

    const certificates = response.data || [];

    return (
        <main className="bg-white min-h-screen text-gray-900 pb-20">
            {/* Minimal Header */}
            <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                        <Trophy className="w-3 h-3" />
                        Achievements
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Certificates
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                {certificates.length === 0 ? (
                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-4xl p-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-gray-300">
                            <Award className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-900">No certificates yet</h2>
                        <p className="text-gray-600 max-w-sm mb-8 text-sm">
                            Complete courses to earn official certificates and showcase your skills.
                        </p>
                        <Link
                            href="/courses"
                            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all text-sm"
                        >
                            Explore Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="group relative">
                                <div className="relative bg-white border border-gray-300 rounded-3xl overflow-hidden hover:border-purple-300 transition-all flex flex-col h-full">
                                    {/* Minimal Card Header */}
                                    <div className="aspect-video bg-gray-50 p-8 flex flex-col items-center justify-center relative">
                                        <Award className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="text-center space-y-1">
                                            <p className="text-[10px] text-gray-500 font-mono tracking-wider">{cert.certificateNumber}</p>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-6 flex flex-col flex-1 gap-6">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-purple-600 transition-colors">
                                                Course Certificate
                                            </h3>

                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Calendar className="w-3 h-3" />
                                                <span>{cert.metaData?.completionDate ? format(new Date(cert.metaData.completionDate), 'MMM d, yyyy') : format(new Date(cert.createdAt), 'MMM d, yyyy')}</span>
                                            </div>

                                            {/* Minimal Metadata */}
                                            {(cert.metaData?.score || cert.metaData?.grade) && (
                                                <div className="flex gap-2 pt-1">
                                                    {cert.metaData?.score && (
                                                        <span className="text-[10px] font-bold text-gray-600">SCORE: {cert.metaData.score}</span>
                                                    )}
                                                    {cert.metaData?.grade && (
                                                        <span className="text-[10px] font-bold text-green-600">GRADE: {cert.metaData.grade}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-200 flex gap-2">
                                            <a
                                                href={cert.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-widest text-gray-900"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                View
                                            </a>
                                            <a
                                                href={cert.certificateUrl}
                                                download
                                                className="w-9 h-9 bg-gray-100 hover:bg-purple-600 border border-gray-300 rounded-xl flex items-center justify-center transition-colors group/dl"
                                            >
                                                <Download className="w-3 h-3 text-gray-600 group-hover/dl:text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
