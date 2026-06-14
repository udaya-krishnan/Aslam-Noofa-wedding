import { useState, useEffect } from "react";

const CountdownTimer = ({ visible }: { visible: boolean }) => {
  // Nikkah Date & Time
  // 28 June 2026 - 11:00 AM
  const targetDate = new Date("2026-06-28T11:00:00").getTime();

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());

      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  if (!visible) return null;

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative z-10 px-6 py-16">
      <div className="max-w-md mx-auto text-center">
        {/* Heading */}
        <h2 className="font-display text-4xl text-gold-gradient mb-3 animate-fade-up leading-[1.4] pt-3 pb-2">
          Countdown to Our Nikkah
        </h2>

        {/* Wedding Date */}
        {/* <p
          className="font-serif text-ivory/70 tracking-[0.15em] uppercase text-sm mb-8 animate-fade-up"
          style={{ animationDelay: "2.3s", opacity: 0 }}
        >
          28 June 2026 • 11:00 AM
        </p> */}

        {/* Timer */}
        <div
          className="grid grid-cols-4 gap-3 animate-fade-up"
          style={{ animationDelay: "2.5s", opacity: 0 }}
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="glass-card p-4 gold-glow text-center rounded-2xl"
            >
              <span className="font-heading text-3xl sm:text-4xl text-primary block">
                {String(u.value).padStart(2, "0")}
              </span>

              <span className="font-serif text-[9px] sm:text-xs tracking-[0.08em] sm:tracking-[0.2em] uppercase text-muted-foreground mt-1 block">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
