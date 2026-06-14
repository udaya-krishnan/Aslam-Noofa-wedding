import { useRef, useState, useCallback, useEffect } from "react";
import scratchSurface from "@/assets/scratch-surface.jpg";
import { CalendarPlus } from "lucide-react";

const EVENT_DETAILS = {
  title: "Aslam & Noofa Nikkah",
  date: "20260628",        // YYYYMMDD
  startTime: "110000",     // HHMMSS
  endTime: "140000",       // HHMMSS — adjust end time as needed
  location: "Parappan Square, Venniyur",
  description: "You are cordially invited to the Nikkah ceremony of Aslam & Noofa",
}

const addToGoogleCalendar = () => {
  const { title, date, startTime, endTime, location, description } = EVENT_DETAILS

  const url = new URL("https://calendar.google.com/calendar/render")
  url.searchParams.set("action", "TEMPLATE")
  url.searchParams.set("text", title)
  url.searchParams.set("dates", `${date}T${startTime}/${date}T${endTime}`)
  url.searchParams.set("location", location)
  url.searchParams.set("details", description)

  window.open(url.toString(), "_blank", "noopener,noreferrer")
}

const ScratchCard = ({ visible }: { visible: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const [added, setAdded] = useState(false);
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
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);

      ctx.fillStyle = "rgba(120, 80, 20, 0.75)";
      ctx.font = "600 15px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Scratch to reveal our Nikkah details",
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
    if (scratching) scratch(e.clientX, e.clientY);
  };

  const handleAddToCalendar = () => {
    addToGoogleCalendar()
    setAdded(true)
  }

  if (!visible) return null;

  return (
    <section className="relative z-10 px-6 py-16">
      <div
        className="max-w-sm mx-auto text-center animate-fade-up"
        style={{ animationDelay: "2.8s", opacity: 0 }}
      >
        <h2 className="font-display text-4xl text-gold-gradient mb-6 leading-[1.3] py-2">
          Save The Date
        </h2>

        <div className="relative glass-card p-8 gold-glow overflow-hidden rounded-3xl">
          {/* Revealed Content */}
          <div className="text-center py-6">
            <p className="font-serif text-sm tracking-[0.25em] uppercase text-bougainvillea-light mb-3">
              Aslam ♥ Noofa
            </p>
            <p className="font-heading text-3xl text-primary mb-3">
              28 • 06 • 2026
            </p>
            <p className="font-serif text-lg text-muted-foreground">
              Sunday • 11:00 AM
            </p>
            <p className="font-serif text-sm text-bougainvillea-light mt-3 leading-relaxed">
              Parappan Square
              <br />
              Venniyur
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

        {/* Add to Calendar button — only shows after scratch */}
        {revealed && (
          <div
            className="mt-6 animate-fade-up"
            style={{ animationFillMode: "forwards" }}
          >
            <button
              onClick={handleAddToCalendar}
              disabled={added}
              className={`
                inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                font-serif text-sm tracking-wide transition-all duration-300
                ${added
                  ? "bg-green-500/20 text-green-400 border border-green-500/40 cursor-default"
                  : "gold-glow border border-amber-400/60 text-amber-300 hover:bg-amber-400/10 hover:scale-105 active:scale-95"
                }
              `}
            >
              <CalendarPlus className="h-4 w-4" />
              {added ? "✓ Added to Calendar" : "Add to Google Calendar"}
            </button>

            {added && (
              <p className="mt-3 text-xs text-muted-foreground font-serif">
                Check your Google Calendar to confirm.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScratchCard;