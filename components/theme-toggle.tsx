"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative overflow-hidden rounded-full w-10 h-10 z-50 flex items-center justify-center",
        "bg-white/10 backdrop-blur-sm border-0 dark:bg-gray-800/30",
        "shadow-[3px_3px_6px_#d1d1d1,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#131313,-3px_-3px_6px_#272727]",
        "hover:shadow-[inset_3px_3px_6px_#d1d1d1,inset_-3px_-3px_6px_#ffffff] dark:hover:shadow-[inset_3px_3px_6px_#131313,inset_-3px_-3px_6px_#272727]",
        "transition-all duration-300",
      )}
    >
      <Sun
        className={cn(
          "h-5 w-5 rotate-0 scale-100 transition-all",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 rotate-90 scale-0 transition-all",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

