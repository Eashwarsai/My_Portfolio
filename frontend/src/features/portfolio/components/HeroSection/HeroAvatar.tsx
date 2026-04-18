export default function HeroAvatar() {
  return (
    <div className="relative inline-flex items-center justify-center mb-8 animate-fade-in opacity-0">
      {/* Fuzzy ambient glow / orbs behind the image */}
      <div className="absolute inset-0 bg-accent/40 blur-3xl rounded-full scale-125 animate-pulse" />
      <div className="absolute -inset-4 bg-gradient-to-tr from-accent/50 to-accent-secondary/50 blur-2xl opacity-60 rounded-full animate-[spin_8s_linear_infinite] z-0" />
      
      {/* Main Avatar Container */}
      <div 
        className="relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-full p-[3px] 
                   bg-gradient-to-br from-accent to-accent-secondary
                   shadow-glow transition-transform duration-normal hover:scale-105
                   group cursor-pointer"
      >
        <img 
          src="https://github.com/eashwarsai.png" 
          alt="Eashwar Sai" 
          className="w-full h-full object-cover rounded-full border-[4px] border-bg-primary bg-surface transition-all duration-normal"
        />  
      </div>
    </div>
  );
}
