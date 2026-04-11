import Header from "../components/Header";
import TrendingCard from "../components/TrendingCard";
import TopDestinations from "../components/TopDestinations";

export default function HomeScreen({ nav, setScreen, setLiked, liked, topDestinations, vibes }) {
  return (
    <div style={{ height: "100%", overflowY: "auto" }} className="text-stone-800">
      <Header right={<button onClick={() => setScreen("bookings")} className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg></button>} />
      <div className="px-4 pt-7 pb-24">
        <div className="mb-7 text-center flex flex-col items-center justify-center"><h1 className="text-3xl lg:text-5xl font-bold leading-tight">ได้รูปที่ใช่<br /> ใน vibe ที่คุณอยากเป็น ✨</h1><p className="text-sm text-stone-500 mt-2">SnapBuddy ช่วยให้คุณได้รูปที่ตรงกับสไตล์ของคุณ</p></div>
        <button onClick={() => nav("intent", "home")} className="w-full text-left bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-stone-100 text-sm text-stone-400">บอก vibe ของคุณ (เช่น เกาหลีนุ่มๆ, คาเฟ่แสงทอง…)</button>
        <section className="mt-7">
          <h2 className="text-xl font-bold mb-4">สถานที่แนะนำ</h2>
          <div className="flex gap-3 overflow-auto pb-1">
            {topDestinations.map((d) => <TopDestinations key={d.id} {...{ nav, topDestinations: [d] }} />)}
          </div>
        </section>
        <section className="mt-7">
          <h2 className="text-xl font-bold mb-4">🔥 กำลังนิยม</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {vibes.map((v) => TrendingCard({ ...v, nav, setLiked, liked }))}
          </div>
        </section>
      </div>
    </div>
  );
}
