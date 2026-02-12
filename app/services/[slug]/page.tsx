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
          {/* Challenge Section */}
          <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
            {/* <h2 className="text-2xl font-semibold mb-6 text-primary">The Challenge</h2> */}
            <p className="text-lg text-foreground/80 leading-relaxed">
              {service.challenge}
            </p>
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


          {/* Team Image Banner */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
             <Image
              src={service.image || "/group horizontal.avif"} // Use specific image or fallback
              alt={`${service.title} illustration`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </div>

          {/* Outcome */}
          <section className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">The Outcome</h2>
            <div className={`text-lg opacity-90 font-medium ${service.outcome.includes('\n') ? "text-left inline-block max-w-3xl space-y-3" : "text-center"}`}>
              {service.outcome.split('\n').map((line, i) => (
                <div key={i} className={`flex items-start ${!service.outcome.includes('\n') && "justify-center"}`}>
                   {service.outcome.includes('\n') && (
                     <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-primary-foreground/80 flex-shrink-0" />
                   )}
                   <p>{line}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
