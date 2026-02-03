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
          <div className="p-4 rounded-xl bg-gray-100 border border-gray-300">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Email Address
              </Label>
              {user.isEmailVerified && (
                <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wide px-2 py-0.5 bg-emerald-100 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full ${user.isEmailVerified ? "bg-emerald-500" : "bg-gray-400"}`}
              />
              <span className="text-sm text-gray-900 font-medium">{user.email}</span>
            </div>
          </div>
        )}
        {user.phone && (
          <div className="p-4 rounded-xl bg-gray-100 border border-gray-300">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Phone Number
              </Label>
              {user.isPhoneVerified && (
                <span className="text-[10px] text-blue-700 font-semibold uppercase tracking-wide px-2 py-0.5 bg-blue-100 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full ${user.isPhoneVerified ? "bg-blue-500" : "bg-gray-400"}`}
              />
              <span className="text-sm text-gray-900 font-medium">{user.phone}</span>
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
              Display Name
            </Label>
            <Input
              id="displayName"
              placeholder="Enter your name"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="bg-white border-gray-300 focus:border-purple-500 focus:bg-white h-11 text-gray-900 placeholder:text-gray-500 transition-all rounded-xl"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
              Gender
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(val) => setFormData({ ...formData, gender: val })}
            >
              <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 h-11 text-gray-900 rounded-xl">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-xl">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="bg-white border-gray-300 focus:border-purple-500 focus:bg-white h-11 text-gray-900 transition-all rounded-xl"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="language" className="text-sm font-medium text-gray-700">
              Language Preference
            </Label>
            <Select
              value={formData.languagePreference}
              onValueChange={(val) => setFormData({ ...formData, languagePreference: val })}
            >
              <SelectTrigger className="bg-white border-gray-300 focus:border-purple-500 h-11 text-gray-900 rounded-xl">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 rounded-xl">
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
            className="bg-purple-600 text-white hover:bg-purple-700 h-11 px-8 font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
