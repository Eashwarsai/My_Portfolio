import ExperienceHeader from "./ExperienceHeader";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "../../data/experienceData";
import SectionWrapper from "../../../../components/common/SectionWrapper";

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <ExperienceHeader />

      {/* Timeline */}
      <div className="max-w-narrow mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-[19px] top-0 bottom-0 w-px bg-border-secondary
                     md:left-1/2 md:-translate-x-px"
        />

        {experiences.map((exp, idx) => (
          <ExperienceCard key={exp.id} exp={exp} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
