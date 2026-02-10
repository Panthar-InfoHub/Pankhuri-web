"use client"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })
import apiClient from "@/lib/api-client"
import { Loader2, AlertCircle, Play, Settings, Check } from "lucide-react"
import { toast } from "sonner"
import { getSession } from "next-auth/react"

interface VideoPlayerProps {
  videoId: string
  title: string
  thumbnailUrl?: string
  initialTimestamp?: number
  lessonId?: string
}

export function VideoPlayer({ videoId, title, thumbnailUrl, initialTimestamp = 0, lessonId }: VideoPlayerProps) {
  const playerRef = useRef<any>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Quality Control States
  const [qualities, setQualities] = useState<{ id: number; height: string }[]>([])
  const [currentQuality, setCurrentQuality] = useState<number>(-1) // -1 is Auto
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [hlsInstance, setHlsInstance] = useState<any>(null)

  // Progress Tracking Refs
  const lastSavedTimeRef = useRef(0)
  const isSavingRef = useRef(false)
  const hasSeekedInitial = useRef(false)

  useEffect(() => {
    setIsMounted(true)
    const fetchToken = async () => {
      const session: any = await getSession()
      if (session?.accessToken) {
        setToken(session.accessToken)
      }
    }
    fetchToken()
  }, [])

  useEffect(() => {
    const fetchStream = async () => {
      if (!videoId) return;
      try {
        setLoading(true)
        setError(null)

        // Fetch stream URL from our API
        const response = await apiClient.get(`/api/videos/${videoId}`)
        const data = response.data?.data

        if (response.data?.success && data?.streamUrl) {
          setStreamUrl(data.streamUrl)
          // Use provided token or session token
          if (data.token) setToken(data.token)
        } else {
          setError(response.data?.message || "Video stream not available")
        }
      } catch (err: any) {
        console.error("Video Load Error:", err)
        setError(err.response?.data?.message || err.message || "Failed to load video stream")
      } finally {
        setLoading(false)
      }
    }

    fetchStream()
  }, [videoId])

  const saveProgress = async (currentTime: number) => {
    if (!lessonId || isSavingRef.current) return;

    // Safety check: Don't save if we haven't actually moved 25s since last save
    if (Math.abs(currentTime - lastSavedTimeRef.current) < 25) return;

    isSavingRef.current = true;
    try {
      console.log(`[Video] Saving progress: ${Math.floor(currentTime)}s`);
      await apiClient.post(`/api/progress/lessons/${lessonId}/complete`, {
        currentTimestamp: Math.floor(currentTime)
      });
      lastSavedTimeRef.current = currentTime;
    } catch (error) {
      console.error("Failed to auto-save progress", error);
    } finally {
      isSavingRef.current = false;
    }
  };

  const onProgress = (state: { playedSeconds: number }) => {
    // Save progress periodically (every 30s)
    if (Math.abs(state.playedSeconds - lastSavedTimeRef.current) >= 30) {
      saveProgress(state.playedSeconds);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group shadow-2xl shadow-purple-500/5 border border-white/5">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010001] z-20">
          <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
          <p className="text-gray-500 text-sm font-medium animate-pulse">Preparing your session...</p>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Streaming Error</h3>
          <p className="text-gray-400 text-sm max-w-xs mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all border border-white/10"
          >
            Retry Connection
          </button>
        </div>
      ) : streamUrl ? (
        <div className="w-full h-full relative group/player">
          <ReactPlayer
            ref={playerRef}
            url={streamUrl}
            controls={true}
            playing={hasStarted}
            width="100%"
            height="100%"
            onStart={() => {
              setHasStarted(true);
              const hls = playerRef.current?.getInternalPlayer("hls")
              if (hls && !hls.autoStartLoad) {
                console.log("[Video] Intentional Play: Starting segment download...");
                hls.startLoad();
              }
              if (!hasSeekedInitial.current && initialTimestamp > 0) {
                playerRef.current?.seekTo(initialTimestamp, 'seconds');
                hasSeekedInitial.current = true;
              }
            }}
            onProgress={onProgress}
            onError={(e: any) => {
              console.error("Video Player Error:", e)
              if (!error) setError("Video playback was interrupted. Please check your connection.")
            }}
            onBuffer={() => console.log("Video is buffering...")}
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

                // Graceful HLS Error Handling
                hls.on("hlsError", (event: any, data: any) => {
                  if (data.fatal) {
                    switch (data.type) {
                      case "networkError":
                        console.warn("Fatal network error, attempting recovery...");
                        hls.startLoad();
                        break;
                      case "mediaError":
                        console.warn("Fatal media error, attempting recovery...");
                        hls.recoverMediaError();
                        break;
                      default:
                        console.error("Unrecoverable HLS error:", data);
                        setError("A playback error occurred. Please try refreshing.");
                        hls.destroy();
                        break;
                    }
                  }
                })
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
                  enableWorker: true,
                  autoStartLoad: false, // Don't download segments until play
                  lowLatencyMode: false,
                  backBufferLength: 30,
                  maxBufferLength: 30,
                  maxMaxBufferLength: 60,
                  xhrSetup: (xhr: any) => {
                    if (token) {
                      xhr.setRequestHeader("Authorization", `Bearer ${token}`)
                    }
                  },
                },
              },
            }}
          />

          {/* Quality Selector UI */}
          {qualities.length > 0 && hasStarted && (
            <div className="absolute top-4 right-4 z-30">
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover/player:opacity-100"
                  title="Video Quality"
                >
                  <Settings className={`w-5 h-5 ${showQualityMenu ? 'animate-spin-slow' : ''}`} />
                </button>

                {showQualityMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                    <div className="p-2 border-b border-white/5 bg-white/5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 px-2">Quality</p>
                    </div>
                    <div className="py-1 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => {
                          hlsInstance.currentLevel = -1
                          setCurrentQuality(-1)
                          setShowQualityMenu(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs text-left hover:bg-white/10 transition-colors"
                      >
                        <span className={currentQuality === -1 ? "text-purple-400 font-bold" : "text-gray-300"}>Auto</span>
                        {currentQuality === -1 && <Check className="w-3 h-3 text-purple-400" />}
                      </button>

                      {qualities.slice().reverse().map((q) => (
                        <button
                          key={q.id}
                          onClick={() => {
                            hlsInstance.currentLevel = q.id
                            setCurrentQuality(q.id)
                            setShowQualityMenu(false)
                          }}
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

          {!hasStarted && thumbnailUrl && (
            <div className="absolute inset-0 z-10">
              <img
                src={thumbnailUrl}
                className="w-full h-full object-cover"
                alt={title}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group/play cursor-pointer" onClick={() => setHasStarted(true)}>
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 transition-transform group-hover/play:scale-110">
                  <Play className="w-8 h-8 text-white fill-white ml-2" />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
