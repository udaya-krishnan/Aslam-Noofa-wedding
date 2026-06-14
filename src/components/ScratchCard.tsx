import { useRef, useState, useCallback, useEffect } from "react";
import scratchSurface from "@/assets/scratch-surface.jpg";

const ScratchCard = ({ visible }: { visible: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();

    img.src = scratchSurface;

    img.onload = () => {
      imgRef.current = img;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;

      ctx.scale(2, 2);

      ctx.drawImage(
        img,
        0,
        0,
        canvas.offsetWidth,
        canvas.offsetHeight
      );

      // Scratch text
      ctx.fillStyle = "rgba(120, 80, 20, 0.75)";
      ctx.font = "600 15px 'Playfair Display', serif";
      ctx.textAlign = "center";

      ctx.fillText(
        "Scratch to reveal the Nikkah date",
        canvas.offsetWidth / 2,
        canvas.offsetHeight / 2
      );
    };
  }, [visible]);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const cx = x - rect.left;
    const cy = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, Math.PI * 2);
    ctx.fill();

    // Reveal percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let transparent = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++;
    }

    if (transparent / (imageData.data.length / 4) > 0.4) {
      setRevealed(true);
    }
  }, []);

  const handlePointerDown = () => setScratching(true);

  const handlePointerUp = () => setScratching(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (scratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  if (!visible) return null;

  return (
    <section className="relative z-10 px-6 py-16">
      <div
        className="max-w-sm mx-auto text-center animate-fade-up"
        style={{ animationDelay: "2.8s", opacity: 0 }}
      >
        {/* Heading */}
        <h2 className="font-display text-4xl text-gold-gradient mb-6 leading-[1.3] py-2">
          Save The Date
        </h2>

        {/* Card */}
        <div className="relative glass-card p-8 gold-glow overflow-hidden rounded-3xl">

          {/* Revealed Content */}
          <div className="text-center py-6">

            {/* Date */}
            <p className="font-heading text-3xl text-primary mb-3">
              06 • 06 • 2026
            </p>

            {/* Time */}
            <p className="font-serif text-lg text-muted-foreground">
              Saturday • 11:00 AM
            </p>

            {/* Venue */}
            <p className="font-serif text-sm text-bougainvillea-light mt-3 leading-relaxed">
              Fathima Gani Mahal
              <br />
              Podnur Road, Coimbatore
            </p>
          </div>

          {/* Scratch Overlay */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerMove={handlePointerMove}
              style={{ borderRadius: "1.5rem" }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ScratchCard;