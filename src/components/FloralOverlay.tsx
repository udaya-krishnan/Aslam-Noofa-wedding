import { useState } from "react";
import floralOverlayImg from "@/assets/floral-overlay.jpg";

interface FloralOverlayProps {
  onOpen: () => void;
}

const FloralOverlay = ({ onOpen }: FloralOverlayProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleTap = () => {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleTap}
    >
      {/* Floral image layer */}
      <div
        className="absolute inset-0"
        style={{
          transition: "transform 1.8s ease, opacity 1.5s ease, filter 1.5s ease",
          transform: isOpening ? "scale(1.1)" : "scale(1)",
          opacity: isOpening ? 0 : 1,
          filter: isOpening ? "blur(6px)" : "blur(0px)",
        }}
      >
        <img
          src={floralOverlayImg}
          alt="Floral overlay"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Soft curtain reveal effect */}
      <div
        className="absolute inset-0 flex"
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="w-1/2 h-full"
          style={{
            background: `url(${floralOverlayImg}) center/cover`,
            transition: "transform 1.8s cubic-bezier(0.65,0,0.35,1)",
            transform: isOpening ? "translateX(-100%)" : "translateX(0)",
          }}
        />

        <div
          className="w-1/2 h-full"
          style={{
            background: `url(${floralOverlayImg}) center/cover`,
            transition: "transform 1.8s cubic-bezier(0.65,0,0.35,1)",
            transform: isOpening ? "translateX(100%)" : "translateX(0)",
          }}
        />
      </div>

      {/* Center Text */}
      <div
        className="relative z-10 text-center px-8"
        style={{
          transition: "opacity 1s ease, transform 1s ease",
          opacity: isOpening ? 0 : 1,
          transform: isOpening ? "translateY(20px)" : "translateY(0)",
        }}
      >
        <p className="font-heading text-ivory text-lg tracking-[0.3em] uppercase mb-4 animate-gentle-pulse">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>

        <h1 className="font-display text-5xl md:text-7xl text-gold-gradient mb-6">
          You're Invited
        </h1>

        <p className="font-serif text-ivory/80 text-base tracking-[0.2em] uppercase animate-gentle-pulse">
          Tap anywhere to open the invitation
        </p>
      </div>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};

export default FloralOverlay;