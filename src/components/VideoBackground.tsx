import { useRef, useEffect } from "react";

const SLOW_RATE = 0.3;

const VideoBackground = ({ visible }: { visible: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ─── Core enforce function ───────────────────────────────────────────────
    const enforce = () => {
      // defaultPlaybackRate prevents the browser from "resetting" rate on loop
      if (video.defaultPlaybackRate !== SLOW_RATE) {
        video.defaultPlaybackRate = SLOW_RATE;
      }
      if (video.playbackRate !== SLOW_RATE) {
        video.playbackRate = SLOW_RATE;
      }
    };

    // ─── Force a clean load so bfcache doesn't restore old rate ─────────────
    // Grab the src before we wipe it
    const src = video.currentSrc || video.querySelector("source")?.getAttribute("src") || "";

    // Detach src → reattach → load() forces the browser to treat this as fresh
    video.pause();
    video.removeAttribute("src");
    video.load(); // resets internal state including cached playbackRate

    // Re-attach source and reload
    const source = video.querySelector("source");
    if (source) {
      source.setAttribute("src", src + (src.includes("?") ? "&" : "?") + "_r=" + Date.now());
    }
    video.load();

    // ─── Apply rate at every possible moment the browser might reset it ──────
    const events = [
      "loadstart",
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "play",
      "playing",
      "seeking",
      "seeked",
      "ratechange",
      "waiting",
      "stalled",
      "suspend",
    ] as const;

    // ratechange is special: if WE caused it, skip re-enforcing to avoid loop
    let weChangedRate = false;
    const onRateChange = () => {
      if (weChangedRate) return;
      weChangedRate = true;
      enforce();
      weChangedRate = false;
    };

    const onEvent = () => enforce();

    video.addEventListener("ratechange", onRateChange);
    events.forEach((e) => {
      if (e !== "ratechange") video.addEventListener(e, onEvent);
    });

    // ─── bfcache restore: fires when user hits Back/Forward or refreshes ─────
    const onPageShow = (e: PageTransitionEvent) => {
      // e.persisted = true means page came from bfcache
      enforce();
      if (video.paused) video.play().catch(() => {});
    };

    // ─── Tab visibility restore ───────────────────────────────────────────────
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        enforce();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ─── RAF loop as a last-resort safety net ────────────────────────────────
    let rafId: number;
    let tick = 0;
    const rafLoop = () => {
      // Only check every 10 frames (~167ms) to avoid perf overhead
      if (tick++ % 10 === 0) enforce();
      rafId = requestAnimationFrame(rafLoop);
    };
    rafId = requestAnimationFrame(rafLoop);

    // ─── Start playback ───────────────────────────────────────────────────────
    video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("ratechange", onRateChange);
      events.forEach((e) => {
        if (e !== "ratechange") video.removeEventListener(e, onEvent);
      });
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-105"
        style={{ filter: "blur(2px) brightness(0.35)" }}
      >
        <source src="/wedding-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsla(140,25%,10%,0.65) 0%, hsla(140,25%,10%,0.35) 40%, hsla(140,25%,10%,0.7) 100%)",
        }}
      />
    </div>
  );
};

export default VideoBackground;