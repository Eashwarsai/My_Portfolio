export default function HeroBackground() {
  return (
    <>
      {/* ── Background grid pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-accent-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-accent-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
                   bg-accent/5 blur-[100px] pointer-events-none"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                   bg-accent-secondary/5 blur-[100px] pointer-events-none"
      />
    </>
  );
}
