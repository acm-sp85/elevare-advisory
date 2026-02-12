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
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          {/* <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive support throughout the deal lifecycle
          </p> */}
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

      {/* Methodology Section */}
{/* Methodology Section */}
<section id="methodology" className="py-24 bg-muted/30">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Our Methodology
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
    </div>

    {/* Horizontal Split Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-border/30 rounded-3xl overflow-hidden shadow-xl">
      {siteData.methodology?.map((item: any, index: number) => (
        <div 
          key={item.id || index} 
          className="group relative bg-background p-10 md:p-12 hover:bg-muted/20 transition-all duration-500"
        >
          {/* Number Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {index + 1}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            {item.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {item.description}
          </p>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500"></div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}
