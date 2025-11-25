import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById("waitlist-form");
    formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 bg-gradient-subtle overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Logo/Brand */}
          <div className="inline-flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Only Remote" 
              className="w-24 h-24 md:w-32 md:h-32 animate-fade-in-pop"
              style={{ 
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto',
                mixBlendMode: 'normal'
              }}
            />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-fade-in">
            Your remote job search,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-fade-in-delay">
              automated
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get curated remote jobs delivered daily. Auto-apply and H-1B filtering coming soon.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Join the Waitlist
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={scrollToForm}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-accent transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};
