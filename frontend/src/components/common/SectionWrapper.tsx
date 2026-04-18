import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
  bgSecondary?: boolean;
}

export default function SectionWrapper({ id, className = "", children, bgSecondary = false }: SectionWrapperProps) {
  return (
    <section id={id} className={`section-spacing ${bgSecondary ? "bg-bg-secondary/30" : ""} ${className}`}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
}
