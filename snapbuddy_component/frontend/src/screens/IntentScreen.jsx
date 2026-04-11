import Header from "../components/Header";

const btnStyle = { background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" };
const btnPrimary = "w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2";

export default function IntentScreen({ setScreen, vibeText, setVibeText, refImages, setRefImages, fileInputRef, occasion, setOccasion, generateTags, nav }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <Header title="บอก vibe ของคุณ" onBack={() => setScreen("home")} />
      <div className="px-5 py-6 space-y-6 flex-1">
        <div><label className="text-xs uppercase tracking-wider text-stone-500 block mb-2">อธิบาย vibe</label><textarea value={vibeText} onChange={(e) => setVibeText(e.target.value)} className="w-full rounded-3xl p-4 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)", minHeight: "112px" }} /></div>
        <div><label className="text-xs uppercase tracking-wider text-stone-500 block mb-2">รูป reference <span className="normal-case text-stone-400">(สูงสุด 5 รูป)</span></label><input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { const files = Array.from(e.target.files); const remaining = 5 - refImages.length; files.slice(0, remaining).forEach((file) => { const url = URL.createObjectURL(file); setRefImages((prev) => [...prev, url]); }); e.target.value = ""; }} /><div className="flex gap-2 flex-wrap">{refImages.map((src, i) => <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0" style={{ outline: "2px solid #a8b5a0" }}><img src={src} alt="" className="w-full h-full object-cover" /><button onClick={() => setRefImages((prev) => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}><svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg></button></div>)}{refImages.length < 5 && <button onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 flex-shrink-0" style={{ borderColor: "#a8b5a0", background: "rgba(255,255,255,0.5)" }}><svg width="20" height="20" fill="none" stroke="#7a8c72" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg><span className="text-xs" style={{ color: "#7a8c72" }}>เพิ่ม</span></button>}</div></div>
        <div><label className="text-xs uppercase tracking-wider text-stone-500 block mb-3">โอกาส</label><div className="flex flex-wrap gap-2">{["🎂 วันเกิด","📸 คอนเทนต์","💕 เดต","☕ ทั่วไป"].map((o) => <button key={o} onClick={() => setOccasion(o)} className="px-4 py-2 rounded-full text-xs font-medium" style={{ background: occasion===o?"#a8b5a0":"#f0e6d8", color: occasion===o?"white":"#57534e" }}>{o}</button>)}</div></div>
      </div>
      <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
        <button disabled={!vibeText.trim() && !refImages.length} onClick={() => { generateTags(); nav("refine", "intent"); }} className={btnPrimary} style={vibeText.trim() || refImages.length ? btnStyle : { background: "#d6d3d1" }}>Analyze your vibe ✨</button>
      </div>
    </div>
  );
}
