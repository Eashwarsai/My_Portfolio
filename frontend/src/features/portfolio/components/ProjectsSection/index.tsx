/*
 * Portfolio Page — Projects Section
 *
 * WHAT: Grid layout showcasing personal and professional projects.
 * WHY:  Concrete evidence of skills. Projects prove you can build 
 *       and deliver real-world software.
 */

import { ExternalLink } from "lucide-react";
import { projects } from "../../data/projectsData";

// Native SVG replacement for Github icon to avoid lucide-react depreciation issues
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-surface/30">
      <div className="section-container">
        <div className="mb-16">
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            A collection of personal experiments and key professional contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex flex-col bg-surface border border-border-primary 
                         rounded-card overflow-hidden hover:border-accent/40 
                         transition-all duration-normal hover:shadow-glow-sm
                         animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-content-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-content-tertiary hover:text-accent transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-content-tertiary hover:text-accent transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-content-secondary text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold 
                                 bg-bg-primary text-content-tertiary rounded-full 
                                 border border-border-primary group-hover:border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
