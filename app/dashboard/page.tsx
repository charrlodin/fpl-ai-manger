"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { useTeamData, useLivePoints, useSafetyScore } from "@/hooks/use-fpl-data";
import { formatCurrency, formatRank } from "@/lib/fpl-api";
import { useEffect, useState } from "react";
import ResetConnection from "./reset-connection";
import { SafetyScoreCard } from "@/components/ui/safety-score-card";
import { FixturePreviewCard } from "@/components/ui/fixture-preview-card";
import { LeaguesPreviewCard } from "@/components/ui/leagues-preview-card";
import { LivePointsDisplay } from "@/components/ui/live-points-display";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [teamId, setTeamId] = useState<number | undefined>(undefined);
  
  // Get team ID from localStorage on component mount
  useEffect(() => {
    const storedTeamId = localStorage.getItem('fplTeamId');
    if (storedTeamId) {
      setTeamId(parseInt(storedTeamId));
    }
  }, []);
  
  // Fetch team data if ID exists
  const { teamData, isLoading, isError } = useTeamData(teamId);
  
  // Get live points data - this is more accurate during matches
  const { livePoints, gameweek, isLoading: isLoadingLive } = useLivePoints(teamId);
  
  // Get safety score - points needed to avoid dropping in rank
  const { 
    safetyScore, 
    arrowDirection, 
    currentGwPoints,
    averageScore,
    statusMessage,
    isLoading: isLoadingSafety 
  } = useSafetyScore(teamId);
  
  return (
    <MainLayout pageTitle="Dashboard">
      {/* Page title and reset connection are now in the header */}
      
      {teamData && (
        <div className={cn(
          "py-3 px-4 bg-fpl-purple text-white rounded-md mb-6",
          "border-l-4 border-fpl-green"
        )}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Gameweek {gameweek || '?'}</h2>
              <p className="text-sm text-white/80">Live FPL updates</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-white/80 mb-1 font-medium">Current GW Points</div>
              {isLoadingLive ? (
                <div className="w-24 h-12 bg-gray-100 animate-pulse rounded" />
              ) : (
                <LivePointsDisplay 
                  points={livePoints} 
                  size="lg"
                  className="text-3xl" 
                />
              )}
            </div>
          </div>
        </div>
      )}
      
      {!teamData ? (
        <FplCard className="mb-6">
          <FplCardHeader>
            <FplCardTitle>Connect Your FPL Account</FplCardTitle>
            <FplCardDescription>Link your Fantasy Premier League account to see your stats</FplCardDescription>
          </FplCardHeader>
          <FplCardContent>
            <div className="py-6 flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-center">Connect your FPL team ID to access personalized insights and recommendations</p>
              <FplButton asChild>
                <Link href="/connect-fpl">Connect FPL Account</Link>
              </FplButton>
            </div>
          </FplCardContent>
        </FplCard>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <FplCard>
              <FplCardHeader>
                <FplCardTitle>Team Value</FplCardTitle>
                <FplCardDescription>Value of your FPL team</FplCardDescription>
              </FplCardHeader>
              <FplCardContent>
                <div className="text-xl font-bold text-fpl-purple">
                  {isLoading ? "Loading..." : formatCurrency(teamData?.teamInfo?.teamValue || 0)}
                </div>
              </FplCardContent>
            </FplCard>
            
            <FplCard>
              <FplCardHeader>
                <FplCardTitle>Overall Rank</FplCardTitle>
                <FplCardDescription>Your position globally</FplCardDescription>
              </FplCardHeader>
              <FplCardContent>
                <div className="text-xl font-bold text-fpl-purple">
                  {isLoading ? "Loading..." : 
                    teamData?.teamInfo?.overallRank ? 
                    formatRank(teamData.teamInfo.overallRank) : 
                    teamData?.history?.current?.length ? 
                    formatRank(teamData.history.current[teamData.history.current.length - 1].overall_rank) : "--"}
                </div>
              </FplCardContent>
            </FplCard>
            
            <FplCard>
              <FplCardHeader>
                <FplCardTitle>Total Points</FplCardTitle>
                <FplCardDescription>Season performance</FplCardDescription>
              </FplCardHeader>
              <FplCardContent>
                <div className="text-xl font-bold text-fpl-purple">
                  {isLoading ? "Loading..." : 
                    teamData?.teamInfo?.totalPoints ? 
                    teamData.teamInfo.totalPoints : 
                    teamData?.history?.current?.length ? 
                    teamData.history.current[teamData.history.current.length - 1].total_points : "--"}
                </div>
              </FplCardContent>
            </FplCard>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <SafetyScoreCard
              safetyScore={safetyScore || 0}
              arrowDirection={arrowDirection || "red"}
              currentPoints={currentGwPoints || 0}
              averageScore={averageScore || 0}
              statusMessage={statusMessage || ""}
              isLoading={isLoadingSafety}
            />
            
            <FixturePreviewCard />
            
            <LeaguesPreviewCard teamId={teamId} />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <FplCard>
              <FplCardHeader>
                <FplCardTitle>Recommended Transfers</FplCardTitle>
                <FplCardDescription>Based on AI analysis</FplCardDescription>
              </FplCardHeader>
              <FplCardContent>
                <div className="py-6 flex flex-col items-center gap-4">
                  <p className="text-muted-foreground text-center">Transfer suggestions will appear here</p>
                  <FplButton>View Details</FplButton>
                </div>
              </FplCardContent>
            </FplCard>
            
            <FplCard>
              <FplCardHeader>
                <FplCardTitle>Captain Recommendation</FplCardTitle>
                <FplCardDescription>Best captain pick for next gameweek</FplCardDescription>
              </FplCardHeader>
              <FplCardContent>
                <div className="py-6 flex flex-col items-center gap-4">
                  <p className="text-muted-foreground text-center">Captain suggestions will appear here</p>
                  <FplButton>Set Captain</FplButton>
                </div>
              </FplCardContent>
            </FplCard>
          </div>
        </>
      )}
    </MainLayout>
  );
}
