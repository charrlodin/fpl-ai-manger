"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { useLeagueStandings } from "@/hooks/use-fpl-data";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LeagueDetailPage({ params }: { params: { leagueId: string } }) {
  const leagueId = parseInt(params.leagueId);
  const [page, setPage] = useState(1);
  const [teamId, setTeamId] = useState<number | undefined>(undefined);
  
  // Get team ID from localStorage on component mount
  useEffect(() => {
    const storedTeamId = localStorage.getItem('fplTeamId');
    if (storedTeamId) {
      setTeamId(parseInt(storedTeamId));
    }
  }, []);
  
  // Fetch league standings data
  const { 
    standings, 
    leagueInfo, 
    hasNext, 
    isLoading, 
    isError 
  } = useLeagueStandings(leagueId, page);

  const nextPage = () => {
    if (hasNext) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/leagues" className="text-fpl-purple hover:text-fpl-purple/80">
          &larr; Back to Leagues
        </Link>
        <h1 className="text-2xl font-bold text-fpl-purple">
          {isLoading ? "Loading..." : leagueInfo?.name || "League Details"}
        </h1>
      </div>
      
      {isLoading ? (
        <div className="py-10 text-center">
          <p className="text-fpl-purple/60">Loading league data...</p>
        </div>
      ) : isError ? (
        <div className="py-10 text-center">
          <p className="text-red-500">Error loading league data. Please try again.</p>
        </div>
      ) : (
        <>
          <FplCard className="mb-6">
            <FplCardHeader>
              <FplCardTitle>{leagueInfo?.name}</FplCardTitle>
              <FplCardDescription>
                {leagueInfo?.created_by 
                  ? `Created by ${leagueInfo.created_by}` 
                  : "Classic League"
                }
              </FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <div className="text-sm text-muted-foreground">
                <p>League code: {leagueInfo?.league_code || "N/A"}</p>
                <p>Scoring type: Classic (Total points)</p>
              </div>
            </FplCardContent>
          </FplCard>
          
          <FplCard className="mb-6">
            <FplCardHeader>
              <FplCardTitle>Standings</FplCardTitle>
              <FplCardDescription>Page {page}</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-fpl-purple/10">
                    <tr>
                      <th className="px-4 py-2 text-left">Rank</th>
                      <th className="px-4 py-2 text-left">Team & Manager</th>
                      <th className="px-4 py-2 text-right">GW</th>
                      <th className="px-4 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fpl-purple/10">
                    {standings.map((entry: any) => {
                      const isCurrentTeam = teamId && entry.entry === teamId;
                      
                      return (
                        <tr 
                          key={entry.entry} 
                          className={isCurrentTeam ? "bg-fpl-purple/5" : ""}
                        >
                          <td className="px-4 py-3">{entry.rank}</td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">{entry.entry_name}</div>
                              <div className="text-muted-foreground">{entry.player_name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">{entry.event_total}</td>
                          <td className="px-4 py-3 text-right">{entry.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between mt-4">
                <FplButton 
                  variant="outline" 
                  size="sm"
                  onClick={prevPage}
                  disabled={page <= 1}
                >
                  Previous
                </FplButton>
                <FplButton 
                  variant="outline" 
                  size="sm"
                  onClick={nextPage}
                  disabled={!hasNext}
                >
                  Next
                </FplButton>
              </div>
            </FplCardContent>
          </FplCard>
        </>
      )}
    </MainLayout>
  );
}
