import { serverApi } from "@/lib/api-server";
import { FAQSection } from "./FAQSection";

export async function FAQSectionWrapper() {
  try {
    const response = await serverApi("/api/faqs");
    const faqs = response?.data || [];
    if (faqs.length === 0) return null;
    return <FAQSection faqs={faqs} />;
  } catch (error) {
    console.error("Failed to fetch global FAQs:", error);
    return null;
  }
}

export function FAQSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 space-y-4">
      <div className="flex flex-col items-center mb-16 space-y-3">
        <div className="h-12 w-12 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="h-8 w-48 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
      <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
      <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  );
}
