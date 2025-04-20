"use client";

import { MobileSidebar, Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { useLivePoints, useTeamData } from "@/hooks/use-fpl-data";
import { UserButton } from "@clerk/nextjs";

interface MainLayoutProps {
  children: React.ReactNode;
}

function GameweekDisplay() {
  const [teamConnected, setTeamConnected] = useState(false);
  const [teamId, setTeamId] = useState<number | null>(null);
  
  useEffect(() => {
    // Check if FPL team ID exists in localStorage
    // This needs to run on the client side
    if (typeof window !== 'undefined') {
      const storedTeamId = localStorage.getItem('fplTeamId');
      if (storedTeamId) {
        setTeamConnected(true);
        setTeamId(parseInt(storedTeamId));
      } else {
        setTeamConnected(false);
        setTeamId(null);
      }
    }
  }, []);
  
  // Get both team data and live points
  const { teamData } = useTeamData(teamId || undefined, false);
  const { gameweek, isLoading } = useLivePoints(teamId || undefined);
  
  // Only show gameweek info if team is connected and we have data
  if (!teamConnected || !gameweek) return null;
  
  // Get total points with fallbacks
  const totalPoints = teamData?.teamInfo?.totalPoints || 
                      teamData?.history?.entry?.total_points || 
                      teamData?.current?.entry_history?.total_points || '--';
                      
  return (
    <div className="text-sm text-fpl-purple/80 hidden md:block">
      {isLoading ? "Loading..." : `GW${gameweek} - Total: ${totalPoints.toLocaleString ? totalPoints.toLocaleString() : totalPoints} pts`}
    </div>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:h-screen">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-fpl-purple/10 bg-white px-4 md:px-6 shadow-sm">
          <MobileSidebar />
          <div className="flex-1 font-bold text-fpl-purple text-lg md:hidden">FPL AI Manager</div>
          <GameweekDisplay />
          <div className="ml-auto">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "border-2 border-fpl-purple",
                  userButtonBox: "h-10 w-10"
                }
              }}
            />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          {children}
        </main>
        <footer className="border-t border-fpl-purple/10 bg-white py-6 px-4 md:px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-fpl-purple/70">
              © 2025 FPL AI Manager
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-fpl-purple hover:text-fpl-purple/80">Terms</a>
              <a href="#" className="text-sm text-fpl-purple hover:text-fpl-purple/80">Privacy</a>
              <a href="#" className="text-sm text-fpl-purple hover:text-fpl-purple/80">Help</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
