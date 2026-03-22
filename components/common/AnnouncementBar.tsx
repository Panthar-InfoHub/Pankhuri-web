import { serverApi } from "@/lib/api-server";
import { AnnouncementSlider } from "./AnnouncementSlider";
import { Suspense } from "react";
import { FloatingWhatsApp } from "./FloatingWhatsApp"; // import

export async function AnnouncementBar() {
  try {
    const response = await serverApi("/api/brand-settings");
    const announcements = response?.data?.announcements || [];
    const activeAnnouncements = announcements.filter((a: any) => a.isActive);
    const whatsappLink = response?.data?.globalWhatsappLink;


    return (
      <>
        {activeAnnouncements.length > 0 && (
          <AnnouncementSlider announcements={activeAnnouncements} />
        )}
        <FloatingWhatsApp link={whatsappLink} />
      </>
    );
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


