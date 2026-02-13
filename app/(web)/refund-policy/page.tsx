"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    LockKeyhole,
    RefreshCw,
    HelpCircle,
    ShieldCheck,
    Clock,
    AlertCircle,
    FileText,
    Mail,
    Building2,
    ChevronRight,
    HandCoins,
    CheckCircle2
} from "lucide-react";

export default function RefundPolicy() {
    const sections = [
        { id: "eligibility", title: "1. Refund Eligibility", icon: <CheckCircle2 className="w-5 h-5" /> },
        { id: "non-refundable", title: "2. Non-Refundable Items", icon: <LockKeyhole className="w-5 h-5" /> },
        { id: "process", title: "3. Request Process", icon: <RefreshCw className="w-5 h-5" /> },
        { id: "timelines", title: "4. Processing Timelines", icon: <Clock className="w-5 h-5" /> },
        { id: "disputes", title: "5. Dispute Resolution", icon: <ShieldCheck className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/5 via-primary/2 to-transparent -z-10" />
            <div className="absolute top-40 right-[-10%] w-[40%] h-[40%] bg-primary/3 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-40 left-[-10%] w-[40%] h-[40%] bg-accent/3 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all font-medium text-sm tracking-wide">
                        Financial Transparency
                    </Badge>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground balance">
                        Refund <span className="text-primary relative inline-block">
                            Policy
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0 50 5 Q 75 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        Standard guidelines regarding payment cancellations and refund requests for Pankhuri digital services.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Quick Nav Sidebar */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-4">Navigation</h3>
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-all group border border-transparent hover:border-primary/10"
                                    >
                                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                                            {section.icon}
                                        </div>
                                        <span className="font-medium text-sm">{section.title}</span>
                                    </a>
                                ))}
                            </div>

                            <Card className="bg-primary/5 border-primary/10 shadow-none">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <HelpCircle className="w-5 h-5" />
                                        <span className="font-bold text-sm">Payment Issue?</span>
                                    </div>
                                    <p className="text-xs text-primary/80 leading-relaxed">
                                        Experiencing a payment error or double charge? Let us help you immediately.
                                    </p>
                                    <a href="mailto:support@pankhuri.co" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                        Mail Support
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-24 pb-20">
                        {/* Core Policy Card */}
                        <section className="space-y-8">
                            <Card className="border-none shadow-xl shadow-black/[0.02] bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <HandCoins className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold tracking-tight">Our Commitment to Fairness</h2>
                                            <p className="text-muted-foreground leading-relaxed text-justify">
                                                At pankhuri.co, we strive to provide a seamless learning experience. We understand that technical issues can sometimes occur. Our refund policy is designed to protect our users in cases where the service promised is not delivered despite a successful payment.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <AlertCircle className="w-5 h-5 text-destructive" />
                                            <h4 className="font-black text-destructive text-sm uppercase tracking-widest">Primary Condition</h4>
                                        </div>
                                        <p className="text-sm text-destructive/80 font-medium leading-relaxed italic">
                                            "Refunds will strictly only be initiated if a User has successfully paid for a course or membership and the corresponding content remains locked or inaccessible due to technical failure on our platform."
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 1: Eligibility */}
                        <section id="eligibility" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">1. Refund Eligibility</h2>
                                <p className="text-muted-foreground">Scenarios where a refund request is considered valid.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Technical Lock", text: "Paid amount is debited but the course status is not 'Unlocked'." },
                                    { title: "Double Payment", text: "Successful double debit for the same course or subscription." },
                                    { title: "Invalid Invoice", text: "Payment finalized but no corresponding access credentials generated." },
                                    { title: "System Outage", text: "Prolonged server-side failure preventing content access post-payment." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border/50 group hover:border-primary/20 transition-all shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 font-bold border-primary text-primary">{i + 1}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-foreground">{item.title}</p>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 2: Non-Refundable */}
                        <section id="non-refundable" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">2. Non-Refundable Items</h2>
                                <p className="text-muted-foreground">Situations where refunds cannot be processed.</p>
                            </div>

                            <Card className="border-none bg-muted/30 rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-destructive">
                                                <LockKeyhole className="w-5 h-5" />
                                                <h4 className="font-bold uppercase text-xs tracking-widest">Fixed Sales</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Once a course is **unlocked and any portion of the content is consumed**, the transaction is considered final and non-refundable.
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-destructive">
                                                <Clock className="w-5 h-5" />
                                                <h4 className="font-bold uppercase text-xs tracking-widest">Time Limits</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Refund requests made after **48 hours** of the transaction date will not be entertained unless under exceptional circumstances verified by our team.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-background rounded-2xl border border-border/50 space-y-4">
                                        <p className="text-xs font-bold text-foreground">Other Non-Refundable scenarios:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["User error during purchase", "Change of mind", "Internet issues on user side", "Incompatible device"].map(tag => (
                                                <Badge key={tag} variant="secondary" className="bg-muted text-[10px] py-1 border-none">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 3: Process */}
                        <section id="process" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">3. Refund Request Process</h2>
                                <p className="text-muted-foreground">Standard steps to file a formal refund application.</p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { step: "Documentation", desc: "Gather your payment receipt, transaction ID, and a screenshot of the locked content screen." },
                                    { step: "Submission", desc: "Send an email to support@pankhuri.co with the subject 'Refund Request - [Your Order ID]'." },
                                    { step: "Verification", desc: "Our technical team will audit the account logs to confirm the content access status." },
                                    { step: "Approval", desc: "If the lock is verified, your refund will be approved and sent to the billing department." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-black group-hover:bg-primary transition-all group-hover:text-white">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 space-y-1 border-b border-border/50 pb-6">
                                            <p className="font-bold text-lg">{item.step}</p>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 4: Timelines */}
                        <section id="timelines" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">4. Processing Timelines</h2>
                                <p className="text-muted-foreground">Expected duration for funds to return to your account.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { title: "Audit Phase", time: "24-48 Hours", text: "Technical verification of access logs." },
                                    { title: "Approval", time: "1 Business Day", text: "Final authorization from finance." },
                                    { title: "Payout", time: "5-7 Bank Days", text: "Inter-bank transfer and settlement." }
                                ].map((item, i) => (
                                    <Card key={i} className="border-none bg-primary/[0.03] overflow-hidden text-center group">
                                        <CardContent className="p-8 space-y-4">
                                            <p className="text-[10px] uppercase font-black tracking-widest text-primary opacity-60">{item.title}</p>
                                            <p className="text-2xl font-black text-foreground">{item.time}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <p className="text-center text-xs text-muted-foreground italic">
                                * Timelines are dependent on the user's bank and payment gateway (Razorpay/Stripe) processing cycles.
                            </p>
                        </section>

                        {/* Section 5: Disputes */}
                        <section id="disputes" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5. Dispute Resolution</h2>
                                <p className="text-muted-foreground">Legal framework and contact information.</p>
                            </div>

                            <Card className="border-2 border-foreground rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <CardContent className="p-8 md:p-12 space-y-10 text-center">
                                    <div className="max-w-xl mx-auto space-y-6">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                            <ShieldCheck className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold uppercase tracking-tight">Official Resolution Desk</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            For any unresolved disputes regarding refunds or billing, please direct your communication to our registered office in Jhansi, Uttar Pradesh, governed under Indian Laws.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/50 text-foreground">
                                            <div className="flex flex-col gap-1 items-center">
                                                <Building2 className="w-4 h-4 text-primary" />
                                                <span className="text-xs font-bold uppercase opacity-60">Company address</span>
                                                <span className="text-sm font-medium">Room #1, 161, Chandra Shekhar Azad, Jhansi, UP</span>
                                            </div>
                                            <div className="flex flex-col gap-1 items-center">
                                                <Mail className="w-4 h-4 text-primary" />
                                                <span className="text-xs font-bold uppercase opacity-60">Direct Email</span>
                                                <span className="text-sm font-medium">support@pankhuri.co</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>

            {/* Trust Footer */}
            <footer className="w-full py-20 bg-muted/50 border-t border-border/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
                    <div className="flex justify-center -space-x-2">
                        {['P', 'A', 'N', 'K', 'H', 'U', 'R', 'I'].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i}</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <p className="text-foreground font-bold italic">Reliable Payments. Protected Learning.</p>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                            Our billing system is encrypted and monitored to ensure every rupee you spend is accounted for.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}