import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";
import { WaitlistForm } from "@/components/WaitlistForm";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // TODO: Analytics tracking - replace with actual analytics service
    console.log("[ANALYTICS] Page view: Landing page");
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <WhoItsFor />
      <WaitlistForm />
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-muted border-t border-border">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Only Remote. Built for remote job seekers worldwide.</p>
          <p className="mt-2">
            Need help? Contact us at{" "}
            <a href="mailto:hello@onlyremote.org" className="text-primary hover:underline">
              hello@onlyremote.org
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
