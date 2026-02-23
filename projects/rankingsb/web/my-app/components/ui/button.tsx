import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

/**
 * Button component with automatic contrast handling
 * Use 'primary' variant for CTA buttons (auto-adjusts text color)
 * Use 'outline' variant for secondary actions
 * Use 'ghost' for subtle actions
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary CTA - high contrast guaranteed
        default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
        
        // Destructive actions
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive",
        
        // Outline - adapts to background
        outline:
          "border-2 bg-transparent hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        
        // Secondary - subtle
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        
        // Ghost - minimal
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        
        // Link style
        link: "text-primary underline-offset-4 hover:underline",
        
        // High contrast variants for specific backgrounds
        "outline-dark":
          "border-2 border-white text-white hover:bg-white/10 focus-visible:ring-white",
        
        "outline-light":
          "border-2 border-slate-900 text-slate-900 hover:bg-slate-900/10 focus-visible:ring-slate-900",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-lg",
        xl: "h-14 rounded-lg px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
