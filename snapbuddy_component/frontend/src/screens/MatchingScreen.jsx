import Header from "../components/Header";

export default function MatchingScreen({ setScreen, tab, setTab, buddies }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
      <Header title="ผลการจับคู่" onBack={() => setScreen("plan")} />
      <div className="px-5 pt-4 flex gap-2">{["แมทช์ดีสุด","งบน้อยสุด","เรตติ้งสูงสุด"].map((t) => <button key={t} onClick={() => setTab(t)} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: tab === t ? "#1c1917" : "#f0e6d8", color: tab === t ? "white" : "#57534e" }}>{t}</button>)}</div>
      <div className="px-5 py-4 space-y-4">{buddies.map((b) => <div key={b.id} className="rounded-3xl p-5 shadow-sm" style={{ background: "rgba(255,255,255,0.7)" }}><div className="flex gap-4 items-center"><img src={b.avatar} alt={b.name} className="w-14 h-14 rounded-2xl object-cover" /><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><div className="font-bold truncate">{b.name}</div><span className="px-1.5 py-0.5 rounded-full text-xs font-medium" style={{ background: b.available ? "#dcfce7" : "#e7e5e4", color: b.available ? "#15803d" : "#78716c" }}>{b.available ? "ว่างอยู่" : "รอคิว"}</span></div><div className="text-xs text-stone-500">เชี่ยวชาญ {b.style}</div><div className="text-xs mt-1 text-amber-600">★ {b.rating} ({b.reviews} รีวิว) <span className="text-stone-400 ml-2">฿{b.price}</span></div></div><div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ border: "3px solid #7a8c72" }}>{b.match}%</div></div><div className="flex gap-2 mt-4 overflow-auto">{b.portfolio.map((img, i) => <img key={i} src={img} alt="" className="w-16 h-20 rounded-xl object-cover flex-shrink-0" />)}</div><div className="flex gap-2 mt-4"><button className="flex-1 py-2 rounded-xl text-stone-700 text-xs font-medium" style={{ background: "#f0e6d8" }}>ทำไมถึงแมทช์?</button><button onClick={() => setScreen("booking")} className="flex-1 py-2 rounded-xl text-white text-xs font-medium" style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" }}>เลือก</button></div></div>)}</div>
    </div>
  );
}
