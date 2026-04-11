import Header from "../components/Header";

export default function HomeScreen({ nav, setScreen, setLiked, liked, topDestinations, vibes }) {
  return (
    <div style={{ height: "100%", overflowY: "auto" }} className="text-stone-800">
      <Header right={<button onClick={() => setScreen("bookings")} className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg></button>} />
      <div className="px-4 pt-7 pb-24">
        <div className="mb-7"><h1 className="text-3xl font-bold leading-tight">ถ่ายภาพตาม vibe ของคุณ ✨</h1><p className="text-sm text-stone-500 mt-2">ประสบการณ์ถ่ายภาพที่ AI ออกแบบให้ตรงกับสไตล์ของคุณ</p></div>
        <button onClick={() => nav("intent", "home")} className="w-full text-left bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-stone-100 text-sm text-stone-400">บอก vibe ของคุณ (เช่น เกาหลีนุ่มๆ, คาเฟ่แสงทอง…)</button>
        <section className="mt-7">
          <h2 className="text-xl font-bold mb-4">สถานที่แนะนำ</h2>
          <div className="flex gap-3 overflow-auto pb-1">
            {topDestinations.map((d) => <div key={d.id} onClick={() => nav("refine", "home")} className="min-w-32 h-40 rounded-3xl p-4 relative shadow-sm cursor-pointer flex-shrink-0 overflow-hidden" style={{ backgroundImage: `url(${d.image})`, backgroundSize: "cover", backgroundPosition: "center" }}><div className="absolute inset-0 bg-black/25" /><div className="absolute bottom-4 left-4 right-4 text-white"><div className="font-semibold text-sm">{d.title}</div><div className="text-xs opacity-90">{d.location}</div></div></div>)}
          </div>
        </section>
        <section className="mt-7">
          <h2 className="text-xl font-bold mb-4">🔥 กำลังนิยม</h2>
          <div className="grid gap-4">
            {vibes.map((v) => <div key={v.id} className="rounded-3xl overflow-hidden shadow-sm bg-white"><div className="relative" style={{ aspectRatio: "9/12", backgroundImage: `url(${v.image})`, backgroundSize: "cover", backgroundPosition: "center" }}><div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} /><div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">{["heart","msg","share","bm"].map((k) => <button key={k} onClick={() => k==="heart"&&setLiked((s)=>({...s,[v.title]:!s[v.title]}))} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>{k==="heart"&&<svg width="20" height="20" fill={liked[v.title]?"white":"none"} stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}{k==="msg"&&<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}{k==="share"&&<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>}{k==="bm"&&<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>}</button>)}</div><div className="absolute bottom-0 left-0 right-0 p-4 text-white"><div className="font-bold text-lg leading-snug">{v.title}</div><div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{v.cafe}</div><div className="flex flex-wrap gap-1.5 mt-2">{v.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.2)" }}>{tag}</span>)}</div><button onClick={() => nav("refine", "home")} className="mt-3 px-4 py-2 rounded-full bg-white text-stone-800 text-xs font-semibold">ลอง vibe นี้ ✨</button></div></div></div>)}
          </div>
        </section>
      </div>
    </div>
  );
}
