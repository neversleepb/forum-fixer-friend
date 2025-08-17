import * as React from "react"

import { cn } from "@/lib/utils"

export interface CyberTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CyberTextarea = React.forwardRef<HTMLTextAreaElement, CyberTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full bg-black/80 border border-cyber-green px-3 py-2 text-sm text-cyber-green placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan transition-all font-cyber-body resize-vertical",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CyberTextarea.displayName = "CyberTextarea"

export { CyberTextarea }