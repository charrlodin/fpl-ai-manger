import { MainLayout } from "@/components/layout/main-layout";
import { UserProfile } from "@clerk/nextjs";
import { TEXT_STYLES } from "@/lib/theme-utils";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className={`text-2xl ${TEXT_STYLES.heading}`}>Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto">
        <UserProfile 
          appearance={{
            elements: {
              card: "shadow-md border border-gray-200 rounded-lg overflow-hidden",
              headerTitle: "text-fpl-purple font-bold",
              headerSubtitle: "text-gray-600",
              formButtonPrimary: "bg-fpl-green hover:bg-fpl-green/90 text-fpl-purple",
            }
          }}
        />
      </div>
    </MainLayout>
  );
}
