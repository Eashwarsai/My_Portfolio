import type { Skill } from "../../data/skillsData";
import { levelColors, levelLabels } from "../../data/skillsData";

interface SkillBadgeProps {
  skill: Skill;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5
                 text-sm text-content-secondary
                 bg-bg-tertiary rounded-badge
                 border border-border-secondary
                 hover:border-border-accent hover:text-content-primary
                 hover:shadow-glow-sm
                 transition-all duration-fast cursor-default group/skill"
      title={`${skill.name} — ${levelLabels[skill.level]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${levelColors[skill.level]}`}
      />
      {skill.name}
    </span>
  );
}
