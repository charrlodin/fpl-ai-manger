import Link from "next/link";
import { FplButton } from "@/components/ui/fpl-button";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-fpl-purple/10 bg-white px-4 md:px-6 shadow-sm">
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-fpl-purple">FPL AI Manager</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <Link href="/sign-in">
              <FplButton variant="outline" size="sm">Sign In</FplButton>
            </Link>
            <Link href="/sign-up">
              <FplButton size="sm">Sign Up</FplButton>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-fpl-purple/10 bg-white py-6 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-fpl-purple/70">
            © 2025 FPL AI Manager
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-fpl-purple hover:text-fpl-purple/80">Terms</Link>
            <Link href="#" className="text-sm text-fpl-purple hover:text-fpl-purple/80">Privacy</Link>
            <Link href="#" className="text-sm text-fpl-purple hover:text-fpl-purple/80">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
