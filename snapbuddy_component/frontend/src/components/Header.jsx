export default function Header({ title = "SnapBuddy", onBack, right }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e7e5e4" }} className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3">
      {onBack ? (
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
      ) : (
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-lg" style={{ background: "linear-gradient(135deg,#a8b5a0,#7a8c72)" }}>✦</div>
      )}
      <div className="font-semibold tracking-tight text-lg">{title}</div>
      <div className="ml-auto">{right}</div>
    </div>
  );
}
