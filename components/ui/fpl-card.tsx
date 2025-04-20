import * as React from "react"
import { cn } from "@/lib/utils"

const FplCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-gray-200 shadow-sm overflow-hidden p-0 m-0 flex flex-col",
      className
    )}
    {...props}
  />
))
FplCard.displayName = "FplCard"

const FplCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-gradient-to-r from-fpl-purple to-fpl-purple/90 text-white p-4 m-0 relative",
      className
    )}
    {...props}
  />
))
FplCardHeader.displayName = "FplCardHeader"

const FplCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-bold text-lg leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
FplCardTitle.displayName = "FplCardTitle"

const FplCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-white/80 text-sm", className)}
    {...props}
  />
))
FplCardDescription.displayName = "FplCardDescription"

const FplCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
FplCardContent.displayName = "FplCardContent"

export { FplCard, FplCardHeader, FplCardTitle, FplCardDescription, FplCardContent }
