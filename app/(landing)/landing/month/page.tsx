"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Award,
  ChevronDown,
  MessageCircle,
  Play,
  ShieldCheck,
  Video,
} from "lucide-react";
import { getPlans, initiateSubscription, verifySubscription } from "@/lib/api/plan";
import { event } from "@/lib/metaPixel";



export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/ETRUr8xgMLhCpWp575qqNO";

export type RailName = { title: string; batches: number };
export type Rail = {
  slug: string;
  name: string;
  count: number;
  recordings: number;
  heroTitle: string;
  image: string;
  names: RailName[];
};

export const TOTAL_COURSES = 2841;
export const TOTAL_RECORDINGS = 16136;

export const RAILS: Rail[] = [
  {
    slug: "nail-art",
    name: "Nail Art",
    count: 393,
    recordings: 1798,
    heroTitle: "Basic to Advance Nail Art Masterclass",
    image:
      "https://pub-163ea678a1014987bd1160088f03b89b.r2.dev/masterclass/1652428618936-cute-nails-mandala-art-pic-s6000x4000-455632-1020.jpg",
    names: [
      { title: "Basic to Advance Nail Art Masterclass", batches: 11 },
      { title: "7 Trending Nail Art Designs Masterclass", batches: 1 },
      { title: "Bridal Nail Art Masterclass", batches: 1 },
      { title: "5 Days 5 Nail Extensions Masterclass", batches: 1 },
      { title: "Basic Nail Art Masterclass", batches: 18 },
    ],
  },
  {
    slug: "makeup",
    name: "Makeup",
    count: 394,
    recordings: 1336,
    heroTitle: "Basic Makeup Artistry Masterclass",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    names: [
      { title: "Basic Makeup Artistry Masterclass", batches: 2 },
      { title: "Basic to Advance Makeup : Masterclass", batches: 17 },
      { title: "One Month Professional Hair And Makeup Masterclass", batches: 1 },
      { title: "Bridal Makeup Masterclass", batches: 6 },
    ],
  },
  {
    slug: "mehendi",
    name: "Mehendi",
    count: 259,
    recordings: 1201,
    heroTitle: "Professional Henna Masterclass",
    image:
      "https://pub-163ea678a1014987bd1160088f03b89b.r2.dev/MASTERCLASS/Professional-Henna.jpg",
    names: [
      { title: "Professional Henna Masterclass", batches: 1 },
      { title: "Basic to Advance Mehndi Masterclass", batches: 1 },
      { title: "Bridal Mehndi Masterclass", batches: 1 },
    ],
  },
  {
    slug: "resin",
    name: "Resin Art",
    count: 124,
    recordings: 1980,
    heroTitle: "Advanced Resin Art Masterclass",
    image:
      "https://pub-163ea678a1014987bd1160088f03b89b.r2.dev/MASTERCLASS/Advance-Resin-Art.jpg",
    names: [
      { title: "Advanced Resin Art Masterclass", batches: 2 },
      { title: "Resin Art Masterclass", batches: 1 },
      { title: "Special 3D Resin Art Masterclass", batches: 2 },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness",
    count: 128,
    recordings: 2817,
    heroTitle: "1 Month Zumba Fitness",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    names: [
      { title: "1 Month Zumba Fitness", batches: 56 },
      { title: "Yoga For Beginners", batches: 1 },
      { title: "Face Yoga Masterclass", batches: 2 },
    ],
  },
  {
    slug: "cooking",
    name: "Cooking",
    count: 567,
    recordings: 2218,
    heroTitle: "Baking Artistry",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    names: [
      { title: "Baking Artistry", batches: 1 },
      { title: "Special Baking Combo", batches: 22 },
      { title: "Basic to Advance Baking Masterclass", batches: 12 },
    ],
  },
  {
    slug: "fashion",
    name: "Fashion",
    count: 114,
    recordings: 326,
    heroTitle: "Hairstyling Masterclass",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    names: [
      { title: "Hairstyling Masterclass", batches: 3 },
      { title: "Basic to Advance Hairstyling Masterclass", batches: 3 },
    ],
  },
  {
    slug: "diy",
    name: "DIY",
    count: 193,
    recordings: 1223,
    heroTitle: "Professional Candle Making Masterclass",
    image:
      "https://pub-163ea678a1014987bd1160088f03b89b.r2.dev/MASTERCLASS/Professional-Candle-Making.jpg",
    names: [
      { title: "Professional Candle Making Masterclass", batches: 2 },
      { title: "Designer Candle Making Masterclass", batches: 2 },
    ],
  },
];

export function compactValue(name: string, courses: number, recs: number) {
  return `${name} · ${courses.toLocaleString("en-IN")} courses · ${recs.toLocaleString("en-IN")} recs`;
}

export function chipValue(name: string, courses: number, recs: number) {
  const rec =
    recs >= 1000
      ? `${(recs / 1000).toFixed(recs >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`
      : String(recs);
  return `${name} · ${courses}c · ${rec} recs`;
}

// --- Internal Helper Components ---

function Logo({ onPink }: { onPink?: boolean }) {
  return (
    <img
      src={onPink ? "/media/logo-white.png" : "/media/logo-transparent.png"}
      alt="pankhuri masterclass"
      width={220}
      height={40}
      className="mx-auto h-6 sm:h-6 w-auto object-contain"
    />
  );
}

export function formatPlanPrice(plan?: any): string {
  if (!plan) return "Rs. 299/-";
  const rawPrice = plan.discountedPrice || plan.price;
  if (!rawPrice) return "Rs. 299/-";
  const symbol = plan.currency === "INR" || !plan.currency ? "Rs." : plan.currency;
  const inRupees = rawPrice > 1000 ? Math.round(rawPrice / 100) : rawPrice;
  return `${symbol} ${inRupees.toLocaleString("en-IN")}/-`;
}

function PriceBlock({ priceText }: { priceText?: string }) {
  return (
    <div className="mt-1.5 sm:mt-2 text-center">
      <span className="block text-3xl sm:text-4xl font-extrabold tracking-tight">
        {priceText || "Rs. 299/-"}
      </span>
      <span className="mt-0.5 block text-xs sm:text-sm font-medium text-white/90">
        every month · cancel anytime
      </span>
    </div>
  );
}

function CtaButtons({
  onPay,
  loading,
  className,
}: {
  onPay: () => void;
  loading?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onPay}
      disabled={loading}
      className={`cursor-pointer ${className || ""}`}
    >
      {loading ? "Processing..." : "Enroll Now"}
    </button>
  );
}

function RailNameList({ names }: { names: Rail["names"] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="mt-3 space-y-1.5">
      {names.map((n) => {
        const extra = n.batches > 1;
        const isOpen = open === n.title;
        return (
          <li key={n.title} className="text-sm text-[#2a1238]">
            {extra ? (
              <button
                type="button"
                className="flex w-full items-start justify-between gap-2 text-left"
                onClick={() => setOpen(isOpen ? null : n.title)}
              >
                <span className="font-semibold leading-snug">{n.title}</span>
                <span className="shrink-0 text-xs font-medium text-[#6d5478]">
                  {n.batches} batches
                </span>
              </button>
            ) : (
              <span className="font-semibold leading-snug">{n.title}</span>
            )}
            {extra && isOpen ? (
              <ol className="mt-1 space-y-0.5 pl-3 text-xs text-[#6d5478]">
                {Array.from({ length: n.batches }, (_, i) => (
                  <li key={i}>Batch {i + 1}</li>
                ))}
              </ol>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function RailRow({ rail, skipImage }: { rail: Rail; skipImage?: boolean }) {
  const line = compactValue(rail.name, rail.count, rail.recordings);
  const [imgError, setImgError] = useState(false);

  return (
    <section className="[content-visibility:auto] [contain-intrinsic-size:320px] border-b border-[#f3d4e6] px-4 py-5">
      <h3 className="text-[13px] font-bold leading-tight text-[#6b2d91]">{line}</h3>
      {skipImage ? null : (
        <article className="relative mt-3 overflow-hidden rounded-2xl bg-[#2a1238]">
          {!imgError ? (
            <img
              src={rail.image}
              alt={rail.heroTitle}
              width={720}
              height={441}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="h-44 w-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="h-44 w-full bg-gradient-to-br from-[#8b3dcf] via-[#ec008c] to-[#ff4fa3] flex items-center justify-center p-4">
              <span className="text-white text-lg font-bold text-center">{rail.name} Masterclass</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <h4 className="absolute inset-x-0 bottom-0 p-2.5 text-left text-base font-extrabold leading-snug text-white line-clamp-2">
            {rail.heroTitle}
          </h4>
        </article>
      )}
      <RailNameList names={rail.names} />
    </section>
  );
}

// --- Main Monthly Landing Page Component ---

export default function LandingPage({
  planId,
  paymentUrl,
}: {
  planId?: string; // Optional: specify exact database plan ID to bypass dynamic API search
  paymentUrl?: string; // Optional: specify a direct external checkout URL (e.g. Razorpay Payment Page)
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const foldRef = useRef<HTMLElement>(null);

  const targetWhatsappUrl = WHATSAPP_COMMUNITY_URL;

  const [openDetails, setOpenDetails] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [monthlyPlan, setMonthlyPlan] = useState<any>(null);

  useEffect(() => {
    async function loadMonthlyPlan() {
      try {
        const res = await getPlans("whole_app");
        const plans = res?.data || [];
        const activePlans = plans.filter((p: any) => p.isActive !== false);
        const matched =
          activePlans.find(
            (p: any) =>
              p.subscriptionType === "monthly" ||
              p.slug?.toLowerCase().includes("monthly") ||
              p.name?.toLowerCase().includes("monthly")
          ) || activePlans[0];

        if (matched) {
          setMonthlyPlan(matched);
        }
      } catch (err) {
        console.warn("Failed to prefetch monthly plan details:", err);
      }
    }
    loadMonthlyPlan();
  }, []);

  useEffect(() => {
    const el = foldRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const headingText = "Get unlimited access with one membership";
  const stats = compactValue("All categories", TOTAL_COURSES, TOTAL_RECORDINGS);
  const displayPrice = formatPlanPrice(monthlyPlan);
  const stickyPrice = displayPrice;

  const loginUrl = `/login?callbackUrl=${encodeURIComponent("/landing/month")}`;

  async function handleEnroll() {
    // 1. If unauthenticated, redirect to login with callback URL that auto-enrolls upon login return
    if (status === "unauthenticated") {
      toast.info("Please login to enroll in your membership");
      const callbackUrl = `/landing/month?autoEnroll=true`;
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }

    if (status === "loading") return;

    // 2. If a direct static payment link is configured
    if (paymentUrl) {
      window.location.href = paymentUrl;
      return;
    }

    setEnrolling(true);

    try {
      // 1. Dynamically fetch whole_app plans from backend API if not preloaded
      let targetPlanId = planId || monthlyPlan?.id;

      if (!targetPlanId) {
        try {
          const res = await getPlans("whole_app");
          const plans = res?.data || [];
          const activePlans = plans.filter((p: any) => p.isActive !== false);

          const matched =
            activePlans.find(
              (p: any) =>
                p.subscriptionType === "monthly" ||
                p.slug?.toLowerCase().includes("monthly") ||
                p.name?.toLowerCase().includes("monthly")
            ) || activePlans[0];

          if (matched) {
            targetPlanId = matched.id;
            setMonthlyPlan(matched);
          }
        } catch (apiErr: any) {
          console.warn("Failed to fetch dynamic whole_app plans from API:", apiErr?.message || apiErr);
        }
      }


      // 3. Error handling if no valid monthly plan could be determined
      if (!targetPlanId) {
        toast.error("Monthly subscription plan is currently unavailable. Redirecting to plans page...");
        router.push("/plans?plan=monthly");
        return;
      }

      // Initiate subscription using the target monthly plan ID
      const { data: subData } = await initiateSubscription(targetPlanId);

      const options = {
        key: subData.keyId,
        subscription_id: subData.subscriptionId,
        amount: subData.amount,
        currency: subData.currency,
        name: "Pankhuri",
        description: subData.planName,
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        handler: async (response: any) => {
          try {
            toast.loading("Verifying payment...");
            await verifySubscription({
              subscriptionId: subData.subscriptionId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            toast.dismiss();
            toast.success("Subscription activated successfully!");
            router.push("/account");
          } catch (error) {
            toast.dismiss();
            console.error("Verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setEnrolling(false),
        },
      };

      try {
        event("InitiateCheckout", {
          content_name: subData.planName,
          content_ids: [targetPlanId],
          content_type: "product",
          value: subData.amount / 100,
          currency: subData.currency || "INR",
        });
      } catch (e) {}

      const { initiateRazorpayPayment } = await import("@/lib/razorpay");
      await initiateRazorpayPayment(options);
    } catch (error: any) {
      console.error("Enrollment error:", error);
      const errMsg = error?.response?.data?.message || error?.message;
      toast.error(errMsg || "Redirecting to plans...");
      router.push("/plans?plan=monthly");
    } finally {
      setEnrolling(false);
    }
  }

  // Auto-enroll handler: triggers automatically upon returning logged-in from /login
  useEffect(() => {
    if (status === "authenticated" && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("autoEnroll")) {
        window.history.replaceState({}, "", window.location.pathname);
        handleEnroll();
      }
    }
  }, [status]);

  function showMoreDetails() {
    setOpenDetails(true);
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById("pk-details")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    });
  }

  return (
    <div className={`bg-[#fff7fb] ${!openDetails ? "h-[100dvh] overflow-hidden" : "min-h-screen"}`}>
      <div className={`mx-auto max-w-md bg-white text-[#2a1238] shadow-xl ${!openDetails ? "h-[100dvh] overflow-hidden" : "min-h-screen overflow-x-hidden"}`}>
        
        {/* HERO / FOLD SECTION */}
        <section ref={foldRef} className="h-[100dvh] flex flex-col justify-between overflow-hidden">
          {/* Image Portion */}
          <div className="relative flex-1 min-h-0 w-full bg-[#ff4fa3]">
            <img
              src="/media/hero-nail.jpg"
              alt="Pankhuri Masterclass Hero"
              width={900}
              height={869}
              className="absolute inset-0 size-full object-cover object-top"
            />
            {/* Seamless gradient overlay ending in 100% solid #ff4fa3 at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent_0%,rgba(255,79,163,0.25)_35%,rgba(255,79,163,0.85)_75%,#ff4fa3_100%)] pointer-events-none" />
          </div>

          {/* Bottom Card Portion starting from 100% solid #ff4fa3 at top */}
          <div className="shrink-0 bg-[linear-gradient(180deg,#ff4fa3_0%,#ec008c_28%,#8b3dcf_68%,#6b2d91_100%)] px-5 pt-3 pb-3 text-white">
            <Logo onPink />
            <div className="mt-2 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold tracking-wide">
                <ShieldCheck className="size-3.5" />
                Trusted by 10 lakh learners
              </span>
            </div>

            <h1 className="my-2 mx-auto  text-center text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
              <span>Get unlimited access</span>
              <br />
              <span>with one membership</span>
            </h1>
            <p className="mt-1 text-center text-xs sm:text-sm font-semibold text-white/95">{stats}</p>

            <div className="mt-2 flex items-center justify-center gap-3 text-center text-xs sm:text-sm font-medium text-white/95">
              <span className="inline-flex items-center gap-1">
                <Award className="size-3.5 shrink-0" />
                <span>Certificate</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="size-3.5 shrink-0" />
                <span>Live Q&A</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1">
                <Video className="size-3.5 shrink-0" />
                <span>Recordings</span>
              </span>
            </div>

            <PriceBlock priceText={displayPrice} />

            <div className="mt-2.5 sm:mt-3">
              <CtaButtons
                onPay={handleEnroll}
                loading={enrolling}
                className="w-full rounded-2xl bg-white px-4 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-[#6b2d91] active:scale-95 transition-transform shadow-md disabled:opacity-80"
              />
            </div>

            <button
              type="button"
              className="mt-2 flex w-full items-center justify-center gap-1 py-0.5 text-xs font-medium text-white/90 hover:text-white cursor-pointer"
              onClick={showMoreDetails}
            >
              More details
              <ChevronDown className="size-4 animate-bounce" />
            </button>

            {status === "authenticated" ? (
              <Link
                href="/account"
                className="mt-0.5 block py-0.5 text-center text-[11px] font-medium text-white/90 hover:text-white underline"
              >
                Logged in as {session?.user?.name || "Member"} · Go to Account
              </Link>
            ) : (
              <Link
                href={loginUrl}
                className="mt-0.5 block py-0.5 text-center text-[11px] font-medium text-white/75 hover:text-white"
              >
                Already a member? Login
              </Link>
            )}
          </div>
        </section>

        {/* EXPANDABLE DETAILS SECTION */}
        {openDetails && (
          <div id="pk-details" className="bg-white">
            <section className="px-4 py-5">
              <p className="text-center text-sm font-semibold text-[#6b2d91]">{stats}</p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {RAILS.map((r) => (
                  <span
                    key={r.slug}
                    className="shrink-0 rounded-full bg-[#fff7fb] px-3 py-1.5 text-[11px] font-semibold text-[#2a1238]"
                  >
                    {chipValue(r.name, r.count, r.recordings)}
                  </span>
                ))}
              </div>
            </section>

            {/* WHATSAPP COMMUNITY */}
            <a
              href={targetWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group mx-4 flex items-center justify-between gap-3 rounded-2xl bg-[#075E54] px-4 py-3 text-white shadow-md transition-all hover:bg-[#128C7E] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
                  <svg
                    className="size-6 fill-white"
                    viewBox="0 0 360 362"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" />
                  </svg>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
                </div>

                <div className="min-w-0 text-left">
                  <h4 className="text-sm font-extrabold leading-tight text-white truncate">
                    Join Pankhuri WhatsApp Group
                  </h4>
                  <p className="text-xs font-medium text-white/80 truncate">
                    1.2 Lakh+ Women · Free Daily Doubt Solving
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-bold text-white group-hover:bg-white group-hover:text-[#075E54] transition-colors">
                Join Group
              </span>
            </a>

            {/* COURSE CATEGORIES (RAILS) */}
            {RAILS.map((rail) => (
              <RailRow key={rail.slug} rail={rail} />
            ))}

            {/* CERTIFICATE SAMPLE */}
            <section className="px-4 py-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#6b2d91]">
                Sample certificate
              </h3>
              <img
                src="/media/certificate.jpg"
                alt="Sample Pankhuri Masterclass certificate"
                width={900}
                height={900}
                className="mt-3 w-full rounded-xl border border-[#f3d4e6]"
              />
            </section>

            {/* VIDEO GLIMPSE */}
            <section className="px-4 pb-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#6b2d91]">
                Glimpse of Pankhuri Masterclass
              </h3>
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="relative mt-3 block w-full overflow-hidden rounded-xl bg-[#2a1238]"
              >
                <img
                  src="/media/glimpses.jpg"
                  alt="Glimpses of Pankhuri Masterclass"
                  width={900}
                  height={780}
                  className="aspect-video w-full object-cover object-top opacity-90"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-white text-[#ec008c] shadow-lg">
                    <Play className="size-6 fill-current" />
                  </span>
                </span>
              </button>

              {showVideo && (
                <iframe
                  className="mt-3 aspect-video w-full rounded-xl"
                  src="https://www.youtube-nocookie.com/embed/IZAyqe967hI?autoplay=1"
                  title="Glimpses of Pankhuri Masterclass"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#f3d4e6] px-5 py-8 text-xs text-[#6d5478]">
              <Logo />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-[#2a1238]">Company</p>
                  <Link className="mt-1 block hover:underline" href="/">
                    Home
                  </Link>
                  <Link className="block hover:underline" href="/about">
                    About
                  </Link>
                  <a className="block hover:underline" href="https://blogs.pankhuri.co" target="_blank" rel="noreferrer">
                    Blog
                  </a>
                </div>
                <div>
                  <p className="font-bold text-[#2a1238]">Social</p>
                  <a
                    className="mt-1 block hover:underline"
                    href="https://www.instagram.com/askpankhuri/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    className="block hover:underline"
                    href="https://www.facebook.com/AskPankhuri"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    className="block hover:underline"
                    href="https://www.youtube.com/c/AskPankhuri"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
                <Link href="/terms-of-service" className="hover:underline">Terms</Link>
                <Link href="/refund-policy" className="hover:underline">Refund</Link>
                {status === "authenticated" ? (
                  <Link href="/account" className="text-[#ec008c] font-semibold hover:underline">
                    My Account
                  </Link>
                ) : (
                  <Link href={loginUrl} className="text-[#ec008c] font-semibold hover:underline">
                    Members login
                  </Link>
                )}
              </div>
              <p className="mt-4">
                © {new Date().getFullYear()} Pankhuri Masterclass · since 2021
              </p>
            </footer>
            <div className="h-36" />
          </div>
        )}

        {/* STICKY BOTTOM BAR */}
        {sticky && (
          <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md">
            <div className="bg-[linear-gradient(165deg,#ff4fa3_0%,#ec008c_32%,#8b3dcf_72%,#6b2d91_100%)] flex min-h-[85px] items-center gap-3 px-4 py-3 text-white shadow-[0_-8px_30px_rgba(107,45,145,0.35)]">
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-extrabold leading-none">{stickyPrice}</p>
                <p className="truncate text-xs text-white/90">{headingText}</p>
              </div>
              <CtaButtons
                onPay={handleEnroll}
                loading={enrolling}
                className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#6b2d91] active:scale-95 transition-transform disabled:opacity-80"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
