
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative border-0 min-w-[10em] box-border appearance-none p-0",
  {
    variants: {
      variant: {
        default: cn(
          "[&_.button-top]:bg-primary [&_.button-top]:text-primary-foreground",
          "[&_.button-bottom]:bg-primary/80 [&_.button-bottom]:from-primary/90 [&_.button-bottom]:to-primary/70",
          "[&_.button-top::after]:bg-primary/90"
        ),
        destructive: cn(
          "[&_.button-top]:bg-destructive [&_.button-top]:text-destructive-foreground",
          "[&_.button-bottom]:bg-destructive/80 [&_.button-bottom]:from-destructive/90 [&_.button-bottom]:to-destructive/70",
          "[&_.button-top::after]:bg-destructive/90"
        ),
        outline: cn(
          "[&_.button-top]:bg-background [&_.button-top]:text-foreground",
          "[&_.button-bottom]:bg-muted [&_.button-bottom]:from-muted/90 [&_.button-bottom]:to-muted/70",
          "[&_.button-top::after]:bg-muted/90",
          "border border-input"
        ),
        secondary: cn(
          "[&_.button-top]:bg-secondary [&_.button-top]:text-secondary-foreground",
          "[&_.button-bottom]:bg-secondary/80 [&_.button-bottom]:from-secondary/90 [&_.button-bottom]:to-secondary/70",
          "[&_.button-top::after]:bg-secondary/90"
        ),
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="button-top relative z-0 flex items-center justify-center py-2 px-4 transform transition-transform duration-200 text-center select-none
          after:content-[''] after:absolute after:z-[-1] after:rounded after:w-full after:h-full after:box-content after:transition-[border-radius,padding,width,transform] after:duration-200">
          {children}
        </span>
        <span className="button-bottom absolute z-[-1] bottom-1 left-1 rounded-lg w-[calc(100%-8px)] h-[calc(100%-10px)] box-content pt-1.5
          bg-gradient-to-b shadow-[0_2px_3px_0_rgba(0,0,0,0.5),inset_0_-1px_3px_3px_rgba(0,0,0,0.4)]
          transition-[border-radius,padding-top] duration-200" />
        <span className="button-base absolute z-[-2] top-1 left-0 rounded-xl w-full h-[calc(100%-4px)]
          bg-black/15 shadow-[0_1px_1px_0_rgba(255,255,255,0.75),inset_0_2px_2px_rgba(0,0,0,0.25)]" />
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
