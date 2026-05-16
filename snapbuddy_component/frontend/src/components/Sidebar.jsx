export default function Sidebar({ screen, setScreen, setShowLogout }) {
  return (
    <div className="hidden lg:flex flex-col w-64 border-r border-stone-200 bg-white h-full px-4 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => setScreen("home")}>
        <img src="/logo.png" alt="SnapBuddy Logo" className="w-9 h-9 object-contain" />
        <div className="text-lg font-semibold tracking-tight text-stone-800">
          SnapBuddy
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <button 
          onClick={() => setScreen("profile")}
          className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-4 transition-colors ${screen === "profile" ? "bg-stone-100 text-stone-900 font-semibold" : "hover:bg-stone-50 text-stone-600 font-medium"}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="text-[15px]">โปรไฟล์</span>
        </button>

        <button 
          onClick={() => setScreen("bookings")}
          className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-4 transition-colors ${screen === "bookings" ? "bg-stone-100 text-stone-900 font-semibold" : "hover:bg-stone-50 text-stone-600 font-medium"}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
          <span className="text-[15px]">การจองของฉัน</span>
        </button>
      </nav>

      <div className="mt-auto">
        {/* Avatar */}
        <div className="flex items-center gap-3 px-2 mb-3">
          <img 
            src="/avatar.jpg" 
            alt="Avatar" 
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-stone-700 tracking-[0.15em]"># T H A N Y A #</span>
          </div>
        </div>

        <div className="h-px bg-stone-100 my-3 mx-2"></div>

        <button 
          onClick={() => setShowLogout(true)}
          className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-4 hover:bg-red-50 text-red-600 font-medium transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span className="text-[15px]">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
}
