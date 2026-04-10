import { useMemo, useRef, useState, useEffect } from "react";

const topDestinations = [
  { title: "Mellow Grounds", location: "อิแทวอน", emoji: "☕", bg: "from-rose-200 to-orange-100" },
  { title: "Sky Terrace", location: "กังนัม", emoji: "🌆", bg: "from-amber-200 to-rose-200" },
  { title: "Chapters & Co", location: "ฮงแด", emoji: "📚", bg: "from-green-200 to-amber-200" },
  { title: "Greenhouse Café", location: "เมียงดง", emoji: "🌿", bg: "from-green-200 to-lime-200" },
];

const vibes = [
  { title: "เช้าคาเฟ่สไตล์เกาหลีนุ่มๆ", tags: ["#แสงแดด", "#อบอุ่น", "#มัทฉะ"], cafe: "Mellow Grounds", emoji: "🍵", bg: "from-rose-200 to-orange-100" },
  { title: "ยามเย็นบนดาดฟ้า", tags: ["#พระอาทิตย์ตก", "#วิวเมือง", "#โกลเด้นอาวร์"], cafe: "Sky Terrace", emoji: "🌅", bg: "from-amber-200 to-rose-200" },
  { title: "มุมหนังสือวันฝนตก", tags: ["#มูดดี้", "#ฝน", "#หนังสือ"], cafe: "Chapters & Co", emoji: "📚", bg: "from-green-200 to-yellow-100" },
  { title: "สตูดิโอขาวมินิมอล", tags: ["#สะอาด", "#สว่าง", "#โมเดิร์น"], cafe: "BLANC Studio", emoji: "🤍", bg: "from-stone-100 to-zinc-50" },
];

const buddies = [
  { name: "จีซู เค.", match: 98, price: 65, rating: 4.9, reviews: 127, style: "Korean Soft", available: true },
  { name: "มินโฮ แอล.", match: 91, price: 55, rating: 4.8, reviews: 89, style: "Natural Light", available: true },
  { name: "โซรา พี.", match: 85, price: 45, rating: 4.7, reviews: 64, style: "Vintage Film", available: false },
];

const initialBookings = [
  { id: 1, title: "เช้าคาเฟ่สไตล์เกาหลีนุ่มๆ", location: "Mellow Grounds · อิแทวอน", date: "พรุ่งนี้ 08:30 น.", photographer: "จีซู เค.", status: "กำลังจะถึง", statusTone: "amber", total: "฿95", gallery: ["🍵", "☕", "🪟", "📖", "✨"], review: null },
  { id: 2, title: "ยามเย็นบนดาดฟ้า", location: "Sky Terrace · กังนัม", date: "12 เม.ย. 17:30 น.", photographer: "มินโฮ แอล.", status: "ได้รับภาพแล้ว", statusTone: "green", total: "฿120", gallery: ["🌇", "🏙️", "📸", "💫", "🧡"], review: null },
  { id: 3, title: "มุมหนังสือวันฝนตก", location: "Chapters & Co · ฮงแด", date: "2 เม.ย. 14:00 น.", photographer: "โซรา พี.", status: "เสร็จสิ้น", statusTone: "stone", total: "฿85", gallery: ["🌧️", "📚", "☕", "🕯️", "🎞️"], review: { rating: 5, vibeMatch: 4, comment: "บรรยากาศดีมาก ตรงกับที่จินตนาการไว้เลย ช่างภาพใจดีมาก แนะนำเลย!", issues: [] } },
];

function suggestTagsFromVibe(text) {
  const source = text.toLowerCase();
  const rules = [
    { keys: ["korean", "soft", "เกาหลี", "นุ่ม"], tag: "#soft" },
    { keys: ["cafe", "café", "coffee", "matcha", "คาเฟ่", "กาแฟ", "มัทฉะ"], tag: "#cafevibes" },
    { keys: ["sun", "golden", "warm", "แดด", "อบอุ่น", "โกลเด้น"], tag: "#warmtones" },
    { keys: ["natural", "window", "light", "หน้าต่าง", "แสง"], tag: "#naturallight" },
    { keys: ["cozy", "blanket", "homey", "อบอุ่น", "ผ้าห่ม"], tag: "#cozy" },
    { keys: ["minimal", "clean", "white", "มินิมอล", "ขาว"], tag: "#minimal" },
    { keys: ["city", "rooftop", "urban", "ดาดฟ้า", "เมือง"], tag: "#cityview" },
    { keys: ["vintage", "film", "retro", "วินเทจ", "ฟิล์ม"], tag: "#vintage" },
    { keys: ["moody", "rain", "dark", "มูดดี้", "ฝน", "มืด"], tag: "#moody" },
    { keys: ["romantic", "dating", "date", "โรแมนติก", "เดต"], tag: "#romantic" },
    { keys: ["cute", "playful", "fun", "น่ารัก", "สนุก"], tag: "#playful" },
    { keys: ["green", "garden", "botanical", "สวน", "ธรรมชาติ"], tag: "#nature" },
  ];
  const tags = rules.filter(r => r.keys.some(k => source.includes(k))).map(r => r.tag);
  if (!tags.length) return ["#soft", "#naturallight", "#cozy"];
  return Array.from(new Set(tags)).slice(0, 5);
}

function StatusBadge({ tone, children }) {
  const cls = tone === "amber" ? "bg-amber-100 text-amber-700" : tone === "green" ? "bg-green-100 text-green-700" : "bg-stone-200 text-stone-600";
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{children}</span>;
}

function Header({ title = "SnapBuddy", onBack, right }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e7e5e4" }} className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3">
      {onBack ? (
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
      ) : (
        <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-lg" style={{ background: "linear-gradient(135deg,#a8b5a0,#7a8c72)" }}>✦</div>
      )}
      <div className="font-semibold tracking-tight text-lg">{title}</div>
      <div className="ml-auto">{right}</div>
    </div>
  );
}

const btnStyle = { background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" };
const btnPrimary = "w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2";

function StarRow({ value, onChange, size = 32 }) {
  return (
    <div className="flex gap-1 justify-center">
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange(n)}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill={n <= value ? "#f59e0b" : "none"} stroke={n <= value ? "#f59e0b" : "#d6d3d1"} strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function SnapBuddyPreview() {
  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState(null);
  const [liked, setLiked] = useState({});
  const [vibeText, setVibeText] = useState("เช้าๆ ในคาเฟ่สไตล์เกาหลีนุ่มๆ โทนมัทฉะ แสงธรรมชาติ ผ้าห่มอบอุ่น…");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [refImages, setRefImages] = useState([]);
  const fileInputRef = useRef(null);
  const [occasion, setOccasion] = useState("☕ ทั่วไป");
  const [budget, setBudget] = useState(120);
  const [groupSize, setGroupSize] = useState(2);
  const [addons, setAddons] = useState(["💄 แต่งหน้า"]);
  const [tab, setTab] = useState("แมทช์ดีสุด");
  const [progress, setProgress] = useState(0);
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState(initialBookings[0]);

  const [reviewStep, setReviewStep] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewVibe, setReviewVibe] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewIssues, setReviewIssues] = useState([]);
  const [showMyReview, setShowMyReview] = useState(false);

  const issueOptions = ["ช่างภาพมาสาย", "ภาพไม่ตรง vibe", "สถานที่ไม่ตรง", "คุณภาพภาพต่ำกว่าที่คาด", "การสื่อสารไม่ดี"];

  const checklist = useMemo(() => [
    ["เตรียมชุดพร้อมแล้ว", false], ["ยืนยันเวลาแล้ว", true], ["ปักหมุดสถานที่แล้ว", true], ["บันทึกรูป reference แล้ว", false],
  ], []);

  useEffect(() => {
    const link1 = document.createElement("link"); link1.rel = "preconnect"; link1.href = "https://fonts.googleapis.com"; document.head.appendChild(link1);
    const link2 = document.createElement("link"); link2.rel = "preconnect"; link2.href = "https://fonts.gstatic.com"; link2.crossOrigin = "anonymous"; document.head.appendChild(link2);
    const link3 = document.createElement("link"); link3.rel = "stylesheet"; link3.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"; document.head.appendChild(link3);
    const style = document.createElement("style"); style.textContent = `* { font-family: 'IBM Plex Sans Thai', sans-serif !important; }`; document.head.appendChild(style);
    return () => { [link1,link2,link3,style].forEach(el => document.head.contains(el) && document.head.removeChild(el)); };
  }, []);

  const goGenerating = () => {
    setScreen("generating"); setProgress(0);
    let v = 0;
    const t = setInterval(() => { v += 20; setProgress(v); if (v >= 100) { clearInterval(t); setTimeout(() => setScreen("plan"), 250); } }, 220);
  };

  const toggleAddon = (name) => setAddons(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
  const generateTags = () => {
    if (!vibeText.trim() && !refImages.length) return;
    const next = refImages.length && !vibeText.trim() ? ["#soft","#editorial","#portrait","#warmtones"] : suggestTagsFromVibe(vibeText);
    setSelectedTags(prev => prev.length ? prev : next);
  };
  const addTag = (raw) => {
    const c = raw.trim(); if (!c) return;
    const f = c.startsWith("#") ? c : "#" + c.split(" ").join("");
    setSelectedTags(prev => prev.includes(f) ? prev : [...prev, f]);
    setTagInput("");
  };
  const removeTag = (tag) => setSelectedTags(prev => prev.filter(i => i !== tag));
  const nav = (s, prev) => { setPrevScreen(prev || screen); setScreen(s); };

  const submitReview = () => {
    const review = { rating: reviewRating, vibeMatch: reviewVibe, comment: reviewComment, issues: reviewIssues };
    const updated = bookings.map(b => b.id === selectedBooking.id ? { ...b, status: "เสร็จสิ้น", statusTone: "stone", review } : b);
    setBookings(updated);
    setSelectedBooking({ ...selectedBooking, status: "เสร็จสิ้น", statusTone: "stone", review });
    setReviewStep(4);
  };

  const openReview = () => { setReviewRating(0); setReviewVibe(0); setReviewComment(""); setReviewIssues([]); setReviewStep(1); };
  const toggleIssue = (i) => setReviewIssues(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const addToGCal = (booking) => {
    const title = encodeURIComponent(booking.title + " · SnapBuddy");
    const loc = encodeURIComponent(booking.location);
    const details = encodeURIComponent(`ช่างภาพ: ${booking.photographer}\nจองผ่าน SnapBuddy`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260413T083000/20260413T100000&details=${details}&location=${loc}`, "_blank");
  };

  const ReviewModal = () => {
    if (reviewStep === 0) return null;
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", background: "#faf6f1", borderRadius: "28px 28px 0 0", padding: "24px 20px 32px" }}>
          {reviewStep === 1 && (
            <div className="space-y-5 text-center">
              <div className="font-bold text-xl">ให้คะแนนความพึงพอใจ</div>
              <p className="text-sm text-stone-500">{selectedBooking.title}</p>
              <StarRow value={reviewRating} onChange={setReviewRating} size={40}/>
              <div className="text-sm text-stone-400">
                {reviewRating===0&&"แตะดาวเพื่อให้คะแนน"}{reviewRating===1&&"😞 ไม่พอใจเลย"}{reviewRating===2&&"😕 พอใช้ได้"}{reviewRating===3&&"🙂 โอเค"}{reviewRating===4&&"😊 ดีมาก"}{reviewRating===5&&"🤩 ดีเยี่ยม!"}
              </div>
              <button disabled={reviewRating===0} onClick={() => setReviewStep(2)} className={btnPrimary} style={reviewRating ? btnStyle : { background: "#d6d3d1" }}>ถัดไป</button>
              <button onClick={() => setReviewStep(0)} className="w-full text-sm text-stone-400">ยกเลิก</button>
            </div>
          )}
          {reviewStep === 2 && (
            <div className="space-y-5">
              <div className="font-bold text-xl text-center">ตรงกับ vibe แค่ไหน?</div>
              <p className="text-sm text-stone-500 text-center">ภาพที่ได้ตรงกับ vibe ที่คุณต้องการมากน้อยแค่ไหน</p>
              <StarRow value={reviewVibe} onChange={setReviewVibe} size={36}/>
              <div className="text-sm text-stone-400 text-center">
                {reviewVibe===0&&"แตะดาวเพื่อประเมิน"}{reviewVibe===1&&"ไม่ตรงเลย 😔"}{reviewVibe===2&&"ตรงนิดหน่อย"}{reviewVibe===3&&"ตรงพอสมควร"}{reviewVibe===4&&"ตรงมาก ✨"}{reviewVibe===5&&"ตรงใจ 100%! 🎯"}
              </div>
              <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} placeholder="เล่าประสบการณ์ให้ฟังหน่อย… (ไม่บังคับ)" className="w-full rounded-2xl p-3.5 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)", minHeight: "80px" }}/>
              <div className="flex gap-2">
                <button onClick={() => setReviewStep(1)} className="flex-1 py-3 rounded-2xl font-semibold border text-sm" style={{ borderColor: "#a8b5a0", color: "#7a8c72" }}>ย้อนกลับ</button>
                <button disabled={reviewVibe===0} onClick={() => setReviewStep(3)} className="flex-1 py-3 rounded-2xl font-semibold text-white text-sm" style={reviewVibe ? btnStyle : { background: "#d6d3d1" }}>ถัดไป</button>
              </div>
            </div>
          )}
          {reviewStep === 3 && (
            <div className="space-y-5">
              <div className="font-bold text-xl text-center">มีปัญหาอะไรไหม?</div>
              <p className="text-sm text-stone-500 text-center">เลือกได้หลายข้อ (ไม่บังคับ)</p>
              <div className="flex flex-wrap gap-2">
                {issueOptions.map(i => (
                  <button key={i} onClick={() => toggleIssue(i)} className="px-3 py-2 rounded-full text-xs font-medium" style={{ background: reviewIssues.includes(i)?"#fecdd3":"#f0e6d8", color: "#292524", border: reviewIssues.includes(i)?"1.5px solid #fda4af":"1.5px solid transparent" }}>{i}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setReviewStep(2)} className="flex-1 py-3 rounded-2xl font-semibold border text-sm" style={{ borderColor: "#a8b5a0", color: "#7a8c72" }}>ย้อนกลับ</button>
                <button onClick={submitReview} className="flex-1 py-3 rounded-2xl font-semibold text-white text-sm" style={btnStyle}>ส่งรีวิว ✓</button>
              </div>
            </div>
          )}
          {reviewStep === 4 && (
            <div className="space-y-4 text-center">
              <div className="text-5xl">🎉</div>
              <div className="font-bold text-xl">ขอบคุณสำหรับรีวิว!</div>
              <p className="text-sm text-stone-500">รีวิวของคุณช่วยให้ช่างภาพและชุมชน SnapBuddy เติบโตได้</p>
              <button onClick={() => setReviewStep(0)} className={btnPrimary} style={btnStyle}>เสร็จสิ้น</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MyReviewModal = () => {
    if (!showMyReview) return null;
    const r = selectedBooking.review;
    if (!r) return null;
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", background: "#faf6f1", borderRadius: "28px 28px 0 0", padding: "24px 20px 32px" }}>
          <div className="space-y-5">
            <div className="font-bold text-xl text-center">รีวิวของคุณ</div>
            <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.7)" }}>
              <div>
                <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ความพึงพอใจ</div>
                <div className="flex gap-1">{[1,2,3,4,5].map(n => <svg key={n} width="22" height="22" viewBox="0 0 24 24" fill={n<=r.rating?"#f59e0b":"none"} stroke={n<=r.rating?"#f59e0b":"#d6d3d1"} strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ตรงกับ vibe</div>
                <div className="flex gap-1">{[1,2,3,4,5].map(n => <svg key={n} width="22" height="22" viewBox="0 0 24 24" fill={n<=r.vibeMatch?"#a8b5a0":"none"} stroke={n<=r.vibeMatch?"#7a8c72":"#d6d3d1"} strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
              </div>
              {r.comment && <div><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ความคิดเห็น</div><p className="text-sm text-stone-700">"{r.comment}"</p></div>}
              {r.issues?.length > 0 && <div><div className="text-xs uppercase tracking-wider text-stone-400 mb-1">ปัญหาที่พบ</div><div className="flex flex-wrap gap-1.5">{r.issues.map(i => <span key={i} className="px-2 py-1 rounded-full text-xs bg-rose-100 text-rose-700">{i}</span>)}</div></div>}
            </div>
            <button onClick={() => setShowMyReview(false)} className={btnPrimary} style={btnStyle}>ปิด</button>
          </div>
        </div>
      </div>
    );
  };

  const BookingDetailsFooter = ({ booking }) => {
    if (booking.status === "กำลังจะถึง") return (
      <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
        <button onClick={() => addToGCal(booking)} className={btnPrimary} style={{ background: "white", border: "1.5px solid #4285F4", color: "#4285F4" }}>
          <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="36" height="32" rx="4" fill="white" stroke="#dadce0" strokeWidth="2"/><rect x="6" y="10" width="36" height="10" rx="4" fill="#4285F4"/><rect x="6" y="16" width="36" height="4" fill="#4285F4"/><rect x="13" y="4" width="4" height="10" rx="2" fill="#4285F4"/><rect x="31" y="4" width="4" height="10" rx="2" fill="#4285F4"/><text x="24" y="37" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4285F4">CAL</text></svg>
          เพิ่มใน Google Calendar
        </button>
      </div>
    );
    if (booking.status === "ได้รับภาพแล้ว") return (
      <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
        <button onClick={openReview} className={btnPrimary} style={btnStyle}>
          <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          รีวิว Booking นี้
        </button>
      </div>
    );
    if (booking.status === "เสร็จสิ้น") return (
      <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
        <button onClick={() => setShowMyReview(true)} className={btnPrimary} style={{ background: "white", border: "1.5px solid #a8b5a0", color: "#7a8c72" }}>
          <svg width="18" height="18" fill="none" stroke="#7a8c72" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ดูรีวิวของคุณ
        </button>
      </div>
    );
    return null;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#faf6f1", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "390px", height: "780px", borderRadius: "32px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.05)", background: "#faf6f1", position: "relative", display: "flex", flexDirection: "column" }}>

        {/* HOME */}
        {screen === "home" && (
          <div style={{ height: "100%", overflowY: "auto" }} className="text-stone-800">
            <Header right={
              <button onClick={() => setScreen("bookings")} className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </button>
            }/>
            <div className="px-4 pt-7 pb-24">
              <div className="mb-7">
                <h1 className="text-3xl font-bold leading-tight">ถ่ายภาพตาม vibe ของคุณ ✨</h1>
                <p className="text-sm text-stone-500 mt-2">ประสบการณ์ถ่ายภาพที่ AI ออกแบบให้ตรงกับสไตล์ของคุณ</p>
              </div>
              <button onClick={() => nav("intent","home")} className="w-full text-left bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-stone-100 text-sm text-stone-400">
                บอก vibe ของคุณ (เช่น เกาหลีนุ่มๆ, คาเฟ่แสงทอง…)
              </button>
              <section className="mt-7">
                <h2 className="text-xl font-bold mb-4">สถานที่แนะนำ</h2>
                <div className="flex gap-3 overflow-auto pb-1">
                  {topDestinations.map(d => (
                    <div key={d.title} onClick={() => nav("refine","home")} className={`min-w-32 h-40 rounded-3xl p-4 bg-gradient-to-br ${d.bg} relative shadow-sm cursor-pointer flex-shrink-0`}>
                      <div className="absolute top-3 right-3 text-2xl">{d.emoji}</div>
                      <div className="absolute bottom-4 left-4">
                        <div className="font-semibold text-sm">{d.title}</div>
                        <div className="text-xs text-stone-600">{d.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="mt-7">
                <h2 className="text-xl font-bold mb-4">🔥 กำลังนิยม</h2>
                <div className="grid gap-4">
                  {vibes.map(v => (
                    <div key={v.title} className="rounded-3xl overflow-hidden shadow-sm bg-white">
                      <div className={`bg-gradient-to-br ${v.bg} relative`} style={{ aspectRatio: "9/12" }}>
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }}/>
                        <div className="absolute top-4 left-4 text-4xl">{v.emoji}</div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                          {["heart","msg","share","bm"].map(k => (
                            <button key={k} onClick={() => k==="heart"&&setLiked(s=>({...s,[v.title]:!s[v.title]}))} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
                              {k==="heart"&&<svg width="20" height="20" fill={liked[v.title]?"white":"none"} stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                              {k==="msg"&&<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                              {k==="share"&&<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>}
                              {k==="bm"&&<svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>}
                            </button>
                          ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="font-bold text-lg leading-snug">{v.title}</div>
                          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>{v.cafe}</div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {v.tags.map(tag => <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.2)" }}>{tag}</span>)}
                          </div>
                          <button onClick={() => nav("refine","home")} className="mt-3 px-4 py-2 rounded-full bg-white text-stone-800 text-xs font-semibold">ลอง vibe นี้ ✨</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* INTENT */}
        {screen === "intent" && (
          <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <Header title="บอก vibe ของคุณ" onBack={() => setScreen("home")}/>
            <div className="px-5 py-6 space-y-6 flex-1">
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 block mb-2">อธิบาย vibe</label>
                <textarea value={vibeText} onChange={e => setVibeText(e.target.value)} className="w-full rounded-3xl p-4 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)", minHeight: "112px" }}/>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 block mb-2">รูป reference <span className="normal-case text-stone-400">(สูงสุด 5 รูป)</span></label>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => {
                  const files = Array.from(e.target.files);
                  const remaining = 5 - refImages.length;
                  files.slice(0, remaining).forEach(file => {
                    const url = URL.createObjectURL(file);
                    setRefImages(prev => [...prev, url]);
                  });
                  e.target.value = "";
                }}/>
                <div className="flex gap-2 flex-wrap">
                  {refImages.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0" style={{ outline: "2px solid #a8b5a0" }}>
                      <img src={src} alt="" className="w-full h-full object-cover"/>
                      <button onClick={() => setRefImages(prev => prev.filter((_,idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
                        <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  ))}
                  {refImages.length < 5 && (
                    <button onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 flex-shrink-0" style={{ borderColor: "#a8b5a0", background: "rgba(255,255,255,0.5)" }}>
                      <svg width="20" height="20" fill="none" stroke="#7a8c72" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                      <span className="text-xs" style={{ color: "#7a8c72" }}>เพิ่ม</span>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-500 block mb-3">โอกาส</label>
                <div className="flex flex-wrap gap-2">
                  {["🎂 วันเกิด","📸 คอนเทนต์","💕 เดต","☕ ทั่วไป"].map(o => (
                    <button key={o} onClick={() => setOccasion(o)} className="px-4 py-2 rounded-full text-xs font-medium" style={{ background: occasion===o?"#a8b5a0":"#f0e6d8", color: occasion===o?"white":"#57534e" }}>{o}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
              <button disabled={!vibeText.trim() && !refImages.length} onClick={() => { generateTags(); nav("refine","intent"); }} className={btnPrimary} style={vibeText.trim()||refImages.length ? btnStyle : { background: "#d6d3d1" }}>
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                สร้าง Shoot ของฉัน
              </button>
            </div>
          </div>
        )}

        {/* REFINE */}
        {screen === "refine" && (
          <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
            <Header title="ปรับแต่ง Shoot" onBack={() => setScreen(prevScreen || "home")}/>
            <div className="px-5 py-6 space-y-7">
              {(vibeText.trim() || refImages.length > 0 || selectedTags.length > 0) && (
                <div className="rounded-3xl p-4 space-y-4" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-500 mb-1">แท็ก mood ที่แนะนำ</div>
                    <div className="text-xs text-stone-400">แก้ไขก่อนจับคู่ได้เลย</div>
                  </div>
                  {selectedTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ background: "#7a8c72" }}>
                          {tag}
                          <button onClick={() => removeTag(tag)} className="rounded-full p-0.5">
                            <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <button onClick={generateTags} className="px-3 py-2 rounded-xl text-stone-700 text-xs font-semibold" style={{ background: "#f0e6d8" }}>แนะนำแท็กจาก vibe ของคุณ</button>
                  )}
                  <div className="flex gap-2">
                    <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter"){e.preventDefault();addTag(tagInput);} }} placeholder="เพิ่มแท็ก mood" className="flex-1 rounded-2xl px-3 py-2.5 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)" }}/>
                    <button onClick={() => addTag(tagInput)} className="px-4 rounded-2xl text-stone-700 text-sm font-semibold" style={{ background: "#f0e6d8" }}>เพิ่ม</button>
                  </div>
                </div>
              )}
              <div>
                <div className="flex justify-between mb-2"><span className="uppercase tracking-wider text-xs text-stone-500">งบประมาณ</span><span className="font-semibold text-xs" style={{ color: "#7a8c72" }}>บาท</span></div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">฿</span>
                  <input type="number" min={0} value={budget} onChange={e => setBudget(Number(e.target.value||0))} className="w-full rounded-2xl pl-8 pr-4 py-3 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)" }}/>
                </div>
              </div>
              <div>
                <div className="uppercase tracking-wider text-xs text-stone-500 mb-2">วันและเวลา</div>
                <div className="flex gap-2">
                  <input type="date" className="flex-1 rounded-2xl px-3 py-2.5 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)" }}/>
                  <input type="time" className="rounded-2xl px-3 py-2.5 text-sm outline-none" style={{ background: "rgba(240,230,216,0.6)", width: "128px" }}/>
                </div>
              </div>
              <div>
                <div className="uppercase tracking-wider text-xs text-stone-500 mb-2">รัศมีสถานที่</div>
                <div className="h-32 rounded-3xl relative flex items-center justify-center overflow-hidden" style={{ background: "#f0e6d8" }}>
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(168,181,160,0.45), transparent 60%)" }}/>
                  <div className="relative text-center">
                    <svg width="24" height="24" fill="none" stroke="#7a8c72" strokeWidth="2" viewBox="0 0 24 24" className="mx-auto mb-1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div className="text-xs text-stone-500">รัศมี 5 กม.</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2"><span className="uppercase tracking-wider text-xs text-stone-500">จำนวนคน</span><span className="font-semibold" style={{ color: "#7a8c72" }}>{groupSize} คน</span></div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setGroupSize(s => Math.max(1,s-1))} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#f0e6d8" }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                  </button>
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#f0e6d8" }}>
                    <div className="h-full" style={{ width: `${Math.min(100,groupSize*25)}%`, background: "#7a8c72" }}/>
                  </div>
                  <button onClick={() => setGroupSize(s => Math.min(4,s+1))} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#f0e6d8" }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="uppercase tracking-wider text-xs text-stone-500 mb-2">บริการเสริม</div>
                <div className="flex flex-wrap gap-2">
                  {["💄 แต่งหน้า","👗 ชุด","🎀 พรอพ"].map(a => (
                    <button key={a} onClick={() => toggleAddon(a)} className="px-4 py-2 rounded-full text-xs font-medium" style={{ background: addons.includes(a)?"#fecdd3":"#f0e6d8", color: "#292524" }}>{a}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
              <button onClick={goGenerating} className={btnPrimary} style={btnStyle}>
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 4V2m0 20v-2M4 15H2m20 0h-2m-2.05-8.95L16.54 7.46M7.46 16.54l-1.41 1.41M18.95 18.95l-1.41-1.41M5.91 5.91 7.46 7.46M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
                สร้างแผน Shoot ของฉัน
              </button>
            </div>
          </div>
        )}

        {/* GENERATING */}
        {screen === "generating" && (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} className="px-8 text-center">
            <div>
              <div className="flex gap-2 justify-center mb-6">
                {["#a8b5a0","#7a8c72","#c9a96e"].map((c,i) => (
                  <div key={c} className="w-3 h-3 rounded-full animate-bounce" style={{ background: c, animationDelay: `${i*120}ms` }}/>
                ))}
              </div>
              <h2 className="text-2xl font-bold mb-2">AI กำลังออกแบบ Shoot ของคุณ…</h2>
              <p className="text-sm text-stone-500">กำลังจับคู่ vibe แสง และ buddy ที่ใช่ที่สุด</p>
              <div className="mt-6 h-2 rounded-full overflow-hidden mx-auto" style={{ width: "208px", background: "#f0e6d8" }}>
                <div className="h-full transition-all" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#a8b5a0,#c9a96e)" }}/>
              </div>
            </div>
          </div>
        )}

        {/* PLAN */}
        {screen === "plan" && (
          <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
            <Header title="แผน Shoot ของคุณ" onBack={() => setScreen("refine")}/>
            <div className="px-5 py-6 space-y-5">
              <div className="rounded-3xl p-5 bg-gradient-to-br from-green-100 to-rose-100">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,0.5)" }}>🍵</div>
                  <div>
                    <div className="text-lg font-bold">เช้าคาเฟ่สไตล์เกาหลีนุ่มๆ</div>
                    <div className="text-xs text-stone-500 mt-1">โกลเด้นอาวร์ · แสงธรรมชาติ · โทนอบอุ่น</div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {["#แสงแดด","#อบอุ่น","#มัทฉะ"].map(t => <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.7)", color: "#57534e" }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[["คาเฟ่","Mellow Grounds","อิแทวอน"],["เวลาที่ดีสุด","08:30 น.","ช่วงโกลเด้นอาวร์"],["ราคา","฿95","ครบทุกอย่าง"],["ระยะเวลา","90 นาที","+ บัฟเฟอร์ 15 นาที"]].map(([k,v1,v2]) => (
                  <div key={k} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.7)" }}>
                    <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">{k}</div>
                    <div className="font-semibold">{v1}</div>
                    <div className="text-xs text-stone-500">{v2}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="font-semibold mb-3">รายการช็อต</div>
                <div className="space-y-3 text-sm">
                  {[["⭐","ช็อตหลัก","ที่นั่งริมหน้าต่างกับมัทฉะ แสงนุ่ม"],["📷","หัวเราะธรรมชาติ","โมเมนต์การสนทนาตามธรรมชาติ"],["📷","โคลสอัพรายละเอียด","มือถือแก้วเซรามิก"],["💡","โน้ตแสง","หันหน้าไปทางหน้าต่างทิศตะวันออก"]].map(([icon,title,sub]) => (
                    <div key={title} className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">{icon}</div>
                      <div><div className="font-medium">{title}</div><div className="text-xs text-stone-500">{sub}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="font-semibold mb-3">ไอเดียโพส</div>
                <div className="flex gap-2 overflow-auto">
                  {["🧘‍♀️","📖","☕","🪟"].map(x => (
                    <div key={x} className="w-20 h-20 flex-shrink-0 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center text-2xl">{x}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-200 flex gap-3" style={{ background: "#faf6f1" }}>
              <button onClick={() => nav("refine","plan")} className="flex-1 py-3 rounded-2xl font-semibold border" style={{ borderColor: "#a8b5a0", color: "#7a8c72" }}>ปรับเพิ่มเติม</button>
              <button onClick={() => setScreen("matching")} className="flex-1 py-3 rounded-2xl font-semibold text-white" style={btnStyle}>โอเค ✓</button>
            </div>
          </div>
        )}

        {/* MATCHING */}
        {screen === "matching" && (
          <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
            <Header title="ผลการจับคู่" onBack={() => setScreen("plan")}/>
            <div className="px-5 pt-4 flex gap-2">
              {["แมทช์ดีสุด","งบน้อยสุด","เรตติ้งสูงสุด"].map(t => (
                <button key={t} onClick={() => setTab(t)} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: tab===t?"#1c1917":"#f0e6d8", color: tab===t?"white":"#57534e" }}>{t}</button>
              ))}
            </div>
            <div className="px-5 py-4 space-y-4">
              {buddies.map(b => (
                <div key={b.name} className="rounded-3xl p-5 shadow-sm" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-rose-100 flex items-center justify-center">📸</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-bold truncate">{b.name}</div>
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-medium" style={{ background: b.available?"#dcfce7":"#e7e5e4", color: b.available?"#15803d":"#78716c" }}>{b.available?"ว่างอยู่":"รอคิว"}</span>
                      </div>
                      <div className="text-xs text-stone-500">เชี่ยวชาญ {b.style}</div>
                      <div className="text-xs mt-1 text-amber-600">★ {b.rating} ({b.reviews} รีวิว) <span className="text-stone-400 ml-2">฿{b.price}</span></div>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ border: "3px solid #7a8c72" }}>{b.match}%</div>
                  </div>
                  <div className="flex gap-2 mt-4 overflow-auto">
                    {[1,2,3,4].map(i => <div key={i} className="w-16 h-20 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 flex-shrink-0"/>)}
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[["สไตล์",b.match],["งบ",b.match-5],["ว่าง",b.available?100:30],["เรต",Math.round(b.rating*20)]].map(([label,val]) => (
                      <div key={label} className="text-center">
                        <div className="text-xs text-stone-400 mb-1">{label}</div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "#f0e6d8" }}>
                          <div className="h-full" style={{ width: `${val}%`, background: "#7a8c72" }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 rounded-xl text-stone-700 text-xs font-medium" style={{ background: "#f0e6d8" }}>ทำไมถึงแมทช์?</button>
                    <button onClick={() => setScreen("booking")} className="flex-1 py-2 rounded-xl text-white text-xs font-medium" style={btnStyle}>เลือก</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKING CONFIRM */}
        {screen === "booking" && (
          <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
            <Header title="ยืนยันการจอง" onBack={() => setScreen("matching")}/>
            <div className="px-5 py-6 space-y-5">
              <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-rose-100 flex items-center justify-center">📸</div>
                  <div>
                    <div className="font-bold">จีซู เค.</div>
                    <div className="text-xs text-stone-500">Buddy อันดับ 1 · แมทช์ 98%</div>
                    <div className="text-xs text-amber-600 mt-1">★★★★★ <span className="text-stone-400">4.9 (127 รีวิว)</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><div className="text-xs uppercase tracking-wider text-stone-400">คาเฟ่</div><div className="font-medium">Mellow Grounds</div></div>
                  <div><div className="text-xs uppercase tracking-wider text-stone-400">วันที่</div><div className="font-medium">พรุ่งนี้ 08:30 น.</div></div>
                </div>
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="font-semibold text-sm mb-3">สรุปราคา</div>
                <div className="space-y-2 text-sm">
                  {[["ค่า Buddy (90 นาที)","฿65"],["ค่าจองคาเฟ่","฿15"],["ค่าแพลตฟอร์ม","฿10"],["บริการเสริม","฿5"]].map(([k,v]) => (
                    <div key={k} className="flex justify-between"><span className="text-stone-500">{k}</span><span>{v}</span></div>
                  ))}
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold"><span>รวม</span><span style={{ color: "#7a8c72" }}>฿95</span></div>
                </div>
              </div>
              <div className="rounded-3xl p-5 space-y-3 text-xs text-stone-600" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="font-semibold text-sm text-stone-800">ความปลอดภัยและการรับประกัน</div>
                {["ยืนยันตัวตนและผลงานแล้ว","ยกเลิกฟรีก่อน 24 ชม.","คืนเงินเต็มหาก vibe ไม่ตรง"].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg width="12" height="12" fill="none" stroke="#15803d" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>{t}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
              <button onClick={() => setScreen("dashboard")} className={btnPrimary} style={btnStyle}>
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                จองเลย · ฿95
              </button>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {screen === "dashboard" && (
          <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
            <Header title="แดชบอร์ด Shoot" onBack={() => setScreen("home")}/>
            <div className="px-5 py-6 space-y-5">
              <div className="rounded-3xl p-5 flex gap-4 items-center bg-gradient-to-r from-green-100 to-amber-50">
                <div className="w-12 h-12 rounded-2xl bg-green-200 flex items-center justify-center">✅</div>
                <div><div className="font-bold">จองสำเร็จแล้ว!</div><div className="text-xs text-stone-500">พรุ่งนี้ · 08:30 น. · Mellow Grounds</div></div>
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="font-semibold text-sm mb-3">เช็กลิสต์ก่อน Shoot</div>
                <div className="space-y-3 text-sm">
                  {checklist.map(([label,done]) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: done?"#7a8c72":"transparent", border: done?"none":"2px solid #a8b5a0" }}>
                        {done && <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>}
                      </div>
                      <span className={done?"line-through text-stone-400":""}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="font-semibold text-sm mb-3">แนะนำชุด</div>
                <div className="flex gap-3 overflow-auto">
                  {[["🧥","เสื้อถัก"],["👕","เสื้อครีม"],["👖","กางเกงขาบาน"]].map(([icon,label]) => (
                    <div key={label} className="flex-shrink-0 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-xl mb-1">{icon}</div>
                      <div className="text-xs text-stone-500">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl p-5 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="text-3xl">🌤️</div>
                <div><div className="text-sm font-semibold">22°C · มีเมฆบางส่วน</div><div className="text-xs text-stone-500">แสงธรรมชาติดีเยี่ยม</div></div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
              <button onClick={() => { setSelectedBooking(bookings[0]); setScreen("bookingDetails"); }} className={btnPrimary} style={btnStyle}>
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                รายละเอียดการจอง
              </button>
            </div>
          </div>
        )}

        {/* BOOKINGS LIST */}
        {screen === "bookings" && (
          <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
            <Header title="การจองของฉัน" onBack={() => setScreen("home")}/>
            <div className="px-5 py-6 space-y-4">
              {bookings.map(booking => (
                <button key={booking.id} onClick={() => { setSelectedBooking(booking); setScreen("bookingDetails"); }} className="w-full rounded-3xl p-5 text-left shadow-sm" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-rose-100 flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" fill="none" stroke="#7a8c72" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold truncate">{booking.title}</div>
                        <StatusBadge tone={booking.statusTone}>{booking.status}</StatusBadge>
                      </div>
                      <div className="text-xs text-stone-500 mt-1">{booking.location}</div>
                      <div className="flex items-center justify-between mt-3 text-xs text-stone-500">
                        <span>🕐 {booking.date}</span><span>{booking.total}</span>
                      </div>
                      <div className="text-xs text-stone-400 mt-1">ช่างภาพ: {booking.photographer}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BOOKING DETAILS */}
        {screen === "bookingDetails" && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Header title="รายละเอียดการจอง" onBack={() => setScreen("bookings")}/>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <div className="px-4 py-5 space-y-5">
                <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{selectedBooking.title}</div>
                      <div className="text-xs text-stone-500 mt-1">{selectedBooking.location}</div>
                      <div className="text-xs text-stone-400 mt-1">{selectedBooking.date} · {selectedBooking.photographer}</div>
                    </div>
                    <StatusBadge tone={selectedBooking.statusTone}>{selectedBooking.status}</StatusBadge>
                  </div>
                </div>

                <div className="rounded-3xl p-5 space-y-3" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="font-semibold">สรุปการจอง</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[["ช่างภาพ",selectedBooking.photographer],["ราคารวม",selectedBooking.total],["วันที่",selectedBooking.date],["สถานที่",selectedBooking.location]].map(([k,v]) => (
                      <div key={k}><div className="text-xs uppercase tracking-wider text-stone-400">{k}</div><div className="font-medium">{v}</div></div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="flex items-center justify-between">
                    <div><div className="font-semibold">แกลเลอรี</div><div className="text-xs text-stone-500 mt-1">ภาพตัวอย่างจาก booking นี้</div></div>
                    <button className="text-xs font-medium" style={{ color: "#7a8c72" }}>ดูทั้งหมด</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2" style={{ gridAutoRows: "92px" }}>
                    {selectedBooking.gallery?.map((item, index) => (
                      <button key={`${selectedBooking.id}-${index}`} className={`${index===0?"col-span-2 row-span-2":""} rounded-2xl bg-gradient-to-br from-rose-100 via-orange-100 to-amber-50 flex items-center justify-center shadow-sm`}>
                        <span style={{ fontSize: index===0?"3.5rem":"1.75rem" }}>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}>
                  <div className="font-semibold mb-3">สิ่งที่ได้รับ</div>
                  <div className="space-y-2 text-sm text-stone-600">
                    {["ภาพแต่งสำเร็จ 15 ใบ","ส่งภาพภายใน 48 ชม.","มูดบอร์ดและคำแนะนำโพส"].map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <svg width="16" height="16" fill="none" stroke="#7a8c72" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>{t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <BookingDetailsFooter booking={selectedBooking}/>
            <ReviewModal/>
            <MyReviewModal/>
          </div>
        )}

      </div>
    </div>
  );
}