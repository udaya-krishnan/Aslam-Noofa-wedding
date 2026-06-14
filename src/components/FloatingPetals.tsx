import petalImg from "@/assets/petal.png";

const FloatingPetals = () => {
  const petals = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 8,
    size: 20 + Math.random() * 25,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <img
          key={petal.id}
          src={petalImg}
          alt=""
          className="absolute animate-float-petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
