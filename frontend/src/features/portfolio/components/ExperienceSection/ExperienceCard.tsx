import { Briefcase, Calendar, GraduationCap } from "lucide-react";
import type { Experience } from "../../data/experienceData";
import GlassCard from "../../../../components/common/GlassCard";

interface ExperienceCardProps {
  exp: Experience;
  idx: number;
}

export default function ExperienceCard({ exp, idx }: ExperienceCardProps) {
  const Icon = exp.type === "education" ? GraduationCap : Briefcase;

  return (
    <div
      className={`relative mb-12 last:mb-0
                 md:w-[calc(50%-2rem)]
                 ${idx % 2 === 0 ? "md:ml-auto md:pl-0" : "md:mr-auto md:pr-0"}
                 pl-12 md:pl-0`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-3 top-2 w-4 h-4 rounded-full
                   border-2 z-10
                   ${idx % 2 === 0 ? "md:-left-10" : "md:left-auto md:-right-10"}
                   ${
                     exp.type === "current"
                       ? "bg-accent border-accent shadow-glow-sm"
                       : "bg-bg-primary border-border-primary"
                   }`}
      />

      <GlassCard className={`animate-fade-in-up opacity-0 stagger-${idx + 1}`}>
        {/* Period badge */}
        <div className="flex items-center gap-2 text-xs text-content-tertiary mb-3">
          <Calendar size={14} />
          <span>{exp.period}</span>
          {exp.type === "current" && (
            <span
              className="ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase
                         tracking-wider bg-accent/10 text-accent rounded-badge
                         border border-accent/20"
            >
              Current
            </span>
          )}
        </div>

        {/* Title & Company */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-button
                       bg-accent/10 border border-accent/20
                       flex items-center justify-center mt-0.5"
          >
            <Icon size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-content-primary">
              {exp.title}
            </h3>
            <p className="text-sm text-content-secondary">{exp.company}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-content-secondary leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs text-accent
                         bg-accent-muted rounded-badge border border-accent/10"
            >
              {t}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
