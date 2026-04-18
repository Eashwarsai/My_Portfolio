import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`glass-card p-card hover:border-border-accent hover:shadow-card-hover transition-all duration-normal ${className}`}
    >
      {children}
    </div>
  );
}
