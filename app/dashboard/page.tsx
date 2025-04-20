"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { useTeamData, useLivePoints } from "@/hooks/use-fpl-data";
import { formatCurrency, formatRank } from "@/lib/fpl-api";
import { useEffect, useState } from "react";
import ResetConnection from "./reset-connection";

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
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-fpl-purple">Your FPL Dashboard</h1>
        {teamData && (
          <div>
            <ResetConnection />
          </div>
        )}
      </div>
      
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
                <a href="/connect-fpl">Connect FPL Account</a>
              </FplButton>
            </div>
          </FplCardContent>
        </FplCard>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <FplCard>
            <FplCardHeader>
              <FplCardTitle>Team Value</FplCardTitle>
              <FplCardDescription>Your current team value</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <div className="text-2xl font-bold text-fpl-purple">
                {isLoading ? "Loading..." : 
                 teamData?.teamInfo?.teamValue ? formatCurrency(teamData.teamInfo.teamValue) : "--"}
              </div>
            </FplCardContent>
          </FplCard>
          
          <FplCard>
            <FplCardHeader>
              <FplCardTitle>Overall Rank</FplCardTitle>
              <FplCardDescription>Your position globally</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <div className="text-2xl font-bold text-fpl-purple">
                {isLoading ? "Loading..." : 
                  teamData?.teamInfo?.overallRank ? 
                  formatRank(teamData.teamInfo.overallRank) : 
                  teamData?.history?.entry?.overall_rank ? 
                  formatRank(teamData.history.entry.overall_rank) : "--"}
              </div>
            </FplCardContent>
          </FplCard>
          
          <FplCard>
            <FplCardHeader>
              <FplCardTitle>Gameweek Points</FplCardTitle>
              <FplCardDescription>Current gameweek performance</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <div className="text-2xl font-bold text-fpl-purple">
                {isLoadingLive ? "Loading..." : livePoints ?? "--"}
              </div>
              {livePoints !== teamData?.teamInfo?.gameweekPoints && (
                <div className="text-xs text-fpl-purple/60 mt-1">
                  Live updating during matches
                </div>
              )}
            </FplCardContent>
          </FplCard>
        </div>
      )}
      
      {teamData && (
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
      )}
    </MainLayout>
  );
}
