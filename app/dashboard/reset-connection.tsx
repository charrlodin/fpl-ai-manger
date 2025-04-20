"use client";

import { FplButton } from "@/components/ui/fpl-button";
import { useRouter } from "next/navigation";

export default function ResetConnection() {
  const router = useRouter();
  
  const handleReset = () => {
    try {
      // Remove the FPL team ID from localStorage
      localStorage.removeItem('fplTeamId');
      
      // Force a hard reload to clear any cached state
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error resetting connection:', error);
      alert('Failed to reset connection. Please try again.');
    }
  };
  
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-500 mb-2">Need to connect a different team?</p>
      <FplButton 
        variant="outline" 
        size="sm" 
        onClick={handleReset}
      >
        Reset Connection
      </FplButton>
    </div>
  );
}
