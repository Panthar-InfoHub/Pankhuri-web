"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { getPresignedUrl, uploadToS3, updateCurrentUser } from "@/lib/api/user";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentImage: string | null;
  displayName: string;
  onUploadSuccess: (newUrl: string) => void;
}

export function AvatarUpload({ currentImage, displayName, onUploadSuccess }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageKey, setImageKey] = useState(0); // Force re-render of image
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Step 1: Get presigned URL from backend
      // NOTE: The backend must generate a presigned URL with 'public-read' ACL
      // The DigitalOcean Space bucket must also allow public-read ACL
      const { data } = await getPresignedUrl(file.name, file.type);


      // Step 2: Upload file to S3 using the upload URL
      await uploadToS3(data.uploadUrl, file, file.type);

      // Step 3: Update user profile with the public URL
      const updateResponse = await updateCurrentUser({ profileImage: data.publicUrl });

      // Force image reload
      setImageKey((prev) => prev + 1);
      onUploadSuccess(data.publicUrl);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("❌ [Profile Upload] Upload failed:", error);

      // Check if it's an access denied error
      if (error instanceof Error && error.message.includes("AccessDenied")) {
        toast.error("Upload failed: Access denied. Please contact support.");
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative group">
      <Avatar className="w-20 h-20 border border-white/10">
        <AvatarImage
          key={`avatar-${imageKey}-${currentImage}`}
          src={currentImage ? `${currentImage}` : ""}
          alt={displayName}
          onError={(e) => {
            console.error("❌ [AvatarImage] Failed to load image:", currentImage, e);
          }}
          className="object-cover"
        />
        <AvatarFallback className="bg-linear-to-br from-zinc-800 to-zinc-900 text-xl font-semibold text-white">
          {displayName?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Loading overlay - always visible when uploading */}
      {isUploading && (
        <div className="absolute inset-0 rounded-full bg-black/80 flex flex-col items-center justify-center gap-2 z-10">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
          <span className="text-[10px] text-white font-medium">Uploading...</span>
        </div>
      )}

      {/* Hover overlay - only shows when not uploading */}
      {!isUploading && (
        <div
          className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="w-5 h-5 text-white" />
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
}
