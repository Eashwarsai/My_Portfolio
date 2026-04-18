import type { SkillCategory } from "../../data/skillsData";
import SkillBadge from "./SkillBadge";
import GlassCard from "../../../../components/common/GlassCard";

interface SkillCategoryCardProps {
  category: SkillCategory;
  idx: number;
}

export default function SkillCategoryCard({ category, idx }: SkillCategoryCardProps) {
  return (
    <GlassCard className={`group animate-fade-in-up opacity-0 stagger-${idx + 1}`}>
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex items-center justify-center w-10 h-10
                     rounded-button bg-accent/10 border border-accent/20
                     group-hover:bg-accent/20 group-hover:border-accent/40
                     transition-all duration-normal"
        >
          <category.icon size={20} className="text-accent" />
        </div>
        <h3 className="text-lg font-display font-semibold text-content-primary">
          {category.title}
        </h3>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </GlassCard>
  );
}
