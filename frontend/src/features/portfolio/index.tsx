/*
 * Portfolio Page — Main Component
 *
 * WHAT: The main portfolio/landing page combining all portfolio sections.
 * WHY:  This is the "/" route — the first page visitors land on.
 * HOW:  Composes HeroSection, SkillsSection, and ExperienceSection
 *       into a single scrollable page. Each section is a standalone
 *       component for maintainability.
 *
 * SEO:  Uses react-helmet-async to set page-specific <title> and
 *       <meta> tags for search engine discoverability.
 */

import { Helmet } from "react-helmet-async";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Eashwar Sai | Software Development Engineer @ BeautifulCode</title>
        <meta
          name="description"
          content="Portfolio of Eashwar Sai — Software Development Engineer at BeautifulCode specializing in React, TypeScript, GraphQL, and Python. Lead developer for enterprise solutions."
        />
        <meta property="og:title" content="Eashwar Sai | Software Development Engineer @ BeautifulCode" />
        <meta
          property="og:description"
          content="Software Development Engineer building scalable enterprise solutions with React, TypeScript & Python."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
    </>
  );
}
