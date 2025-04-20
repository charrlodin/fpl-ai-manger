import { SignIn } from "@clerk/nextjs";
import { COLORS } from "@/lib/theme-utils";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-fpl-purple">FPL AI Manager</h1>
        <p className="text-center text-gray-600">Sign in to access your dashboard</p>
      </div>
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-fpl-green hover:bg-fpl-green/90 text-fpl-purple",
            card: "shadow-md border border-gray-200",
            headerTitle: "text-fpl-purple font-bold",
            headerSubtitle: "text-gray-600",
          },
        }}
      />
    </div>
  );
}
