import { GraduationCap, Briefcase, Globe, Code } from "lucide-react";

export const WhoItsFor = () => {
  const audiences = [
    {
      icon: Globe,
      title: "Remote Work Seekers",
      description: "Anyone looking for location-independent career opportunities with flexible work arrangements.",
      comingSoon: false,
    },
    {
      icon: Briefcase,
      title: "Career Professionals",
      description: "From entry-level to senior roles, we cover Analyst, Operations, Business, Product, and PM positions.",
      comingSoon: false,
    },
    {
      icon: Code,
      title: "Tech Professionals",
      description: "Engineers, developers, and data professionals seeking remote opportunities worldwide.",
      comingSoon: false,
    },
    {
      icon: GraduationCap,
      title: "International Students",
      description: "Need H-1B sponsorship? We specialize in finding visa-friendly remote positions across the US.",
      comingSoon: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Who It's For
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for remote job seekers at every career stage
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-xl bg-card border transition-all duration-300 hover:shadow-md text-center ${
                audience.comingSoon 
                  ? "border-border/50 opacity-75" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Coming Soon Badge */}
              {audience.comingSoon && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent border border-primary/30 text-xs font-semibold text-primary whitespace-nowrap">
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                audience.comingSoon ? "bg-muted" : "bg-accent"
              }`}>
                <audience.icon className={`w-7 h-7 ${
                  audience.comingSoon ? "text-muted-foreground" : "text-accent-foreground"
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-lg font-semibold mb-2 ${
                audience.comingSoon ? "text-muted-foreground" : "text-foreground"
              }`}>
                {audience.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional info callout with continuous slider */}
        <div className="mt-12 p-6 rounded-xl bg-accent/50 border-2 border-primary/20 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-foreground font-medium whitespace-nowrap">🎯 Covering roles in:</span>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex scroll-continuous whitespace-nowrap">
              {/* First set of roles */}
              <div className="flex items-center gap-4 px-4">
                <span className="text-primary font-medium">Business Analysis</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Product Management</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Engineering</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Data Science</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Operations</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">HR</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Customer Service</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Finance</span>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-4 px-4">
                <span className="text-primary font-medium">Business Analysis</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Product Management</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Engineering</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Data Science</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Operations</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">HR</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Customer Service</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">Finance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
