export default function MyReviewModal({ open, onClose, selectedBooking }) {
  if (!open || !selectedBooking?.review) return null;
  const r = selectedBooking.review;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", background: "#faf6f1", borderRadius: "28px 28px 0 0", padding: "24px 20px 32px" }}>
        <div className="space-y-5">
          <div className="font-bold text-xl text-center">รีวิวของคุณ</div>
          <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.7)" }}>
            <div><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ความพึงพอใจ</div><div className="text-sm">{r.rating}/5</div></div>
            <div><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ตรงกับ vibe</div><div className="text-sm">{r.vibeMatch}/5</div></div>
            {r.comment && <div><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ความคิดเห็น</div><p className="text-sm text-stone-700">"{r.comment}"</p></div>}
            {r.issues?.length > 0 && <div><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ปัญหาที่พบ</div><div className="flex flex-wrap gap-1.5">{r.issues.map((i) => <span key={i} className="px-2 py-1 rounded-full text-xs bg-rose-100 text-rose-700">{i}</span>)}</div></div>}
          </div>
          <button onClick={onClose} className="w-full py-3.5 rounded-2xl font-semibold text-white" style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" }}>ปิด</button>
        </div>
      </div>
    </div>
  );
}
