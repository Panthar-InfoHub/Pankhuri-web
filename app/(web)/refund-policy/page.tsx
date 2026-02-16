"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    LockKeyhole,
    AlertCircle,
    HandCoins,
    ShieldCheck,
    Building2,
    Mail
} from "lucide-react";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/5 via-primary/2 to-transparent -z-10" />
            <div className="absolute top-40 right-[-10%] w-[40%] h-[40%] bg-primary/3 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-40 left-[-10%] w-[40%] h-[40%] bg-accent/3 blur-[120px] rounded-full -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all font-medium text-sm tracking-wide">
                        Financial Transparency
                    </Badge>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground balance">
                        Refund / <span className="text-primary relative inline-block">
                            Cancellation
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0 50 5 Q 75 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span> Policy
                    </h1>
                </div>

                {/* Main Content Area */}
                <div className="space-y-12 pb-20">
                    <Card className="border-none shadow-xl shadow-black/[0.02] bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8 md:p-16 space-y-10">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <HandCoins className="w-8 h-8" />
                                </div>
                                <div className="space-y-4 max-w-2xl">
                                    <h2 className="text-2xl font-bold tracking-tight">Payment & Cancellation Terms</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Please make the payments after carefully reading all the terms & conditions as once the payment is initiated, it shall be considered final and cannot be cancelled.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
                                <div className="space-y-4 p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                                    <div className="flex items-center gap-3 text-destructive">
                                        <AlertCircle className="w-5 h-5" />
                                        <h3 className="font-bold uppercase text-xs tracking-widest">No Refunds</h3>
                                    </div>
                                    <p className="text-sm text-destructive/80 leading-relaxed font-medium">
                                        The company does not support refunds in any form for the payment transactions being enabled on the Platform.
                                    </p>
                                </div>

                                <div className="space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
                                    <div className="flex items-center gap-3 text-foreground/70">
                                        <Wallet className="w-5 h-5" />
                                        <h3 className="font-bold uppercase text-xs tracking-widest">Transaction Liability</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        If the User has entered the wrong number/VPA ID, then the Company is not a liable party in the transaction.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-none bg-primary/[0.03] rounded-3xl p-8 flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold">Encrypted Payments</h3>
                            <p className="text-sm text-muted-foreground">All transactions are processed through secure gateways like Razorpay/Stripe.</p>
                        </Card>

                        <Card className="border-none bg-accent/[0.03] rounded-3xl p-8 flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold">Contact Support</h3>
                            <p className="text-sm text-muted-foreground">Have questions about a charge? Reach out to <a href="mailto:support@pankhuri.co" className="text-primary hover:underline font-medium">support@pankhuri.co</a></p>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Trust Footer */}
            <footer className="w-full py-20 bg-muted/50 border-t border-border/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
                    <div className="flex justify-center -space-x-2">
                        {['P', 'A', 'N', 'K', 'H', 'U', 'R', 'I'].map((i, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i}</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <p className="text-foreground font-bold italic">Reliable Payments. Protected Learning.</p>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                            Our billing system is monitored to ensure transaction integrity and security.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}