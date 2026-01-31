"use client"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })
import { Loader2, AlertCircle, Play, Settings, Check, X } from "lucide-react"
import { getSession } from "next-auth/react"

interface DemoVideoPlayerProps {
    playbackUrl: string
    thumbnailUrl?: string
    title: string
    onClose: () => void
}

export function DemoVideoPlayer({ playbackUrl, thumbnailUrl, title, onClose }: DemoVideoPlayerProps) {
    const playerRef = useRef<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [hasStarted, setHasStarted] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Quality Control
    const [qualities, setQualities] = useState<{ id: number; height: string }[]>([])
    const [currentQuality, setCurrentQuality] = useState<number>(-1)
    const [showQualityMenu, setShowQualityMenu] = useState(false)
    const [hlsInstance, setHlsInstance] = useState<any>(null)

    useEffect(() => {
        setIsMounted(true)
        const fetchToken = async () => {
            const session: any = await getSession()
            if (session?.accessToken) {
                setToken(session.accessToken)
            }
            setLoading(false)
        }
        fetchToken()

        // Lock scroll
        document.body.style.overflow = 'hidden'

        return () => {
            // Unlock scroll
            document.body.style.overflow = 'unset'
        }
    }, [])

    if (!isMounted) return null;

    // Construct the stream URL same as main VideoPlayer
    // Backend URL + /api/stream/ + playbackUrl segment
    const getStreamUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith('http')) return path;

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
        const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;

        // Ensure it uses /api/stream/ prefix if not already present in the path
        if (cleanPath.startsWith('api/stream/')) {
            return `${cleanBase}/${cleanPath}`;
        }
        return `${cleanBase}/api/stream/${cleanPath}`;
    };

    const streamUrl = getStreamUrl(playbackUrl);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#010001]/95 backdrop-blur-xl animate-in fade-in duration-300">
            {/* Close button area */}
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all border border-white/10 z-50"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-5xl aspect-video relative group ring-1 ring-white/10 shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden bg-black z-10">
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010001]">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
                        <p className="text-gray-500 text-sm font-medium">Loading preview...</p>
                    </div>
                ) : (
                    <div className="w-full h-full relative group/player">
                        <ReactPlayer
                            ref={playerRef}
                            url={streamUrl}
                            controls={true}
                            playing={true}
                            width="100%"
                            height="100%"
                            onStart={() => setHasStarted(true)}
                            onReady={() => {
                                const hls = playerRef.current?.getInternalPlayer("hls")
                                if (hls) {
                                    setHlsInstance(hls)
                                    const updateLevels = () => {
                                        if (hls.levels && hls.levels.length > 0) {
                                            const levels = hls.levels.map((level: any, index: number) => ({
                                                id: index,
                                                height: level.height ? `${level.height}p` : `Level ${index}`,
                                            }))
                                            setQualities(levels)
                                        }
                                    }
                                    updateLevels()
                                    hls.on("hlsManifestParsed", updateLevels)
                                }
                            }}
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload',
                                        crossOrigin: 'anonymous',
                                        poster: thumbnailUrl,
                                    },
                                    forceHLS: true,
                                    hlsOptions: {
                                        xhrSetup: (xhr: any) => {
                                            if (token) {
                                                xhr.setRequestHeader("Authorization", `Bearer ${token}`)
                                            }
                                        },
                                    },
                                },
                            }}
                        />

                        {/* Quality Selector */}
                        {qualities.length > 0 && hasStarted && (
                            <div className="absolute top-4 right-4 z-30">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowQualityMenu(!showQualityMenu)}
                                        className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover/player:opacity-100"
                                    >
                                        <Settings className="w-5 h-5" />
                                    </button>

                                    {showQualityMenu && (
                                        <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                            <div className="p-2 border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest font-bold text-gray-500 px-2">Quality</div>
                                            <div className="py-1 max-h-60 overflow-y-auto">
                                                <button
                                                    onClick={() => { hlsInstance.currentLevel = -1; setCurrentQuality(-1); setShowQualityMenu(false); }}
                                                    className="w-full flex items-center justify-between px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors"
                                                >
                                                    <span className={currentQuality === -1 ? "text-purple-400 font-bold" : "text-gray-300"}>Auto</span>
                                                    {currentQuality === -1 && <Check className="w-3 h-3 text-purple-400" />}
                                                </button>
                                                {qualities.slice().reverse().map((q) => (
                                                    <button
                                                        key={q.id}
                                                        onClick={() => { hlsInstance.currentLevel = q.id; setCurrentQuality(q.id); setShowQualityMenu(false); }}
                                                        className="w-full flex items-center justify-between px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors"
                                                    >
                                                        <span className={currentQuality === q.id ? "text-purple-400 font-bold" : "text-gray-300"}>{q.height}</span>
                                                        {currentQuality === q.id && <Check className="w-3 h-3 text-purple-400" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="absolute bottom-6 left-6 pointer-events-none">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Previewing</p>
                    <h4 className="text-white font-bold text-lg">{title}</h4>
                </div>
            </div>
        </div>
    )
}
