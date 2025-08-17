import * as React from "react"

import { cn } from "@/lib/utils"

export interface CyberSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const CyberSelect = React.forwardRef<HTMLSelectElement, CyberSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full bg-black/80 border border-cyber-green px-3 py-2 text-sm text-cyber-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan transition-all font-cyber-body",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
CyberSelect.displayName = "CyberSelect"

export { CyberSelect }