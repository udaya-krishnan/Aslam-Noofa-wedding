import { useEffect, useState } from "react";
import dividerImg from "@/assets/floral-divider.png";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  visible?: boolean;
}

const HeroSection = ({ visible = true }: HeroSectionProps) => {
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setHintVisible(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10 overflow-hidden">

      <div
        className="text-center max-w-lg mx-auto w-full"
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >

        {/* Bismillah */}
        <p
          className="font-serif text-gold-light text-sm tracking-[0.3em] uppercase mb-8 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>

        {/* Groom */}
        <h1
          className="font-display text-gold-gradient animate-soft-glow animate-fade-up"
          style={{
            fontSize: "clamp(4.5rem, 15vw, 7.5rem)",
            lineHeight: 1.15,
            paddingBlock: "0.15em",
            animationDelay: "0.6s",
          }}
        >
          Aslam
        </h1>

        <p
          className="font-serif text-ivory/70 text-sm sm:text-base leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.75s" }}
        >
          Beloved son of
          <br />
          Mohamed Ashraf & Shemeena
        </p>


        {/* Ampersand */}
        <p
          className="font-heading text-bougainvillea-light text-3xl my-6 italic animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          &
        </p>


        {/* Bride */}
        <h1
          className="font-display text-gold-gradient animate-soft-glow animate-fade-up"
          style={{
            fontSize: "clamp(4.5rem, 15vw, 7.5rem)",
            lineHeight: 1.15,
            paddingBlock: "0.15em",
            animationDelay: "1.2s",
          }}
        >
          Noofa
        </h1>

        <p
          className="font-serif text-ivory/70 text-sm sm:text-base leading-relaxed animate-fade-up"
          style={{ animationDelay: "1.35s" }}
        >
          Beloved daughter of
          <br />
          Muhammed Ali & Shareefa
        </p>


        {/* Floral Divider */}
        <div
          className="my-8 flex justify-center animate-fade-up"
          style={{ animationDelay: "1.6s" }}
        >
          <img
            src={dividerImg}
            alt="floral divider"
            className="w-56 sm:w-72 opacity-80"
          />
        </div>


        {/* Scroll Hint */}
        <div
          aria-hidden="true"
          className="flex flex-col items-center gap-2 mb-10"
          style={{
            opacity: hintVisible ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: "none",
            animation: "fade-up 1s ease-out 1.8s forwards",
            animationFillMode: "both",
          }}
        >
          <p className="font-serif text-[10px] tracking-[0.45em] uppercase text-ivory/40">
            Scroll
          </p>

          <div
            className="flex justify-center relative"
            style={{
              width: "24px",
              height: "40px",
              borderRadius: "12px",
              border: "1.5px solid rgba(212,175,55,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "7px",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.7)",
                animation: "scrollDot 2s ease-in-out infinite",
              }}
            />
          </div>

          <ChevronDown
            style={{
              width: "14px",
              height: "14px",
              color: "rgba(212,175,55,0.5)",
              animation: "chevronBounce 2s ease-in-out infinite",
            }}
          />
        </div>


        {/* Invitation Text */}
        <p
          className="font-serif text-ivory/80 text-lg sm:text-xl leading-relaxed tracking-wide animate-fade-up"
          style={{ animationDelay: "2.2s" }}
        >
          Together with their families
          <br />
          request the honour of your presence
          <br />
          to celebrate their sacred Wedding
        </p>

      </div>


      <style>{`
        @keyframes scrollDot {
          0% { 
            transform: translateY(0px);
            opacity: 1;
          }
          60% {
            transform: translateY(12px);
            opacity: 0.2;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @keyframes chevronBounce {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(4px);
            opacity: 1;
          }
        }
      `}</style>

    </section>
  );
};

export default HeroSection;