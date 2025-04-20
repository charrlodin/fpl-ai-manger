import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FplButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const FplButton = React.forwardRef<HTMLButtonElement, FplButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseClasses = "font-bold transition-colors";
    
    const variantClasses = {
      default: "bg-fpl-green hover:bg-fpl-green/90 text-fpl-purple",
      outline: "border-2 border-fpl-purple text-fpl-purple hover:bg-fpl-purple/5",
      secondary: "bg-fpl-purple hover:bg-fpl-purple/90 text-white",
    };

    return (
      <Button
        className={cn(baseClasses, variantClasses[variant], className)}
        ref={ref}
        variant={variant === "default" ? "default" : "outline"}
        size={size}
        asChild={asChild}
        {...props}
      />
    );
  }
);

FplButton.displayName = "FplButton";

export { FplButton };
