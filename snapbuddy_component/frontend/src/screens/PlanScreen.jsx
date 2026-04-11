import Header from "../components/Header";

export default function PlanScreen({ setScreen, nav }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
      <Header title="แผน Shoot ของคุณ" onBack={() => setScreen("refine")} />
      <div className="px-5 py-6 space-y-5">
        <div className="rounded-3xl p-5 text-white relative overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}><div className="absolute inset-0 bg-black/35" /><div className="relative"><div className="text-lg font-bold">เช้าคาเฟ่สไตล์เกาหลีนุ่มๆ</div><div className="text-xs mt-1 text-white/80">โกลเด้นอาวร์ · แสงธรรมชาติ · โทนอบอุ่น</div></div></div>
        <div className="grid grid-cols-2 gap-3 text-sm">{[["คาเฟ่","Mellow Grounds","อิแทวอน"],["เวลาที่ดีสุด","08:30 น.","ช่วงโกลเด้นอาวร์"],["ราคา","฿95","ครบทุกอย่าง"],["ระยะเวลา","90 นาที","+ บัฟเฟอร์ 15 นาที"]].map(([k,v1,v2]) => <div key={k} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.7)" }}><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">{k}</div><div className="font-semibold">{v1}</div><div className="text-xs text-stone-500">{v2}</div></div>)}</div>
      </div>
      <div className="p-4 border-t border-stone-200 flex gap-3" style={{ background: "#faf6f1" }}><button onClick={() => nav("refine", "plan")} className="flex-1 py-3 rounded-2xl font-semibold border" style={{ borderColor: "#a8b5a0", color: "#7a8c72" }}>ปรับเพิ่มเติม</button><button onClick={() => setScreen("matching")} className="flex-1 py-3 rounded-2xl font-semibold text-white" style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" }}>โอเค ✓</button></div>
    </div>
  );
}
