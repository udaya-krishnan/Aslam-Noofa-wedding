import { MapPin, Navigation } from "lucide-react";

const EventLocation = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  const venueName = "Fathima Gani Mahal";

  const address = "Podnur Road, Coimbatore, Tamil Nadu";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venueName + " " + address
  )}`;

  return (
    <section className="relative z-10 px-6 py-16">
      <div
        className="max-w-sm mx-auto text-center animate-fade-up"
        style={{ animationDelay: "3.4s", opacity: 0 }}
      >
        {/* Heading */}
        <h2 className="font-display text-4xl text-gold-gradient mb-8 leading-[1.3] py-2">
          Venue
        </h2>

        {/* Card */}
        <div className="glass-card p-8 gold-glow rounded-3xl">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Venue Name */}
          <h3 className="font-heading text-2xl text-primary mb-3">
            {venueName}
          </h3>

          {/* Address */}
          <p className="font-serif text-muted-foreground text-sm leading-relaxed mb-6">
            {address}
          </p>

          {/* Maps Button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full font-serif text-sm text-primary tracking-wide hover:bg-primary/20 transition-colors duration-300"
          >
            <Navigation className="w-4 h-4" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventLocation;