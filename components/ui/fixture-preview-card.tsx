"use client";

import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { useEffect, useState } from "react";
import { useBootstrapData } from "@/hooks/use-fpl-data";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface FixturePreviewCardProps {
  className?: string;
}

export function FixturePreviewCard({ className }: FixturePreviewCardProps) {
  const { bootstrapData, isLoading } = useBootstrapData();
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [nextGameweek, setNextGameweek] = useState<number | null>(null);
  const [currentGameweek, setCurrentGameweek] = useState<number | null>(null);
  const [teamColors, setTeamColors] = useState<Record<number, string>>({});
  const [isLoadingFixtures, setIsLoadingFixtures] = useState(true);
  
  // Get fixtures data when bootstrap data is available
  useEffect(() => {
    if (bootstrapData) {
      // Set teams data
      const teamsData = bootstrapData.teams || [];
      setTeams(teamsData);
      
      // Create team colors map
      const colors: Record<number, string> = {};
      teamsData.forEach((team: any) => {
        const hue = (team.code * 137) % 360;
        colors[team.id] = `hsl(${hue}, 70%, 45%)`;
      });
      setTeamColors(colors);
      
      // Find current and next gameweek
      const events = bootstrapData.events || [];
      const current = events.find((gw: any) => gw.is_current);
      const next = events.find((gw: any) => gw.is_next);
      
      if (current) setCurrentGameweek(current.id);
      if (next) setNextGameweek(next.id);
      
      // Fetch fixtures
      setIsLoadingFixtures(true);
      fetch('/api/fpl/fixtures')
        .then(res => res.json())
        .then(data => {
          // Only keep fixtures for the next gameweek
          const nextFixtures = next ? data.filter((f: any) => f.event === next.id) : [];
          setFixtures(nextFixtures.slice(0, 3)); // Show only 3 fixtures as preview
          setIsLoadingFixtures(false);
        })
        .catch(err => {
          console.error('Error fetching fixtures:', err);
          setIsLoadingFixtures(false);
        });
    }
  }, [bootstrapData]);
  
  // Get team short name by ID
  const getTeamShortName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.short_name : `T${teamId}`;
  };
  
  // Get team color by ID
  const getTeamColor = (teamId: number) => {
    return teamColors[teamId] || '#888888';
  };
  
  return (
    <FplCard className={cn("h-full flex flex-col", className)}>
      <FplCardHeader className="bg-fpl-purple text-white">
        <FplCardTitle className="flex items-center gap-2">
          Upcoming Fixtures
          {nextGameweek && (
            <Badge className="bg-fpl-green text-fpl-purple">GW{nextGameweek}</Badge>
          )}
        </FplCardTitle>
        <FplCardDescription className="text-white/80">Next gameweek preview</FplCardDescription>
      </FplCardHeader>
      <FplCardContent className="flex-1 flex flex-col">
        {isLoading || isLoadingFixtures ? (
          <div className="py-3 flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-fpl-purple" />
          </div>
        ) : fixtures.length > 0 ? (
          <div className="flex flex-col justify-between h-full">
            <div className="flex-1 flex flex-col justify-evenly py-5">
              {fixtures.map((fixture) => (
                <div key={fixture.id} className="flex justify-center items-center">
                  <div className="flex items-center justify-center w-full">
                    <div className="flex-1 text-right font-semibold text-fpl-purple">
                      {getTeamShortName(fixture.team_h)}
                    </div>
                    <div className="mx-3 w-8 h-8 flex items-center justify-center rounded-full bg-fpl-purple text-white text-xs font-medium">
                      VS
                    </div>
                    <div className="flex-1 text-left font-semibold text-fpl-purple">
                      {getTeamShortName(fixture.team_a)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-5 flex justify-center">
              <FplButton variant="outline" size="sm" className="px-6" asChild>
                <Link href="/fixtures">View All Fixtures</Link>
              </FplButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-500">No fixtures found for the next gameweek.</p>
            </div>
            
            <div className="mt-5 flex justify-center">
              <FplButton variant="outline" size="sm" className="px-6" asChild>
                <Link href="/fixtures">View All Fixtures</Link>
              </FplButton>
            </div>
          </div>
        )}
      </FplCardContent>
    </FplCard>
  );
}
