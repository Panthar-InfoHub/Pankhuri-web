"use client"

import { useState, useEffect, useCallback } from "react"

export function useExitIntent() {
  const [showPopup, setShowPopup] = useState(false)

  const dismiss = useCallback(() => {
    setShowPopup(false)
  }, [])

  useEffect(() => {
    // Desktop only — skip on mobile viewports
    if (typeof window === "undefined" || window.innerWidth < 768) return

    // If already shown in this session, skip
    if (sessionStorage.getItem("exit-intent-shown")) {
      return
    }

    // Desktop approach: mouseleave on document top edge
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true)
        // Mark as shown immediately and remove listener
        sessionStorage.setItem("exit-intent-shown", "true")
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  return { showPopup, dismiss }
}
