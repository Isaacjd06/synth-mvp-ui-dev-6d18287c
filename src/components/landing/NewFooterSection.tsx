import GoogleSignInButton from "./GoogleSignInButton";

const NewFooterSection = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Curved top transition */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z"
            fill="#0f0f0f"
          />
        </svg>
      </div>

      <div className="bg-[#0f0f0f] pt-12 pb-8">
        <div className="container px-6">
          <div className="flex flex-row items-center justify-between gap-6">
            {/* Left - Google Sign In */}
            <GoogleSignInButton variant="footer" />

            {/* Right - Synth Description */}
            <p className="text-sm text-foreground/40 text-right max-w-xs">
              The AI automation brain that understands your business and builds workflows automatically.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooterSection;