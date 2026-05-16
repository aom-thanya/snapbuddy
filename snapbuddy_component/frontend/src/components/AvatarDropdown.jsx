import { useState } from "react";

export default function AvatarDropdown({ setScreen, setShowLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity bg-transparent px-2 py-1.5 rounded-2xl cursor-pointer"
      >
        <img 
          src="/avatar.jpg" 
          alt="Avatar" 
          className="w-10 h-10 rounded-xl object-cover"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-stone-700 tracking-[0.15em] hidden sm:block"># T H A N Y A #</span>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-600 mr-1">
          <polyline points="8 9 12 5 16 9"></polyline>
          <polyline points="8 15 12 19 16 15"></polyline>
        </svg>
      </button>

      {showDropdown && (
        <>
          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowDropdown(false)}></div>
          <div className="absolute right-0 mt-2 w-[220px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-100 overflow-hidden py-2 z-50">
            <button onClick={() => { setShowDropdown(false); setScreen("profile"); }} className="w-full text-left px-5 py-3 hover:bg-stone-50 flex items-center gap-4 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-700"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span className="text-stone-800 text-[15px] font-medium">โปรไฟล์</span>
            </button>
            <button onClick={() => { setShowDropdown(false); setScreen("bookings"); }} className="w-full text-left px-5 py-3 hover:bg-stone-50 flex items-center gap-4 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-700"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
              <span className="text-stone-800 text-[15px] font-medium">การจองของฉัน</span>
            </button>
            <div className="h-px bg-stone-100 my-1 w-full"></div>
            <button onClick={() => { setShowDropdown(false); setShowLogout(true); }} className="w-full text-left px-5 py-3 hover:bg-stone-50 flex items-center gap-4 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-700"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span className="text-stone-800 text-[15px] font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
