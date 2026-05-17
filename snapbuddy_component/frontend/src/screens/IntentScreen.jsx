import Header from "../components/Header";
import { useEffect } from "react";

const btnStyle = { background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" };
const btnPrimary = "w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2";

export default function IntentScreen({
  setScreen,
  prevScreen,
  intentSource,
  vibeText,
  setVibeText,
  selectedTags,
  tagInput,
  setTagInput,
  generateTags,
  addTag,
  removeTag,
  date,
  setDate,
  time,
  setTime,
  locationArea,
  setLocationArea,
  budget,
  setBudget,
  groupSize,
  setGroupSize,
  note,
  setNote,
  refImages,
  setRefImages,
  fileInputRef,
  goGenerating,
  isAnalyzing,
  analyzeError,
}) {
  useEffect(() => {
    if (intentSource !== "search" || !vibeText.trim()) return;

    const timeoutId = setTimeout(() => {
      generateTags();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [vibeText]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", paddingBottom: "80px" }}>
      <Header title="บอกความต้องการของคุณ" onBack={() => setScreen(prevScreen || "home")} />
      
      <div className="px-5 py-6 space-y-7 flex-1">
        
        {/* Vibe & Tags Section */}
        <div className="rounded-3xl p-4 space-y-4" style={{ background: "rgba(255,255,255,0.7)" }}>
          {intentSource === "search" && (
            <div>
              <label className="text-xs uppercase tracking-wider text-stone-500 block mb-2">อธิบาย vibe</label>
              <textarea 
                value={vibeText} 
                onChange={(e) => setVibeText(e.target.value)} 
                className="w-full rounded-2xl p-4 text-sm outline-none" 
                style={{ background: "rgba(240,230,216,0.6)", minHeight: "112px" }} 
                placeholder="เช่น old money โทนครีม แสงเช้า ดูแพงแต่สบายๆ" 
              />
            </div>
          )}

          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 mb-2">
              แท็ก Vibe (แนะนำ)
            </div>
            {selectedTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-medium"
                    style={{ background: "#7a8c72" }}
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="rounded-full p-0.5">
                      <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={generateTags}
                disabled={isAnalyzing}
                className="px-3 py-2 rounded-xl text-stone-700 text-xs font-semibold"
                style={{ background: "#f0e6d8" }}
              >
                {isAnalyzing ? "Analyzing..." : "แนะนำแท็กจาก vibe ของคุณ"}
              </button>
            )}

            {analyzeError && (
              <div className="rounded-2xl px-4 py-3 text-sm text-amber-900 mt-3" style={{ background: "#fef3c7" }}>
                {analyzeError}
              </div>
            )}
            
            <div className="flex gap-2 flex-wrap mt-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
                placeholder="พิมพ์แท็กเองแล้วกดเพิ่ม"
                className="flex-1 min-w-[140px] rounded-2xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "rgba(240,230,216,0.6)" }}
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="px-4 rounded-2xl text-stone-700 text-sm font-semibold"
                style={{ background: "#f0e6d8" }}
              >
                เพิ่ม
              </button>
              {selectedTags.length > 0 && intentSource === "search" && (
                <button
                  type="button"
                  onClick={generateTags}
                  disabled={isAnalyzing}
                  className="px-4 rounded-2xl text-sm font-semibold text-white"
                  style={{ background: isAnalyzing ? "#d6d3d1" : "#7a8c72" }}
                >
                  Gen ใหม่
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Date / Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="uppercase tracking-wider text-xs text-stone-500 mb-2 block">วันที่สะดวก</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 text-sm outline-none text-stone-700" 
              style={{ background: "rgba(240,230,216,0.6)" }} 
            />
          </div>
          <div>
            <label className="uppercase tracking-wider text-xs text-stone-500 mb-2 block">เวลา</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 text-sm outline-none text-stone-700" 
              style={{ background: "rgba(240,230,216,0.6)" }} 
            />
          </div>
        </div>

        {/* Location Area */}
        <div>
          <label className="uppercase tracking-wider text-xs text-stone-500 mb-2 block">พื้นที่ / สถานที่ที่สะดวก</label>
          <input 
            type="text" 
            value={locationArea} 
            onChange={(e) => setLocationArea(e.target.value)}
            placeholder="เช่น สยาม, อารีย์, พารากอน"
            className="w-full rounded-2xl px-4 py-3 text-sm outline-none" 
            style={{ background: "rgba(240,230,216,0.6)" }} 
          />
        </div>

        {/* Budget */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="uppercase tracking-wider text-xs text-stone-500">งบประมาณ</span>
            <span className="font-semibold text-xs" style={{ color: "#7a8c72" }}>บาท</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">฿</span>
            <input
              type="number"
              min={0}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value || 0))}
              className="w-full rounded-2xl pl-8 pr-4 py-3 text-sm outline-none"
              style={{ background: "rgba(240,230,216,0.6)" }}
            />
          </div>
        </div>

        {/* Group Size */}
        <div>
          <div className="uppercase tracking-wider text-xs text-stone-500 mb-2">จำนวนคน</div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGroupSize((s) => Math.max(1, s - 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#f0e6d8" }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
            </button>
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#f0e6d8" }}>
              <div className="h-full" style={{ width: `${Math.min(100, groupSize * 25)}%`, background: "#7a8c72" }} />
            </div>
            <button
              type="button"
              onClick={() => setGroupSize((s) => Math.min(4, s + 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#f0e6d8" }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            </button>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="uppercase tracking-wider text-xs text-stone-500 mb-2 block">Note ถึง Buddy (Optional)</label>
          <textarea 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            className="w-full rounded-2xl p-4 text-sm outline-none" 
            style={{ background: "rgba(240,230,216,0.6)", minHeight: "80px" }} 
            placeholder="ฝากบอกอะไรช่างภาพเป็นพิเศษไหม..." 
          />
        </div>

        {/* Ref Images */}
        <div>
          <label className="text-xs uppercase tracking-wider text-stone-500 block mb-2">รูป Reference <span className="normal-case text-stone-400">(Optional สูงสุด 5 รูป)</span></label>
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            multiple 
            className="hidden" 
            onChange={(e) => { 
              const files = Array.from(e.target.files); 
              const remaining = 5 - refImages.length; 
              files.slice(0, remaining).forEach((file) => { 
                const url = URL.createObjectURL(file); 
                setRefImages((prev) => [...prev, url]); 
              }); 
              e.target.value = ""; 
            }} 
          />
          <div className="flex gap-2 flex-wrap">
            {refImages.map((src, i) => (
              <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0" style={{ outline: "2px solid #a8b5a0" }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setRefImages((prev) => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
                  <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            {refImages.length < 5 && (
              <button onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 flex-shrink-0" style={{ borderColor: "#a8b5a0", background: "rgba(255,255,255,0.5)" }}>
                <svg width="20" height="20" fill="none" stroke="#7a8c72" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                <span className="text-xs" style={{ color: "#7a8c72" }}>เพิ่ม</span>
              </button>
            )}
          </div>
        </div>

      </div>

      <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}>
        <button
          type="button"
          onClick={goGenerating}
          className={btnPrimary}
          style={btnStyle}
        >
          สร้างแผน Shoot ของฉัน
        </button>
      </div>
    </div>
  );
}
