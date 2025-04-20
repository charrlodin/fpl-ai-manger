"use client";

import { cn } from "@/lib/utils";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface SafetyScoreCardProps {
  safetyScore: number;
  arrowDirection: "green" | "red";
  currentPoints: number;
  averageScore: number;
  statusMessage: string;
  className?: string;
  isLoading?: boolean;
}

export function SafetyScoreCard({
  safetyScore,
  arrowDirection,
  currentPoints,
  averageScore,
  statusMessage,
  className,
  isLoading = false,
}: SafetyScoreCardProps) {
  // Safety score doesn't need to pulse as it's not technically live data
  
  return (
    <FplCard className={cn("relative overflow-hidden h-full flex flex-col", className)}>
      {/* Visual indicator in the corner */}
      <div 
        className={cn(
          "absolute top-0 right-0 w-0 h-0 border-t-[40px] z-10",
          arrowDirection === "green" 
            ? "border-t-green-500 border-l-transparent border-l-[40px]"
            : "border-t-red-500 border-l-transparent border-l-[40px]"
        )} 
      />
      
      <FplCardHeader className="bg-fpl-purple text-white">
        <FplCardTitle className="flex items-center gap-2">
          Safety Score
          {arrowDirection === "green" ? (
            <ArrowUpIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-5 w-5 text-red-500" />
          )}
        </FplCardTitle>
        <FplCardDescription className="text-white/80">Points needed to avoid a red arrow</FplCardDescription>
      </FplCardHeader>
      
      <FplCardContent className="flex-1 flex flex-col h-full justify-between py-5">
        {isLoading ? (
          <div className="h-16 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-gray-500">Current GW:</div>
                <div className="text-3xl font-bold text-fpl-green">
                  {currentPoints} pts
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">Average:</div>
                <div className="text-2xl font-medium text-gray-700">
                  {averageScore} pts
                </div>
              </div>
            </div>
            
            <div className="mt-7 mb-7">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Your Score</span>
                <span className="font-medium">FPL Average</span>
              </div>
              <Progress 
                value={Math.min(100, (currentPoints / Math.max(averageScore, 1)) * 100)} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-fpl-green" 
              />
            </div>
            
            <div className="mt-auto">
              <p className="font-medium flex items-center text-fpl-green">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                Above safety score by {Math.abs(safetyScore)} points
              </p>
            </div>
          </>
        )}
      </FplCardContent>
    </FplCard>
  );
}
