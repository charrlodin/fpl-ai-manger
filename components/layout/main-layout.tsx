"use client";

import { MobileSidebar, Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { useLivePoints, useTeamData } from "@/hooks/use-fpl-data";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

// Get page title from URL for dynamic page titles
function usePageTitle() {
  const [title, setTitle] = useState<string>('');
  
  useEffect(() => {
    // Get current path
    const path = window.location.pathname;
    
    // Remove leading and trailing slashes
    const cleanPath = path.replace(/^\/|\/$/g, '');
    
    // Convert to title case
    if (cleanPath) {
      const titleCased = cleanPath
        .split('/')
        .pop()
        ?.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      setTitle(titleCased || 'Dashboard');
    } else {
      setTitle('Dashboard');
    }
  }, []);
  
  return title;
}

export function MainLayout({ children, pageTitle }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:h-screen">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-fpl-purple/10 bg-white px-4 md:px-6 shadow-sm">
          <MobileSidebar />
          <div className="font-bold text-fpl-purple text-2xl">
            {pageTitle || usePageTitle()}
          </div>
          <div className="flex-1 md:flex-none font-bold text-fpl-purple text-lg md:hidden">FPL AI Manager</div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:block text-sm text-fpl-purple/80">
              Need to connect a different team?
            </div>
            {/* Reset connection button will be passed through props or context */}
            {typeof window !== 'undefined' && localStorage.getItem('fplTeamId') && (
              <a href="/connect-fpl" className="text-white bg-fpl-purple hover:bg-fpl-purple/90 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                Reset Connection
              </a>
            )}
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
