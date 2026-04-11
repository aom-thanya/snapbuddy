export default function TopDestinations({ nav, topDestinations }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
      {topDestinations.map((d) => (
        <div
          key={d.id}
          onClick={() => nav("refine", "home")}
          className="w-[140px] sm:w-[180px] lg:w-[250px] h-40 sm:h-48 lg:h-56 rounded-3xl p-4 relative shadow-sm cursor-pointer overflow-hidden flex-shrink-0 snap-start"
          style={{
            backgroundImage: `url(${d.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="font-semibold text-sm sm:text-base leading-tight">
              {d.title}
            </div>
            <div className="text-xs sm:text-sm opacity-90">
              {d.location}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}