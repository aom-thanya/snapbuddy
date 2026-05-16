export default function Header({ title = "SnapBuddy", onBack, right }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
      }}
      className="sticky top-0 z-20 px-4 sm:px-6 pt-5 pb-3 sm:pt-6 sm:pb-4 flex items-center gap-3 shadow-sm border-b border-stone-100/50"
    >
      {onBack ? (
        <button
          onClick={onBack}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center hover:bg-stone-100"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      ) : (
        <img src="/logo.png" alt="SnapBuddy Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
      )}

      {/* TITLE */}
      <div className="text-base sm:text-lg font-semibold tracking-tight">
        {title}
      </div>

      <div className="ml-auto flex items-center">
        {right}
      </div>
    </div>
  );
}