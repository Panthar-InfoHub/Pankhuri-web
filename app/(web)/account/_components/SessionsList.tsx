"use client";

import { useState, useEffect } from "react";
import { Session, getAllSessions, logoutSession, logoutAllSessions, logoutCurrentSession } from "@/lib/api/session";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Globe, LogOut, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { signOut } from "next-auth/react";

interface SessionsListProps {
    currentSessionId: string | null;
}

export function SessionsList({ currentSessionId }: SessionsListProps) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchSessions = async () => {
        try {
            const { data } = await getAllSessions();
            setSessions(data.sessions);
        } catch (error) {
            toast.error("Failed to fetch sessions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleLogoutSession = async (sessionId: string) => {
        setActionLoading(sessionId);
        try {
            if (sessionId === currentSessionId) {
                // Log out current session via NextAuth
                await logoutCurrentSession();
                signOut({ callbackUrl: "/login" });
            } else {
                await logoutSession(sessionId);
                setSessions(sessions.filter((s) => s.id !== sessionId));
                toast.success("Session terminated");
            }
        } catch (error) {
            toast.error("Failed to terminate session");
        } finally {
            setActionLoading(null);
        }
    };

    const handleLogoutAll = async () => {
        if (!confirm("Are you sure you want to log out from all devices? This will include your current session.")) return;

        setActionLoading("all");
        try {
            await logoutAllSessions();
            toast.success("All sessions terminated");
            signOut({ callbackUrl: "/login" });
        } catch (error) {
            toast.error("Failed to terminate all sessions");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-900/50 rounded-xl animate-pulse border border-gray-800" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Device Management</h3>
                    <p className="text-sm text-gray-500">You're currently signed in from these devices.</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogoutAll}
                    disabled={actionLoading === "all" || sessions.length === 0}
                    className="text-red-500 hover:text-white hover:bg-red-500/10 border-red-500/20 hover:border-red-500 transition-all text-xs font-semibold uppercase tracking-wider h-10 px-4"
                >
                    {actionLoading === "all" ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <LogOut className="w-3 h-3 mr-2" />}
                    Terminate All
                </Button>
            </div>

            <div className="grid gap-3">
                {sessions.map((session) => {
                    const isCurrent = session.id === currentSessionId;

                    return (
                        <div
                            key={session.id}
                            className={`group p-4 rounded-2xl border transition-all duration-300 ${isCurrent ? 'border-primary/30 bg-primary/5 shadow-[0_0_20px_rgba(var(--primary),0.05)]' : 'border-gray-800 bg-gray-950 hover:border-gray-700'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl transition-colors ${isCurrent ? 'bg-primary/20 text-primary' : 'bg-gray-900 text-gray-500 group-hover:text-gray-400 group-hover:bg-gray-800'}`}>
                                    {/* Since we don't have user agent in session data yet, we use Monitor as default */}
                                    <Monitor className="w-6 h-6" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-bold text-gray-200">
                                            {isCurrent ? "Current Active Device" : "Other Login Session"}
                                        </span>
                                        {isCurrent && (
                                            <Badge className="bg-primary/20 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                                                <ShieldCheck className="w-2.5 h-2.5 mr-1" />
                                                Trustworthy
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Globe className="w-3 h-3 text-gray-700" />
                                            Activity: {formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })}
                                        </span>
                                        <span className="text-gray-800 text-[10px]">|</span>
                                        <span className="text-[10px] text-gray-700 font-mono tracking-tighter">
                                            ID: {session.id.slice(-8)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center h-full">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleLogoutSession(session.id)}
                                        disabled={actionLoading === session.id}
                                        className={`h-11 w-11 rounded-xl transition-all ${isCurrent ? 'text-primary/40 hover:text-red-500 hover:bg-red-500/10' : 'text-gray-700 hover:text-red-500 hover:bg-red-500/10'}`}
                                        title={isCurrent ? "Logout from this device" : "Terminate session"}
                                    >
                                        {actionLoading === session.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <XCircle className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {sessions.length === 0 && !loading && (
                    <div className="text-center py-10 bg-gray-900/20 border border-dashed border-gray-800 rounded-2xl">
                        <ShieldCheck className="w-10 h-10 text-gray-800 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm">No other active sessions found.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
