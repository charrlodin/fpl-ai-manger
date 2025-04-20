"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { useTeamLeagues } from "@/hooks/use-fpl-data";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LeaguesPage() {
  const [teamId, setTeamId] = useState<number | undefined>(undefined);
  
  // Get team ID from localStorage on component mount
  useEffect(() => {
    const storedTeamId = localStorage.getItem('fplTeamId');
    if (storedTeamId) {
      setTeamId(parseInt(storedTeamId));
    }
  }, []);
  
  // Fetch leagues data if team ID exists
  const { classicLeagues, h2hLeagues, isLoading, isError } = useTeamLeagues(teamId);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-fpl-purple">Your FPL Leagues</h1>
      </div>
      
      {!teamId ? (
        <FplCard className="mb-6">
          <FplCardHeader>
            <FplCardTitle>Connect Your FPL Account</FplCardTitle>
            <FplCardDescription>Link your Fantasy Premier League account to see your leagues</FplCardDescription>
          </FplCardHeader>
          <FplCardContent>
            <div className="py-6 flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-center">Connect your FPL team ID to view your leagues</p>
              <FplButton asChild>
                <Link href="/connect-fpl">Connect FPL Account</Link>
              </FplButton>
            </div>
          </FplCardContent>
        </FplCard>
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-fpl-purple/60">Loading your leagues...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-10">
              <p className="text-red-500">Error loading leagues. Please try again.</p>
            </div>
          ) : (
            <>
              <FplCard>
                <FplCardHeader>
                  <FplCardTitle>Classic Leagues</FplCardTitle>
                  <FplCardDescription>Your classic league competitions</FplCardDescription>
                </FplCardHeader>
                <FplCardContent>
                  {classicLeagues.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">You are not part of any classic leagues.</p>
                  ) : (
                    <div className="space-y-4">
                      {classicLeagues.map((league: any) => (
                        <div key={league.id} className="flex justify-between items-center p-3 border border-fpl-purple/10 rounded-md">
                          <div>
                            <h3 className="font-medium text-fpl-purple">{league.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Position: {league.entry_rank.toLocaleString()} of {league.entry_last_rank.toLocaleString()}
                            </p>
                          </div>
                          <FplButton size="sm" asChild>
                            <Link href={`/leagues/${league.id}`}>View</Link>
                          </FplButton>
                        </div>
                      ))}
                    </div>
                  )}
                </FplCardContent>
              </FplCard>
              
              <FplCard>
                <FplCardHeader>
                  <FplCardTitle>Head-to-Head Leagues</FplCardTitle>
                  <FplCardDescription>Your H2H league competitions</FplCardDescription>
                </FplCardHeader>
                <FplCardContent>
                  {h2hLeagues.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">You are not part of any head-to-head leagues.</p>
                  ) : (
                    <div className="space-y-4">
                      {h2hLeagues.map((league: any) => (
                        <div key={league.id} className="flex justify-between items-center p-3 border border-fpl-purple/10 rounded-md">
                          <div>
                            <h3 className="font-medium text-fpl-purple">{league.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Position: {league.entry_rank.toLocaleString()} of {league.entry_last_rank.toLocaleString()}
                            </p>
                          </div>
                          <FplButton size="sm" asChild>
                            <Link href={`/leagues/h2h/${league.id}`}>View</Link>
                          </FplButton>
                        </div>
                      ))}
                    </div>
                  )}
                </FplCardContent>
              </FplCard>
            </>
          )}
        </div>
      )}
    </MainLayout>
  );
}
