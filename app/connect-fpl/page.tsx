"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";
import { FplButton } from "@/components/ui/fpl-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConnectFplPage() {
  const [teamId, setTeamId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamId) {
      setError("Please enter your FPL Team ID");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      // In a real app, this would store the team ID in a database linked to the user
      // For now, we'll just store it in localStorage for demo purposes
      localStorage.setItem("fplTeamId", teamId);
      
      // Navigate back to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Error connecting FPL account:", err);
      setError("Failed to connect your FPL account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-fpl-purple mb-6">Connect Your FPL Account</h1>
        
        <FplCard className="mb-6">
          <FplCardHeader>
            <FplCardTitle>Link Your Fantasy Premier League Team</FplCardTitle>
            <FplCardDescription>Enter your FPL Team ID to connect your account</FplCardDescription>
          </FplCardHeader>
          <FplCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamId">FPL Team ID</Label>
                <Input
                  id="teamId"
                  placeholder="e.g. 1234567"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  className="border-fpl-purple/20"
                />
                <div className="text-sm text-muted-foreground">
                  To find your Team ID, go to the FPL website, click "My Team" and check the number in your URL:
                  <code className="block mt-1 p-2 bg-gray-100 rounded">
                    https://fantasy.premierleague.com/entry/<strong>{"{your-team-id}"}</strong>/
                  </code>
                </div>
              </div>
              
              {error && (
                <div className="text-sm font-medium text-red-500">
                  {error}
                </div>
              )}
              
              <FplButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Connecting..." : "Connect FPL Account"}
              </FplButton>
            </form>
          </FplCardContent>
        </FplCard>
        
        <FplCard>
          <FplCardHeader>
            <FplCardTitle>Why Connect Your FPL Account?</FplCardTitle>
            <FplCardDescription>Benefits of connecting your account</FplCardDescription>
          </FplCardHeader>
          <FplCardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>View your team stats and performance</li>
              <li>Get AI-powered transfer recommendations</li>
              <li>Receive optimal captain suggestions</li>
              <li>Track price changes for players in your team</li>
              <li>Compare your team against top managers</li>
            </ul>
          </FplCardContent>
        </FplCard>
      </div>
    </MainLayout>
  );
}
