import { useRef, useEffect } from "react";

export default function TrendingCard({
  id,
  image,
  video,
  title,
  tags,
  cafe,
  nav,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      {
        threshold: 0.6, // ต้องเห็น 60% ถึงจะเล่น
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      key={id}
      className="rounded-3xl overflow-hidden shadow-sm bg-white"
    >
      <div
        className="relative"
        style={{
          aspectRatio: "9/16",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="font-bold text-lg">{title}</div>
          <div className="text-xs opacity-70">{cafe}</div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => nav("refine", "home")}
            className="mt-3 px-4 py-2 rounded-full bg-white text-stone-800 text-xs font-semibold"
          >
            ลอง vibe นี้ ✨
          </button>
        </div>
      </div>
    </div>
  );
}