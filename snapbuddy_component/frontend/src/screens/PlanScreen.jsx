import { useState, useMemo } from "react";
import Header from "../components/Header";
import { packages } from "../data/packagesData";

export default function PlanScreen({ setScreen, nav, vibeText, budget, locationArea, selectedBooking, setSelectedBooking, setSelectedPackage }) {
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");
  const [galleryImages, setGalleryImages] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filters = ["ทั้งหมด", "ราคา", "พื้นที่", "วันที่", "สไตล์", "เรตติ้ง"];

  // Mock matching algorithm (sort/filter based on inputs)
  const sortedPackages = useMemo(() => {
    let sorted = [...packages];
    
    // Sort by match score natively as the "Matching Algorithm"
    sorted.sort((a, b) => b.matchScore - a.matchScore);

    // Apply basic filter tabs logic
    if (activeFilter === "ราคา") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (activeFilter === "เรตติ้ง") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    
    return sorted;
  }, [activeFilter, budget, locationArea]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setScreen("booking");
  };

  return (
    <div className="text-stone-800" style={{ height: "100%", overflowY: "auto", paddingBottom: "80px", backgroundColor: "#f9fafb" }}>
      <Header title="แผน Shoot ของคุณ" onBack={() => nav("intent", "plan")} />
      
      {/* Filters */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{
                background: activeFilter === f ? "#1c1917" : "#f0e6d8",
                color: activeFilter === f ? "white" : "#57534e",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Package Options */}
      <div className="px-5 py-4 space-y-6">
        <div className="text-sm font-semibold text-stone-700">แนะนำสำหรับคุณ ({sortedPackages.length} ตัวเลือก)</div>
        
        {sortedPackages.map((pkg) => (
          <div key={pkg.id} className="rounded-3xl bg-white shadow-sm overflow-hidden border border-stone-100">
            {/* Header: Package Name & Match Score */}
            <div className="p-4 border-b border-stone-50 flex justify-between items-start gap-4">
              <div>
                <h3 className="font-bold text-stone-800 leading-tight">{pkg.packageName}</h3>
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Match {pkg.matchScore}%
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-lg text-stone-800">฿{pkg.price} <span className="text-sm font-normal text-stone-500">/ 30 นาที</span></div>
              </div>
            </div>

            {/* Photographer & Cafe Details */}
            <div className="p-4 flex gap-3 items-center bg-stone-50/50">
              <div className="flex -space-x-3">
                <img src={pkg.photographer.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src={pkg.cafe.image} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-stone-800 truncate">
                  {pkg.photographer.name} x {pkg.cafe.name}
                </div>
                <div className="text-xs text-stone-500 truncate mt-0.5">
                  📍 {pkg.cafe.location} · {pkg.style}
                </div>
              </div>
            </div>

            {/* Availability & Rating */}
            <div className="px-4 py-3 flex items-center justify-between text-xs text-stone-600 border-t border-stone-50">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" fill="none" stroke="#a8b5a0" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {pkg.availableTime}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-500">★</span>
                <span className="font-medium text-stone-800">{pkg.rating}</span>
                <span className="text-stone-400">({pkg.reviews})</span>
              </div>
            </div>

            {/* Match Reason */}
            <div className="px-4 py-3 bg-green-50/50">
              <div className="text-xs text-green-800 leading-relaxed">
                <span className="font-semibold">ทำไมถึงแมทช์?</span> {pkg.matchReason}
              </div>
            </div>

            {/* Portfolio Previews */}
            <div className="px-4 py-3">
              <div className="text-[10px] uppercase tracking-wider text-stone-400 mb-2">ตัวอย่างผลงานแนวนี้</div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {pkg.portfolio.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt="" 
                    className="w-28 h-36 rounded-xl object-cover flex-shrink-0 shadow-sm cursor-pointer" 
                    onClick={() => {
                      setGalleryImages(pkg.portfolio);
                      setGalleryIndex(i);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-stone-50">
              <button 
                onClick={() => handleSelectPackage(pkg)}
                className="w-full py-3 rounded-2xl text-white text-sm font-medium"
                style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" }}
              >
                เลือกแพ็กเกจนี้
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      {galleryImages && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={() => setGalleryImages(null)} className="text-white bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden relative px-2">
            <img src={galleryImages[galleryIndex]} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            
            {galleryIndex > 0 && (
              <button 
                onClick={() => setGalleryIndex(galleryIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {galleryIndex < galleryImages.length - 1 && (
              <button 
                onClick={() => setGalleryIndex(galleryIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>
          <div className="p-6 text-center text-white/70 text-sm font-medium tracking-widest">
            {galleryIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
