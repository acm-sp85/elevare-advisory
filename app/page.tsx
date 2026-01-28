import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import Image from "next/image";

import { getSiteData } from "@/lib/fetch-data";

export default async function Home() {
  const siteData = await getSiteData();

  return (
    <div>
      <Hero data={siteData.hero} />
      
      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6 text-foreground">{siteData.about.title}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {siteData.about.description}
              </p>
            </div>

            {/* Vertical Image */}
            <div className="relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
               <Image
                src="/group-vertical.avif"
                alt="Elevare Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive support throughout the deal lifecycle
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteData.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
