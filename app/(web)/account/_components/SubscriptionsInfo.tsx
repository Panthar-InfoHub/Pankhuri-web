"use client";

import { useState, useEffect } from "react";
import { SubscriptionStatus, getSubscriptionStatus, cancelSubscription, cancelSubscriptionImmediately } from "@/lib/api/subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, XCircle, AlertCircle, Loader2, Sparkles, ChevronRight, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

export function SubscriptionsInfo() {
    const [status, setStatus] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchStatus = async () => {
        try {
            const { data } = await getSubscriptionStatus();
            setStatus(data);
        } catch (error) {
            toast.error("Failed to fetch subscription status");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleCancel = async (id: string, immediately: boolean) => {
        const message = immediately
            ? "Are you sure you want to cancel immediately? You will lose access to premium features right away."
            : "Are you sure you want to cancel? You will keep access until the end of the current period.";

        if (!confirm(message)) return;

        setActionLoading(id);
        try {
            if (immediately) {
                await cancelSubscriptionImmediately(id);
            } else {
                await cancelSubscription(id);
            }
            toast.success("Subscription updated");
            fetchStatus();
        } catch (error) {
            toast.error("Failed to cancel subscription");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="grid gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse border border-gray-300" />
                ))}
            </div>
        );
    }

    const allSubscriptions = [
        ...(status?.wholeApp || []),
        ...(status?.categories || []),
        ...(status?.courses || []),
    ];

    return (
        <div className="space-y-6">


            {allSubscriptions.length === 0 && status?.hasActiveSubscription === false ? (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-2xl bg-gray-50">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No active subscriptions</h3>
                    <p className="text-sm text-gray-600">When you subscribe to a plan, it will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {allSubscriptions.map((sub) => (
                        <div
                            key={sub.id}
                            className="bg-white border border-gray-300 rounded-2xl overflow-hidden group hover:border-purple-300 transition-colors"
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-300">
                                            <Crown className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-gray-900">{sub.planName}</h3>
                                                <Badge className={`${sub.status === 'active' ? 'bg-green-100 text-green-700' :
                                                        sub.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-200 text-gray-700'
                                                    } border-none`}>
                                                    {sub.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                                                <span className="uppercase tracking-tighter text-[10px] font-bold py-0.5 px-2 bg-gray-100 rounded-md border border-gray-300 mr-2">
                                                    {sub.planType.replace('_', ' ')}
                                                </span>
                                                Managed via {sub.provider}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-xs text-gray-600 uppercase font-bold tracking-widest">Billing Cycle</p>
                                        <p className="text-gray-900 font-medium capitalize">{sub.subscriptionType}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Next Renewal
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {sub.currentPeriodEnd ? format(new Date(sub.currentPeriodEnd), 'MMMM dd, yyyy') : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <CreditCard className="w-3 h-3" />
                                            Payment Method
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 capitalize">
                                            {sub.provider} Checkout
                                        </p>
                                    </div>
                                    {sub.isTrial && (
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-purple-600 uppercase font-bold tracking-widest flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Trial Status
                                            </p>
                                            <p className="text-sm font-semibold text-purple-700">Active Free Trial</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {sub.planType === 'WHOLE_APP' && sub.status !== 'cancelled' && (
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <p className="text-xs text-gray-600 max-w-xs text-center sm:text-left">
                                        You can manage your subscription preferences here.
                                    </p>
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCancel(sub.id, false)}
                                            disabled={!!actionLoading}
                                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs h-9 flex-1 sm:flex-none"
                                        >
                                            End at period
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleCancel(sub.id, true)}
                                            disabled={!!actionLoading}
                                            className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white border-red-300 text-xs h-9 flex-1 sm:flex-none"
                                        >
                                            {actionLoading === sub.id ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                                            Cancel Now
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
