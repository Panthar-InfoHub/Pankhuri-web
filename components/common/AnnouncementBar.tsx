import { serverApi } from "@/lib/api-server";
import { AnnouncementSlider } from "./AnnouncementSlider";
import { Suspense } from "react";

export async function AnnouncementBar() {
  try {
    const response = await serverApi("/api/brand-settings");
    console.log("Announcement response:", response);
    const announcements = response?.data?.announcements || [];
    const activeAnnouncements = announcements.filter((a: any) => a.isActive);

    if (activeAnnouncements.length === 0) return null;

    return <AnnouncementSlider announcements={activeAnnouncements} />;
  } catch (error) {
    console.error("Failed to fetch announcement bar data:", error);
    return null;
  }
}

export function AnnouncementBarWrapper() {
  return (
    <Suspense fallback={null}>
      <AnnouncementBar />
    </Suspense>
  );
}


