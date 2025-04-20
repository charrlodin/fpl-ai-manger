"use client";

import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { useEffect, useState } from "react";
import { useTeamLeagues } from "@/hooks/use-fpl-data";
import { cn } from "@/lib/utils";
import { Loader2, Star, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface LeaguesPreviewCardProps {
  teamId?: number;
  className?: string;
}

export function LeaguesPreviewCard({ teamId, className }: LeaguesPreviewCardProps) {
  const { classicLeagues, h2hLeagues, isLoading } = useTeamLeagues(teamId);
  const [favoriteLeagues, setFavoriteLeagues] = useState<number[]>([]);
  const [newLeagueId, setNewLeagueId] = useState<string>("");
  const [isAddingLeague, setIsAddingLeague] = useState(false);
  
  // Load favorite leagues from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('fpl-favorite-leagues');
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites);
          setFavoriteLeagues(parsed);
        } catch (e) {
          console.error('Error parsing favorite leagues', e);
        }
      }
    }
  }, []);
  
  // Save favorite leagues to localStorage
  const saveFavorites = (favorites: number[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fpl-favorite-leagues', JSON.stringify(favorites));
      setFavoriteLeagues(favorites);
    }
  };
  
  // Toggle a league as favorite
  const toggleFavorite = (leagueId: number) => {
    const newFavorites = favoriteLeagues.includes(leagueId)
      ? favoriteLeagues.filter(id => id !== leagueId)
      : [...favoriteLeagues, leagueId];
    
    saveFavorites(newFavorites);
  };
  
  // Add league by ID
  const addLeague = () => {
    if (!newLeagueId || isNaN(parseInt(newLeagueId))) return;
    
    const leagueId = parseInt(newLeagueId);
    if (!favoriteLeagues.includes(leagueId)) {
      const newFavorites = [...favoriteLeagues, leagueId];
      saveFavorites(newFavorites);
      setNewLeagueId("");
    }
  };
  
  // Get favorite leagues to display
  const favoriteLeaguesToShow = favoriteLeagues
    .map(id => {
      const allLeagues = [...classicLeagues, ...h2hLeagues];
      return allLeagues.find(league => league.id === id);
    })
    .filter(league => league !== undefined) as any[];
  
  return (
    <FplCard className={cn("h-full flex flex-col", className)}>
      <FplCardHeader>
        <FplCardTitle>
          <span>My Leagues</span>
          <Badge className="bg-fpl-green text-fpl-purple ml-2">
            Favorites
          </Badge>
        </FplCardTitle>
        <FplCardDescription>
          Showing your favorite leagues
        </FplCardDescription>
      </FplCardHeader>
      <FplCardContent className="flex-1 flex flex-col h-full">
        <div className="flex flex-col justify-between h-full">
          {/* Add league by ID section */}
          <div>
            <p className="text-sm mb-2">Add league by ID:</p>
            <div className="flex gap-2">
              <Input 
                value={newLeagueId}
                onChange={(e) => setNewLeagueId(e.target.value)}
                placeholder="League ID" 
                className="h-9 flex-1" 
                type="number"
              />
              <FplButton 
                className="shrink-0 bg-fpl-green hover:bg-fpl-green/90 h-9 px-4" 
                onClick={addLeague}
                disabled={isAddingLeague || !newLeagueId}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </FplButton>
            </div>
          </div>
          
          <div className="flex-1 mt-5 mb-5">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-5 w-5 animate-spin text-fpl-purple" />
              </div>
            ) : favoriteLeaguesToShow.length > 0 ? (
              <div className="space-y-2 h-full flex flex-col justify-evenly">
                {favoriteLeaguesToShow.map((league) => (
                  <div key={league.id} className="flex items-center p-2 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-fpl-purple">
                        {league.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rank: {league.entry_rank?.toLocaleString() || "N/A"} 
                      </div>
                    </div>
                    
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" onClick={() => toggleFavorite(league.id)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-gray-500 flex items-center justify-center h-full">
                <div>
                  <p>No favorite leagues yet. Mark leagues</p>
                  <p>as favorites to see them here.</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <FplButton variant="outline" size="sm" className="px-6" asChild>
              <Link href="/leagues">Browse Leagues</Link>
            </FplButton>
          </div>
        </div>
      </FplCardContent>
    </FplCard>
  );
}
