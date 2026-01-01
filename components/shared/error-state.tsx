// components/shared/error-state.tsx

'use client';

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
    message?: string;
    reset?: () => void;
}

export function ErrorState({ message = "Something went wrong while fetching data.", reset }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-red-500/20 bg-red-500/5 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Oops! Error</h3>
            <p className="text-gray-400 mb-6 max-w-md">{message}</p>
            {reset && (
                <Button
                    onClick={() => reset()}
                    variant="outline"
                    className="flex items-center gap-2 border-white/10 hover:bg-white/5"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </Button>
            )}
        </div>
    );
}
