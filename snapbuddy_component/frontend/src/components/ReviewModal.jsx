import StarRow from "./StarRow";

const btnStyle = { background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" };
const btnPrimary = "w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2";

export default function ReviewModal({ reviewStep, setReviewStep, reviewRating, setReviewRating, reviewVibe, setReviewVibe, reviewComment, setReviewComment, reviewIssues, toggleIssue, issueOptions, selectedBooking, submitReview }) {
  if (reviewStep === 0) return null;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", background: "#faf6f1", borderRadius: "28px 28px 0 0", padding: "24px 20px 32px" }}>
        {reviewStep === 1 && <div className="space-y-5 text-center"><div className="font-bold text-xl">ให้คะแนนความพึงพอใจ</div><p className="text-sm text-stone-500">{selectedBooking.title}</p><StarRow value={reviewRating} onChange={setReviewRating} size={40} /><button disabled={reviewRating===0} onClick={() => setReviewStep(2)} className={btnPrimary} style={reviewRating ? btnStyle : { background: "#d6d3d1" }}>ถัดไป</button><button onClick={() => setReviewStep(0)} className="w-full text-sm text-stone-400">ยกเลิก</button></div>}
        {reviewStep === 2 && <div className="space-y-5"><div className="font-bold text-xl text-center">ตรงกับ vibe แค่ไหน?</div><StarRow value={reviewVibe} onChange={setReviewVibe} size={36} /><textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="เล่าประสบการณ์ให้ฟังหน่อย… (ไม่บังคับ)" className="w-full rounded-2xl p-3.5 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)", minHeight: "80px" }} /><div className="flex gap-2"><button onClick={() => setReviewStep(1)} className="flex-1 py-3 rounded-2xl font-semibold border text-sm" style={{ borderColor: "#a8b5a0", color: "#7a8c72" }}>ย้อนกลับ</button><button disabled={reviewVibe===0} onClick={() => setReviewStep(3)} className="flex-1 py-3 rounded-2xl font-semibold text-white text-sm" style={reviewVibe ? btnStyle : { background: "#d6d3d1" }}>ถัดไป</button></div></div>}
        {reviewStep === 3 && <div className="space-y-5"><div className="font-bold text-xl text-center">มีปัญหาอะไรไหม?</div><div className="flex flex-wrap gap-2">{issueOptions.map((i) => <button key={i} onClick={() => toggleIssue(i)} className="px-3 py-2 rounded-full text-xs font-medium" style={{ background: reviewIssues.includes(i) ? "#fecdd3" : "#f0e6d8", color: "#292524", border: reviewIssues.includes(i) ? "1.5px solid #fda4af" : "1.5px solid transparent" }}>{i}</button>)}</div><div className="flex gap-2"><button onClick={() => setReviewStep(2)} className="flex-1 py-3 rounded-2xl font-semibold border text-sm" style={{ borderColor: "#a8b5a0", color: "#7a8c72" }}>ย้อนกลับ</button><button onClick={submitReview} className="flex-1 py-3 rounded-2xl font-semibold text-white text-sm" style={btnStyle}>ส่งรีวิว ✓</button></div></div>}
        {reviewStep === 4 && <div className="space-y-4 text-center"><div className="text-5xl">🎉</div><div className="font-bold text-xl">ขอบคุณสำหรับรีวิว!</div><p className="text-sm text-stone-500">รีวิวของคุณช่วยให้ชุมชน SnapBuddy เติบโตได้</p><button onClick={() => setReviewStep(0)} className={btnPrimary} style={btnStyle}>เสร็จสิ้น</button></div>}
      </div>
    </div>
  );
}
