import { useState } from "react";
import Header from "../components/Header";

export default function BookingScreen({ 
  setScreen, 
  setSelectedBooking, 
  selectedPackage, 
  date, setDate,
  time, setTime,
  note, setNote,
  bookings, setBookings
}) {
  const [localDate, setLocalDate] = useState(date || "");
  const [localTime, setLocalTime] = useState(time || "");
  const [localNote, setLocalNote] = useState(note || "");
  const [isBooking, setIsBooking] = useState(false);
  
  // Add-ons state
  const [addons, setAddons] = useState({
    styling: false,
    extraPhotos: false,
  });

  const addonPrices = {
    styling: 500,
    extraPhotos: 300,
  };

  if (!selectedPackage) {
    return (
      <div style={{ height: "100%", paddingBottom: "80px", backgroundColor: "#f9fafb" }}>
        <Header title="ยืนยันการจอง" onBack={() => setScreen("plan")} />
        <div className="p-5 text-center text-stone-500">กรุณาเลือกแพ็กเกจก่อน</div>
      </div>
    );
  }

  const basePrice = selectedPackage.price;
  let totalPrice = basePrice;
  if (addons.styling) totalPrice += addonPrices.styling;
  if (addons.extraPhotos) totalPrice += addonPrices.extraPhotos;

  const handleBooking = () => {
    setIsBooking(true);
    
    if (setDate) setDate(localDate);
    if (setTime) setTime(localTime);
    if (setNote) setNote(localNote);

    setTimeout(() => {
      setIsBooking(false);
      
      const newBooking = {
        id: Date.now(),
        title: selectedPackage.packageName,
        location: `${selectedPackage.cafe.name} · ${selectedPackage.cafe.location}`,
        date: `${localDate || "ไม่ระบุวัน"} ${localTime || "ไม่ระบุเวลา"}`,
        photographer: selectedPackage.photographer.name,
        status: "รอการยืนยัน",
        statusTone: "amber",
        total: `฿${totalPrice}`,
        gallery: selectedPackage.portfolio,
        review: null,
        note: localNote,
      };

      if (setBookings) {
         setBookings([newBooking, ...bookings]);
      }
      setSelectedBooking(newBooking);
      setScreen("bookingDetails");
    }, 2000);
  };

  return (
    <div className="text-stone-800" style={{ height: "100%", overflowY: "auto", paddingBottom: "180px", backgroundColor: "#f9fafb" }}>
      <Header title="ยืนยันการจอง" onBack={() => setScreen("plan")} />
      
      {isBooking ? (
        <div className="flex flex-col items-center justify-center pt-20 pb-10 space-y-4">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-[#7a8c72] rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="font-bold text-stone-800 text-lg">กำลังดำเนินการ...</h3>
            <p className="text-sm text-stone-500">เช็กคิวว่าง และล็อกสล็อตชั่วคราว</p>
          </div>
        </div>
      ) : (
        <div className="px-5 py-6 space-y-6">
          
          {/* Section 1: Package Overview */}
          <div className="rounded-3xl p-5 bg-white shadow-sm border border-stone-100">
            <div className="font-bold text-lg text-stone-800 mb-4">{selectedPackage.packageName}</div>
            
            <div className="flex gap-4 items-center mb-5">
              <div className="flex -space-x-4">
                <img src={selectedPackage.photographer.avatar} alt="Photographer" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                <img src={selectedPackage.cafe.image} alt="Cafe" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
              </div>
              <div>
                <div className="font-semibold text-stone-800">{selectedPackage.photographer.name}</div>
                <div className="text-sm text-stone-500">📍 {selectedPackage.cafe.name}</div>
              </div>
            </div>

            <div className="space-y-2 border-t border-stone-50 pt-4">
              <div className="flex gap-2 items-center text-sm">
                <span className="text-stone-400">⏱</span>
                <span className="text-stone-700">ระยะเวลาถ่าย: <span className="font-medium">30 นาที</span></span>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <span className="text-stone-400">📸</span>
                <span className="text-stone-700">สิ่งที่ได้รับ: <span className="font-medium">รูปปรับแต่งสี 50 รูปขึ้นไป</span></span>
              </div>
            </div>
          </div>

          {/* Section 2: Portfolio Preview */}
          <div>
            <div className="text-sm font-semibold text-stone-700 mb-3 px-1">ตัวอย่างผลงานแพ็กเกจนี้</div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {selectedPackage.portfolio.map((img, i) => (
                <img key={i} src={img} alt="" className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 shadow-sm" />
              ))}
            </div>
          </div>

          {/* Section 3: User Inputs */}
          <div className="space-y-4">
            <div className="text-sm font-semibold text-stone-700 px-1">รายละเอียดการจอง</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="uppercase tracking-wider text-[10px] font-bold text-stone-500 mb-1.5 block px-1">วันที่</label>
                <input 
                  type="date" 
                  value={localDate} 
                  onChange={(e) => setLocalDate(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 text-sm outline-none text-stone-700 bg-white border border-stone-200 focus:border-[#7a8c72]" 
                />
              </div>
              <div>
                <label className="uppercase tracking-wider text-[10px] font-bold text-stone-500 mb-1.5 block px-1">เวลา</label>
                <input 
                  type="time" 
                  value={localTime} 
                  onChange={(e) => setLocalTime(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 text-sm outline-none text-stone-700 bg-white border border-stone-200 focus:border-[#7a8c72]" 
                />
              </div>
            </div>

            <div>
              <label className="uppercase tracking-wider text-[10px] font-bold text-stone-500 mb-1.5 block px-1">Note ถึงช่างภาพ (Optional)</label>
              <textarea 
                value={localNote} 
                onChange={(e) => setLocalNote(e.target.value)} 
                className="w-full rounded-2xl p-4 text-sm outline-none bg-white border border-stone-200 focus:border-[#7a8c72]" 
                style={{ minHeight: "80px" }} 
                placeholder="เช่น ต้องการเน้นถ่ายมุมเผลอ..." 
              />
            </div>
          </div>

          {/* Section 4: Add-ons */}
          <div>
            <div className="text-sm font-semibold text-stone-700 mb-3 px-1">บริการเพิ่มเติม (Add-ons)</div>
            <div className="space-y-3">
              <label 
                onClick={() => setAddons(prev => ({ ...prev, styling: !prev.styling }))}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${addons.styling ? "bg-[#7a8c72] border-[#7a8c72]" : "border-2 border-stone-300"}`}>
                    {addons.styling && <svg width="12" height="12" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-800">Styling & Props</div>
                    <div className="text-xs text-stone-500">ช่วยจัดแต่งชุดและเตรียมพร็อพให้เข้ากับ Vibe</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-stone-800">+฿500</div>
              </label>

              {/* Extra Photos */}
              <label 
                onClick={() => setAddons(prev => ({ ...prev, extraPhotos: !prev.extraPhotos }))}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${addons.extraPhotos ? "bg-[#7a8c72] border-[#7a8c72]" : "border-2 border-stone-300"}`}>
                    {addons.extraPhotos && <svg width="12" height="12" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-800">Extra Photos</div>
                    <div className="text-xs text-stone-500">รูปภาพรีทัชเพิ่มเติม 20 รูป</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-stone-800">+฿300</div>
              </label>
            </div>
          </div>

          {/* Section 5: Cancellation Policy */}
          <div className="rounded-2xl p-4 bg-stone-100 border border-stone-200">
            <div className="flex gap-2 items-start">
              <svg className="flex-shrink-0 mt-0.5" width="16" height="16" fill="none" stroke="#78716c" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <div className="text-xs font-bold text-stone-700">Cancellation Policy</div>
                <div className="text-[11px] text-stone-500 leading-relaxed mt-1">
                  สามารถยกเลิกฟรีได้ภายใน 24 ชั่วโมงก่อนเริ่มการถ่ายทำ หากยกเลิกหลังจากนั้น จะมีค่าธรรมเนียม 50% ของราคาแพ็กเกจ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer / Summary */}
      {!isBooking && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-stone-200 bg-white" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <div className="flex items-end justify-between mb-4 px-2">
            <div>
              <div className="text-xs text-stone-500 mb-1">ยอดรวมทั้งหมด</div>
              <div className="font-bold text-2xl text-stone-800">฿{totalPrice}</div>
            </div>
            <div className="text-right text-xs text-stone-500">
              รวมภาษีแล้ว
            </div>
          </div>
          <button 
            onClick={handleBooking} 
            className="w-full py-4 rounded-2xl font-bold text-white text-base shadow-lg shadow-[#7a8c72]/30 active:scale-[0.98] transition-transform" 
            style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" }}
          >
            ยืนยันและชำระเงิน
          </button>
        </div>
      )}
    </div>
  );
}
