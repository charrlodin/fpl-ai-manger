"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useBootstrapData } from "@/hooks/use-fpl-data";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FplButton } from "@/components/ui/fpl-button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Fixture {
  id: number;
  event: number; // gameweek
  finished: boolean;
  kickoff_time: string;
  minutes: number;
  team_h: number;
  team_a: number;
  team_h_score: number | null;
  team_a_score: number | null;
  team_h_difficulty: number;
  team_a_difficulty: number;
}

export default function FixturesPage() {
  const { bootstrapData, isLoading } = useBootstrapData();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [currentGameweek, setCurrentGameweek] = useState(1);
  const [selectedGameweek, setSelectedGameweek] = useState<string>("current");
  const [isFixturesLoading, setIsFixturesLoading] = useState(true);
  const [teamColors, setTeamColors] = useState<Record<number, string>>({});
  
  // Get fixtures data
  useEffect(() => {
    if (bootstrapData) {
      // Set teams lookup data
      const teamsData = bootstrapData.teams || [];
      setTeams(teamsData);
      
      // Create team colors map based on team_code
      const colors: Record<number, string> = {};
      teamsData.forEach((team: any) => {
        // Create a simple hash of team code to get a consistent color
        const hue = (team.code * 137) % 360;
        colors[team.id] = `hsl(${hue}, 70%, 45%)`;
      });
      setTeamColors(colors);
      
      // Find current gameweek
      const current = bootstrapData.events?.find((gw: any) => gw.is_current);
      if (current) {
        setCurrentGameweek(current.id);
      }
      
      // Fetch all fixtures
      setIsFixturesLoading(true);
      fetch('/api/fpl/fixtures')
        .then(res => res.json())
        .then(data => {
          setFixtures(data);
          setIsFixturesLoading(false);
        })
        .catch(err => {
          console.error('Error fetching fixtures:', err);
          setIsFixturesLoading(false);
        });
    }
  }, [bootstrapData]);
  
  // Filter fixtures based on selected gameweek
  const filteredFixtures = fixtures.filter((fixture) => {
    if (selectedGameweek === "current") {
      return fixture.event === currentGameweek;
    }
    if (selectedGameweek === "next") {
      return fixture.event === currentGameweek + 1;
    }
    if (selectedGameweek === "all") {
      return fixture.event >= currentGameweek;
    }
    return fixture.event === parseInt(selectedGameweek);
  });
  
  // Group fixtures by gameweek
  const fixturesByGameweek = filteredFixtures.reduce((acc, fixture) => {
    if (!acc[fixture.event]) {
      acc[fixture.event] = [];
    }
    acc[fixture.event].push(fixture);
    return acc;
  }, {} as Record<number, Fixture[]>);
  
  // Get team name by ID
  const getTeamName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : `Team ${teamId}`;
  };
  
  // Get team short name by ID
  const getTeamShortName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.short_name : `T${teamId}`;
  };
  
  // Get team color by ID
  const getTeamColor = (teamId: number) => {
    return teamColors[teamId] || '#888888';
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get difficulty badge class
  const getDifficultyBadge = (difficulty: number) => {
    switch(difficulty) {
      case 1: return "bg-green-500 hover:bg-green-600";
      case 2: return "bg-green-400 hover:bg-green-500";
      case 3: return "bg-yellow-500 hover:bg-yellow-600";
      case 4: return "bg-orange-500 hover:bg-orange-600";
      case 5: return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  // Convert difficulty to text
  const getDifficultyText = (difficulty: number) => {
    switch(difficulty) {
      case 1: return "Very Easy";
      case 2: return "Easy";
      case 3: return "Moderate";
      case 4: return "Difficult";
      case 5: return "Very Difficult";
      default: return "Unknown";
    }
  };
  
  // Generate gameweek tabs
  const gameweekTabs = () => {
    if (!bootstrapData?.events) return null;
    
    return (
      <Tabs defaultValue="current" onValueChange={setSelectedGameweek}>
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current GW</TabsTrigger>
          <TabsTrigger value="next">Next GW</TabsTrigger>
          <TabsTrigger value="all">All Future</TabsTrigger>
        </TabsList>
      </Tabs>
    );
  };
  
  // Print match status based on finished and kickoff time
  const getMatchStatus = (fixture: Fixture) => {
    if (fixture.finished) {
      return (
        <Badge variant="outline" className="bg-fpl-purple bg-opacity-10 text-fpl-purple">
          FT
        </Badge>
      );
    }
    
    if (!fixture.kickoff_time) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-500">
          TBD
        </Badge>
      );
    }
    
    const now = new Date();
    const kickoff = new Date(fixture.kickoff_time);
    
    if (now > kickoff && fixture.minutes > 0) {
      return (
        <Badge variant="default" className="bg-green-500 animate-pulse">
          LIVE {fixture.minutes}'
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700">
        Upcoming
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-fpl-purple">Fixtures</h1>
      </div>
      
      {isLoading || isFixturesLoading ? (
        <div className="py-10 text-center">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-fpl-purple" />
          </div>
          <p className="text-fpl-purple/60 mt-4">Loading fixtures...</p>
        </div>
      ) : (
        <>
          {gameweekTabs()}
          
          {Object.entries(fixturesByGameweek).map(([gameweek, gamesInGameweek]) => (
            <FplCard key={gameweek} className="mb-6">
              <FplCardHeader>
                <FplCardTitle className="flex items-center gap-2">
                  Gameweek {gameweek}
                  {currentGameweek === parseInt(gameweek) && (
                    <Badge className="bg-fpl-green text-fpl-purple">Current</Badge>
                  )}
                </FplCardTitle>
                <FplCardDescription>
                  {gamesInGameweek.length} fixture{gamesInGameweek.length !== 1 ? "s" : ""}
                </FplCardDescription>
              </FplCardHeader>
              <FplCardContent>
                <div className="space-y-4">
                  {gamesInGameweek.map((fixture) => (
                    <div key={fixture.id} className="flex flex-col md:flex-row md:items-center justify-between border-b border-fpl-purple/10 pb-3 pt-1 gap-2">
                      <div className="flex items-center space-x-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className={getDifficultyBadge(fixture.team_a_difficulty)}>
                                {fixture.team_h_difficulty}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Difficulty for {getTeamName(fixture.team_h)}: {getDifficultyText(fixture.team_a_difficulty)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <div className="flex items-center space-x-2">
                          <div className="text-right font-medium" style={{ color: getTeamColor(fixture.team_h) }}>
                            {getTeamShortName(fixture.team_h)}
                          </div>
                          <div className="flex items-center justify-center bg-fpl-purple text-white w-16 py-1 px-2 rounded">
                            {fixture.finished ? 
                              `${fixture.team_h_score || 0} - ${fixture.team_a_score || 0}` : 
                              fixture.kickoff_time ? 'vs' : 'TBD'
                            }
                          </div>
                          <div className="font-medium" style={{ color: getTeamColor(fixture.team_a) }}>
                            {getTeamShortName(fixture.team_a)}
                          </div>
                        </div>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className={getDifficultyBadge(fixture.team_h_difficulty)}>
                                {fixture.team_a_difficulty}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Difficulty for {getTeamName(fixture.team_a)}: {getDifficultyText(fixture.team_h_difficulty)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {getMatchStatus(fixture)}
                        <div className="text-sm text-muted-foreground whitespace-nowrap">
                          {fixture.kickoff_time ? formatDate(fixture.kickoff_time) : 'Date TBD'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FplCardContent>
            </FplCard>
          ))}
          
          {Object.keys(fixturesByGameweek).length === 0 && (
            <div className="text-center py-10">
              <p className="text-fpl-purple/60">No fixtures found for the selected filter.</p>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}
