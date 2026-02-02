"use client"

import { useState } from "react"
import { Bug, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import apiClient from "@/lib/api-client"
import { Button } from "@/components/ui/button"

interface ProgressDebuggerProps {
    courseId: string
}

export function ProgressDebugger({ courseId }: ProgressDebuggerProps) {
    const [loading, setLoading] = useState(false)
    const [debugData, setDebugData] = useState<any>(null)
    const [showDebug, setShowDebug] = useState(false)

    const fetchDebugInfo = async () => {
        setLoading(true)
        try {
            const response = await apiClient.get(`/api/progress/courses/${courseId}/details`)
            setDebugData(response.data)
            setShowDebug(true)
        } catch (error: any) {
            setDebugData({
                error: true,
                message: error.message,
                response: error.response?.data
            })
            setShowDebug(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-8 border border-yellow-500/20 bg-yellow-500/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                        <Bug className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Progress Debugger</h3>
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Dev-Only Utility</p>
                    </div>
                </div>

                <Button
                    onClick={fetchDebugInfo}
                    disabled={loading}
                    variant="outline"
                    className="border-yellow-500/20 hover:bg-yellow-500/10 text-yellow-500 hover:text-yellow-400 font-bold text-xs px-4"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Fetch Details"}
                </Button>
            </div>

            {showDebug && debugData && (
                <div className="space-y-4">
                    <button
                        onClick={() => setShowDebug(!showDebug)}
                        className="w-full flex items-center justify-between py-2 text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors border-t border-yellow-500/10"
                    >
                        {showDebug ? "Hide Results" : "Show Results"}
                        {showDebug ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <div className="relative">
                        <pre className="bg-black/80 border border-white/5 rounded-xl p-4 overflow-auto max-h-[400px] text-[10px] text-green-400 font-mono leading-relaxed custom-scrollbar">
                            {JSON.stringify(debugData, null, 2)}
                        </pre>
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 border border-white/10 text-[8px] font-black text-white/50 uppercase tracking-widest">
                            JSON Output
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
