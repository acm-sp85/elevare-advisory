"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
  index: number;
}

export function ServiceCard({ title, description, slug, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card hover:bg-accent/5 border border-border/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute top-8 right-8 text-muted-foreground/50 group-hover:text-secondary transition-colors">
        <ArrowUpRight className="h-6 w-6" />
      </div>
      
      <div className="h-full flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {description}
          </p>
        </div>
        
        <div 
          className="inline-flex text-sm font-semibold text-primary group-hover:text-secondary transition-colors items-center"
        >
          Learn more <span className="ml-2">→</span>
        </div>
      </div>
      
      {/* Absolute overlay link to make entire card clickable */}
      <Link href={`/services/${slug}`} className="absolute inset-0 z-10" aria-label={`Learn more about ${title}`} />
    </motion.div>
  );
}
