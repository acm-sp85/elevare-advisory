import { getSiteData } from "@/lib/fetch-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// Correct type definition for Page Props in Next.js 15+ (if using latest) or 14
// In Next.js 15, params is a Promise. To be safe across recent versions:
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const siteData = await getSiteData();
  return siteData.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const siteData = await getSiteData();
  const service = siteData.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} | Elevare Advisory`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const siteData = await getSiteData();
  const service = siteData.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/#services" 
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          {service.title}
        </h1>

        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-16">


  {/* Challenge Section - Side accent card */}
  <section className="relative bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl p-8 md:p-12 border-l-4 border-primary shadow-md">
    <div className="absolute top-8 right-8 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />
    <div className="text-lg text-foreground leading-relaxed relative z-10 space-y-6">
      {service.challenge.split('\n').map((paragraph, i) => (
        paragraph.trim() && (
          <p key={i}>
            {paragraph}
          </p>
        )
      ))}
    </div>
  </section>

  {/* Typical Situations */}
  <section>
    <h2 className="text-2xl font-semibold mb-8 text-foreground">Typical Situations</h2>
    <div className="space-y-4">
      {service.typicalSituations.map((item, i) => (
        <div key={i} className="flex items-start">
          <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mr-4 mt-0.5" />
          <p className="text-lg text-foreground/80">{item}</p>
        </div>
      ))}
    </div>
  </section>

  {/* What I Do Section */}
  <section>
    <h2 className="text-2xl font-semibold mb-8 text-foreground">What I Do</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {service.whatIDo.map((item, i) => (
        <div key={i} className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-primary font-bold">{i + 1}</span>
          </div>
          <p className="text-muted-foreground">{item}</p>
        </div>
      ))}
    </div>
  </section>

{/* Outcome - Geometric frame design */}
<section className="relative">
  {/* Subtle dot grid background */}
  <div className="absolute inset-0 opacity-60" style={{
    backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
    backgroundSize: '24px 24px'
  }} />
  
  {/* Header - centered with underline */}
  <div className="text-center mb-8 relative z-10">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
      The Outcome
    </h2>
    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
  </div>
  
  {/* Content container */}
  <div className="relative bg-background/50 backdrop-blur-sm border-2 border-dashed border-primary/30 rounded-2xl p-8 md:p-12 mx-8">
    {/* Outcome content */}
    <div className={`text-lg text-foreground/90 font-medium ${service.outcome.includes('\n') ? "text-left max-w-3xl space-y-4 mx-auto" : "text-center"}`}>
      {service.outcome.split('\n').map((line, i) => (
        <div key={i} className={`flex items-start gap-4 group ${!service.outcome.includes('\n') && "justify-center"}`}>
          {service.outcome.includes('\n') && (
            <div className="relative flex-shrink-0 mt-2">
              <div className="w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
              <div className="absolute inset-0 w-3 h-3 rounded-full border-2 border-primary animate-ping opacity-20" />
            </div>
          )}
          <p className="leading-relaxed">{line}</p>
        </div>
      ))}
    </div>
    
  </div>
            {/* Team Image Banner */}
  {/* <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
     <Image
      src={service.image || "/group horizontal.avif"}
      alt={`${service.title} illustration`}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 80vw"
    />
    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
  </div> */}
</section>
  


          
          <div className="flex justify-center pt-8">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
            >
              {service.cta || "Get in Touch"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
