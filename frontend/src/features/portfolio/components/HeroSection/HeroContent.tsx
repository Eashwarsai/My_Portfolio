export default function HeroContent() {
  return (
    <>
      <h1
        className="animate-fade-in opacity-0 stagger-1
                   font-display font-bold text-display-sm md:text-display lg:text-display-lg
                   mb-4"
      >
        Hi, I'm{" "}
        <span className="gradient-text">Eashwar Sai</span>
      </h1>

      <p
        className="animate-fade-in opacity-0 stagger-2
                   text-xl md:text-2xl text-content-secondary font-light mb-6
                   max-w-2xl mx-auto"
      >
        Software Development Engineer II{" "}
        <span className="text-accent">·</span> Full-Stack Developer
      </p>

      <p
        className="animate-fade-in opacity-0 stagger-3
                   text-base md:text-lg text-content-tertiary max-w-xl mx-auto mb-10
                   leading-relaxed"
      >
        Building scalable solutions with React, TypeScript &amp; Python.
        Passionate about clean architecture, performance, and shipping
        products that matter.
      </p>
    </>
  );
}
