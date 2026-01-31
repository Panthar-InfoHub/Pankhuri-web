"use client";

import { useState } from "react";
import { User, updateCurrentUser } from "@/lib/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    gender: user.gender || "other",
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
    languagePreference: user.languagePreference || "en",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await updateCurrentUser(formData);
      onUpdate(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Identity Section (Read-only) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.email && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
                Email Address
              </Label>
              {user.isEmailVerified && (
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wide px-2 py-0.5 bg-emerald-500/10 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full ${user.isEmailVerified ? "bg-emerald-400" : "bg-zinc-600"}`}
              />
              <span className="text-sm text-white font-medium">{user.email}</span>
            </div>
          </div>
        )}
        {user.phone && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
                Phone Number
              </Label>
              {user.isPhoneVerified && (
                <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wide px-2 py-0.5 bg-blue-500/10 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full ${user.isPhoneVerified ? "bg-blue-400" : "bg-zinc-600"}`}
              />
              <span className="text-sm text-white font-medium">{user.phone}</span>
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="displayName" className="text-sm font-medium text-zinc-300">
              Display Name
            </Label>
            <Input
              id="displayName"
              placeholder="Enter your name"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="bg-white/[0.03] border-white/10 focus:border-white/30 focus:bg-white/[0.05] h-11 text-white placeholder:text-zinc-500 transition-all rounded-xl"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="gender" className="text-sm font-medium text-zinc-300">
              Gender
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(val) => setFormData({ ...formData, gender: val })}
            >
              <SelectTrigger className="bg-white/[0.03] border-white/10 focus:border-white/30 h-11 text-white rounded-xl">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 rounded-xl">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="dob" className="text-sm font-medium text-zinc-300">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="bg-white/[0.03] border-white/10 focus:border-white/30 focus:bg-white/[0.05] h-11 text-white transition-all rounded-xl"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="language" className="text-sm font-medium text-zinc-300">
              Language Preference
            </Label>
            <Select
              value={formData.languagePreference}
              onValueChange={(val) => setFormData({ ...formData, languagePreference: val })}
            >
              <SelectTrigger className="bg-white/[0.03] border-white/10 focus:border-white/30 h-11 text-white rounded-xl">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 rounded-xl">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="bg-white text-black hover:bg-white/90 h-11 px-8 font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
