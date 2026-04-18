import { ChevronDown } from "lucide-react";

export default function HeroScrollDown() {
  return (
    <div
      className="animate-fade-in opacity-0 stagger-5
                 absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
    >
      <a
        href="#experience"
        className="text-content-tertiary hover:text-accent transition-colors duration-normal flex justify-center"
        aria-label="Scroll down"
      >
        <ChevronDown
          size={24}
          className="animate-bounce"
        />
      </a>
    </div>
  );
}
