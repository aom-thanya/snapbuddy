import Header from "../components/Header";
import TrendingCard from "../components/TrendingCard";

export default function HomeScreen({ nav, setScreen, setLiked, liked, topDestinations, vibes }) {
  return (
    <div style={{ height: "100%", overflowY: "auto" }} className="text-stone-800">
      <Header right={<button onClick={() => setScreen("bookings")} className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg></button>} />
      <div className="px-4 pt-7 pb-24">
        <div className="mb-7"><h1 className="text-3xl font-bold leading-tight">ได้รูปที่ใช่<br /> ใน vibe ที่คุณอยากเป็น ✨</h1><p className="text-sm text-stone-500 mt-2">ประสบการณ์ถ่ายภาพที่ AI ออกแบบให้ตรงกับสไตล์ของคุณ</p></div>
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
            {vibes.map((v) => TrendingCard({ ...v, nav, setLiked, liked }))}
          </div>
        </section>
      </div>
    </div>
  );
}
