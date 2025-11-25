import { Search, Zap, Mail } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Daily Remote Job Listings",
      description: "Get curated remote-only positions delivered to your inbox daily. We scan thousands of opportunities to find the best matches for you.",
      available: true,
    },
    {
      icon: Zap,
      title: "Auto-Apply Technology",
      description: "Our system will automatically apply to relevant positions on your behalf, saving you hours of repetitive work.",
      available: false,
      comingSoon: true,
    },
    {
      icon: Mail,
      title: "H-1B Visa Filtering",
      description: "Find visa-friendly remote positions that offer H-1B sponsorship. Filter jobs specifically for international candidates.",
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to streamline your remote job search
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-card border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                step.available 
                  ? "border-primary/50 hover:border-primary" 
                  : "border-border/50 opacity-75"
              }`}
            >
              {/* Step number */}
              <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                step.available 
                  ? "bg-gradient-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {index + 1}
              </div>

              {/* Coming Soon Badge */}
              {step.comingSoon && (
                <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-accent border border-primary/30 text-xs font-semibold text-primary">
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                step.available ? "bg-accent" : "bg-muted"
              }`}>
                <step.icon className={`w-8 h-8 ${
                  step.available ? "text-accent-foreground" : "text-muted-foreground"
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-semibold mb-3 ${
                step.available ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
