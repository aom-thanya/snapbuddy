import { useRef } from "react";

export default function TrendingCard({
  id,
  image,
  video,
  title,
  tags,
  cafe,
  liked,
  setLiked,
  nav,
}) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    videoRef.current?.play();
  };

  const handleLeave = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      key={id}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group rounded-3xl overflow-hidden shadow-sm bg-white"
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
        {/* VIDEO LAYER */}
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* buttons + content (เหมือนเดิม) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {/* ... */}
        </div>

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