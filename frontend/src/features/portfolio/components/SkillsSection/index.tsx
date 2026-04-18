import { skillCategories, levelColors, levelLabels } from "../../data/skillsData";
import type { Skill } from "../../data/skillsData";
import SkillCategoryCard from "./SkillCategoryCard";
import SectionWrapper from "../../../../components/common/SectionWrapper";

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" bgSecondary>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-display-sm font-display font-bold mb-4">
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="text-content-secondary max-w-lg mx-auto">
          Technologies I work with daily and ones I'm actively exploring.
          Hover over a skill to see proficiency level.
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-12">
        {(Object.keys(levelColors) as Skill["level"][]).map((level) => (
          <div key={level} className="flex items-center gap-2 text-sm text-content-tertiary">
            <span className={`w-2.5 h-2.5 rounded-full ${levelColors[level]}`} />
            {levelLabels[level]}
          </div>
        ))}
      </div>

      {/* Skill Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <SkillCategoryCard key={category.title} category={category} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
