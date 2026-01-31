"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, getCurrentUser } from "@/lib/api/user";
import { logoutCurrentSession } from "@/lib/api/session";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User as UserIcon, Shield, CreditCard, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AvatarUpload } from "./_components/AvatarUpload";
import { ProfileForm } from "./_components/ProfileForm";
import { SessionsList } from "./_components/SessionsList";
import { SubscriptionsInfo } from "./_components/SubscriptionsInfo";
import { toast } from "sonner";
import { parseJwt } from "@/lib/utils";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account");
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const { data } = await getCurrentUser();

      console.log("👤 [Account Page] Fetched user data:", data);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      toast.error("Failed to load account details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status]);

  // Extract sessionId from JWT if available
  const currentSessionId = (session as any)?.accessToken
    ? parseJwt((session as any).accessToken as string)?.sessionId ||
      parseJwt((session as any).accessToken as string)?.jti
    : null;

  const handleLogout = async () => {
    try {
      // First try to logout the session on the backend
      await logoutCurrentSession();
    } catch (error) {
      console.error("Backend logout failed, proceeding with local logout", error);
    } finally {
      // Always sign out locally
      signOut({ callbackUrl: "/" });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-white mx-auto" />
          <p className="text-zinc-400 text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white pb-20">
      {/* Minimalist Header */}
      <div className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <AvatarUpload
                currentImage={user.profileImage}
                displayName={user.displayName}
                onUploadSuccess={(url) => setUser({ ...user, profileImage: url })}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black"
                title="Active"
              />
            </div>

            <div className="flex-1 space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                {user.displayName}
              </h1>
              <p className="text-sm text-zinc-400">{user.email || user.phone}</p>
              <div className="flex items-center gap-2 pt-1">
                <Badge
                  variant="outline"
                  className="text-xs font-normal border-white/10 text-zinc-300"
                >
                  {user.role}
                </Badge>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 h-10 px-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          {/* Premium Tabs */}
          <TabsList className="bg-white/[0.03] border border-white/10 rounded-xl p-1 h-12 w-full md:w-auto inline-flex backdrop-blur-sm">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-6 text-zinc-400 data-[state=active]:shadow-lg transition-all duration-200 h-10 font-medium flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-6 text-zinc-400 data-[state=active]:shadow-lg transition-all duration-200 h-10 font-medium flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-6 text-zinc-400 data-[state=active]:shadow-lg transition-all duration-200 h-10 font-medium flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 outline-none">
            <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/5 px-6 sm:px-8 py-5">
                <CardTitle className="text-lg font-semibold text-white">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-zinc-400 text-sm">
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <ProfileForm user={user} onUpdate={(updated) => setUser(updated)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-6 outline-none">
            <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/5 px-6 sm:px-8 py-5">
                <CardTitle className="text-lg font-semibold text-white">Subscriptions</CardTitle>
                <CardDescription className="text-zinc-400 text-sm">
                  View and manage your active memberships
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <SubscriptionsInfo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 outline-none">
            <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/5 px-6 sm:px-8 py-5">
                <CardTitle className="text-lg font-semibold text-white">Active Sessions</CardTitle>
                <CardDescription className="text-zinc-400 text-sm">
                  Monitor your device access and security
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <SessionsList currentSessionId={currentSessionId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
