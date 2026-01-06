import { useEffect, useState } from "react";

const wallpapers = [
  "/wallpapers/hostel1.jpg",
  "/wallpapers/hostel2.jpg",
  "/wallpapers/garden.jpg",
  "/wallpapers/entrance.jpg",
  "/wallpapers/event.jpg",
  "/wallpapers/prize.jpg",
];

export default function GlassBackground({ children }) {
  const [bg, setBg] = useState(wallpapers[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBg((prev) => {
        const next =
          wallpapers[(wallpapers.indexOf(prev) + 1) % wallpapers.length];
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
