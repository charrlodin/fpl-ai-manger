"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LivePointsDisplayProps {
  points: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showPulse?: boolean;
}

export function LivePointsDisplay({
  points,
  className,
  size = "md",
  showPulse = true,
}: LivePointsDisplayProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Create pulsing effect for live games
  useEffect(() => {
    if (showPulse) {
      const pulseInterval = setInterval(() => {
        setIsPulsing(prev => !prev);
      }, 2000);
      
      return () => clearInterval(pulseInterval);
    }
  }, [showPulse]);
  
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 font-bold", 
      sizeClasses[size],
      className
    )}>
      {showPulse && (
        <span 
          className={cn(
            "inline-block rounded-full bg-green-500", 
            size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-2.5 h-2.5",
            isPulsing ? "animate-pulse" : ""
          )} 
        />
      )}
      <span>{points}</span>
      <span className="text-fpl-purple/60 font-normal">pts</span>
    </div>
  );
}
