import * as React from "react"

import { cn } from "@/lib/utils"

export interface CyberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full bg-black/80 border border-cyber-green px-3 py-2 text-sm text-cyber-green placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan transition-all font-cyber-body",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CyberInput.displayName = "CyberInput"

export { CyberInput }