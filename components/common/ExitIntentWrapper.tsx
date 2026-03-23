"use client"

import React, { lazy, Suspense } from "react"
import { useExitIntent } from "@/hooks/use-exit-intent"

const LazyExitIntentPopup = lazy(() => import('./ExitIntentPopup'))

export function ExitIntentWrapper() {
  const { showPopup, dismiss } = useExitIntent()

  return (
    <Suspense fallback={null}>
      {showPopup && (
        <LazyExitIntentPopup isOpen={showPopup} onClose={dismiss} />
      )}
    </Suspense>
  )
}
