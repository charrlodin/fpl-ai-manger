import Link from "next/link";
import { Home, TrendingUp, Users, Settings, Menu, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("h-full bg-fpl-purple text-white", className)}>
      <div className="space-y-8 py-4 px-4">
        <div className="px-4 py-2">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            FPL AI Manager
          </h2>
        </div>
        <div className="py-2">

          <h2 className="mb-2 pl-4 text-lg font-semibold tracking-tight text-white">Menu</h2>
          <div className="space-y-1">
            <SignedIn>
              <Link href="/dashboard" className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-fpl-green hover:text-fpl-purple transition-colors">
                <Home className="mr-2 h-4 w-4" /> Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/" className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-fpl-green hover:text-fpl-purple transition-colors">
                <Home className="mr-2 h-4 w-4" /> Home
              </Link>
            </SignedOut>
            <NavItem href="/team" icon={<Users className="mr-2 h-4 w-4" />}>
              My Team
            </NavItem>
            <NavItem href="/transfers" icon={<TrendingUp className="mr-2 h-4 w-4" />}>
              Transfers
            </NavItem>
            <NavItem href="/analysis" icon={<Zap className="mr-2 h-4 w-4" />}>
              Performance
            </NavItem>
            <NavItem href="/leagues" icon={<Trophy className="mr-2 h-4 w-4" />}>
              Leagues
            </NavItem>
            <NavItem href="/settings" icon={<Settings className="mr-2 h-4 w-4" />}>
              Settings
            </NavItem>
          </div>

          <SignedOut>
            <div className="mt-8 space-y-1">
              <NavItem href="/sign-in" icon={null}>
                Sign In
              </NavItem>
              <NavItem href="/sign-up" icon={null}>
                Sign Up
              </NavItem>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="mt-8 space-y-1">
              <NavItem href="/sign-out">
                Sign Out
              </NavItem>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function NavItem({ href, icon, children }: NavItemProps) {
  return (
    <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-fpl-green" asChild>
      <Link href={href}>
        {icon}
        {children}
      </Link>
    </Button>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden bg-transparent border-fpl-purple text-fpl-purple hover:bg-fpl-purple/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 border-none">
        <ScrollArea className="h-full">
          <Sidebar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
