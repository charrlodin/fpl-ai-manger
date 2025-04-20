import { PublicLayout } from "@/components/layout/public-layout";
import { FplButton } from "@/components/ui/fpl-button";
import { FplCard, FplCardContent, FplCardDescription, FplCardHeader, FplCardTitle } from "@/components/ui/fpl-card";

export default function Home() {
  return (
    <PublicLayout>
      <div className="p-4 md:p-6">

        <div className="max-w-3xl mb-12">
          <h2 className="text-xl font-bold text-fpl-purple mb-3">Manage your FPL team with the power of AI</h2>
          <p className="text-muted-foreground mb-6">
            FPL AI Manager helps you make better Fantasy Premier League decisions using advanced analytics and AI-powered recommendations.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="/sign-up">
              <FplButton>Get Started</FplButton>
            </a>
            <a href="#features">
              <FplButton variant="outline">Learn More</FplButton>
            </a>
          </div>
        </div>
        
        <div id="features" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-12">
          <FplCard>
            <FplCardHeader>
              <FplCardTitle>AI Transfer Suggestions</FplCardTitle>
              <FplCardDescription>Data-driven recommendations</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <p className="text-sm text-gray-600">Get AI-powered transfer suggestions based on form, fixtures, and expected points.</p>
            </FplCardContent>
          </FplCard>
          
          <FplCard>
            <FplCardHeader>
              <FplCardTitle>Captain Optimization</FplCardTitle>
              <FplCardDescription>Make the right captain choice</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <p className="text-sm text-gray-600">Our AI analyzes historical data to help you pick the highest-scoring captain each week.</p>
            </FplCardContent>
          </FplCard>
          
          <FplCard>
            <FplCardHeader>
              <FplCardTitle>Price Predictions</FplCardTitle>
              <FplCardDescription>Stay ahead of price changes</FplCardDescription>
            </FplCardHeader>
            <FplCardContent>
              <p className="text-sm text-gray-600">Predict which players will rise or fall in price before it happens.</p>
            </FplCardContent>
          </FplCard>
        </div>
        
        <div className="my-12 text-center">
          <h2 className="text-2xl font-bold text-fpl-purple mb-6">Ready to improve your FPL rank?</h2>
          <a href="/sign-up">
            <FplButton>Sign Up Now</FplButton>
          </a>
        </div>
      </div>
    </PublicLayout>
  );
}
