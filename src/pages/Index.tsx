import { useState } from "react";
import FloralOverlay from "@/components/FloralOverlay";
import VideoBackground from "@/components/VideoBackground";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import ScratchCard from "@/components/ScratchCard";
import FloatingPetals from "@/components/FloatingPetals";
import MusicToggle from "@/components/MusicToggle";
import EventLocation from "@/components/EventLocation";
import PhotoGallery from "@/components/PhotoGallery";

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {!opened && <FloralOverlay onOpen={() => setOpened(true)} />}
      <VideoBackground visible={opened} />
      {opened && <FloatingPetals />}

      <main className="relative z-10">
        <HeroSection visible={opened} />
        <CountdownTimer visible={opened} />
        <ScratchCard visible={opened} />
        <EventLocation visible={opened} />
        <PhotoGallery visible={opened} />

        {opened && (
      
    <footer className="relative z-10 text-center py-16 px-6">
      <div className="max-w-lg mx-auto flex flex-col items-center gap-6">

        {/* Arabic Ayah */}
        <p
          className="font-serif text-gold-light text-xl sm:text-2xl leading-relaxed animate-fade-up"
          dir="rtl"
          style={{ animationDelay: "0.2s", fontFeatureSettings: "'kern'" }}
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
        </p>

        {/* Divider line */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: "0.4s",
            width: "60px",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)",
          }}
        />

        {/* English Translation */}
        <p
          className="font-serif text-ivory/70 text-sm sm:text-base leading-relaxed tracking-wide italic animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          "And among His signs is that He created for you mates from among
          yourselves, that you may dwell in tranquility with them, and He has
          put love and mercy between your hearts."
        </p>

        {/* Reference */}
        <p
          className="font-heading text-gold/60 text-xs tracking-[0.2em] uppercase animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          — Surah Ar-Rum 30:21
        </p>

        {/* Star divider */}
        <p
          className="text-bougainvillea-light text-lg animate-gentle-pulse animate-fade-up"
          style={{ animationDelay: "1s" }}
        >
          ✦
        </p>

        {/* Hashtag */}
        <p
          className="font-heading text-gold-light text-base sm:text-lg tracking-[0.15em] animate-fade-up"
          style={{ animationDelay: "1.2s" }}
        >
          #AshikAndSafreen
        </p>

        {/* Final message */}
        <p
          className="font-serif text-ivory/50 text-sm tracking-widest uppercase animate-fade-up"
          style={{ animationDelay: "1.4s" }}
        >
          We look forward to celebrating with you
        </p>

        {/* Bottom spacing line */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: "1.6s",
            width: "120px",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)",
          }}
        />

      </div>
    </footer>


        )}
      </main>

      <MusicToggle shouldPlay={opened} />
    </div>
  );
};

export default Index;
