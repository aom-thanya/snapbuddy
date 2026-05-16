export default function LogoutModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-3xl shadow-xl z-50 overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">ออกจากระบบ</h3>
          <p className="text-stone-500 text-sm">คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ SnapBuddy?</p>
        </div>
        <div className="flex border-t border-stone-100">
          <button 
            onClick={onClose} 
            className="flex-1 py-4 text-stone-600 font-medium hover:bg-stone-50 transition-colors"
          >
            ยกเลิก
          </button>
          <div className="w-px bg-stone-100"></div>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-4 text-red-500 font-bold hover:bg-red-50 transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </>
  );
}
