import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import BookingDetailsFooter from "../components/BookingDetailsFooter";
import Sidebar from "../components/Sidebar";

export default function BookingDetailsScreen({ setScreen, screen, setShowLogout, selectedBooking, openReview, addToGCal, setShowMyReview }) {
  const steps = ["กำลังจะถึง", "ได้รับภาพแล้ว", "เสร็จสิ้น"];
  const currentStepIndex = steps.indexOf(selectedBooking.status) !== -1 ? steps.indexOf(selectedBooking.status) : 0;

  return (
    <div className="flex h-full w-full bg-stone-50 overflow-hidden">
      <Sidebar screen={screen} setScreen={setScreen} setShowLogout={setShowLogout} />
      
      <div className="flex-1 h-full flex flex-col bg-stone-50 lg:bg-white relative overflow-hidden">
        <div className="lg:hidden shrink-0">
          <Header title="รายละเอียดการจอง" onBack={() => setScreen("bookings")} />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 lg:mt-8 max-w-3xl mx-auto w-full">
            <div className="hidden lg:flex items-center gap-4 mb-8">
              <button onClick={() => setScreen("bookings")} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-100 bg-white border border-stone-200 shadow-sm transition-colors cursor-pointer">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              </button>
              <h1 className="text-3xl font-bold text-stone-800">รายละเอียดการจอง</h1>
            </div>

            {/* Status Process */}
            <div className="bg-white rounded-3xl p-5 lg:p-8 shadow-sm lg:shadow-none border border-stone-100 mb-6 relative z-10">
              <div className="flex items-center justify-between relative max-w-lg mx-auto">
                <div className="absolute left-0 top-4 lg:top-5 -translate-y-1/2 w-full h-1 bg-stone-100 rounded-full z-0"></div>
                <div 
                  className="absolute left-0 top-4 lg:top-5 -translate-y-1/2 h-1 bg-green-500 rounded-full z-0 transition-all duration-500"
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                ></div>
                
                {steps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isActive = index === currentStepIndex;
                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-sm lg:text-base transition-colors ${isCompleted ? "bg-green-500 text-white" : "bg-white border-2 border-stone-200 text-stone-400"}`}>
                        {isCompleted ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className={`text-[11px] lg:text-sm font-semibold ${isActive ? "text-stone-800" : isCompleted ? "text-green-600" : "text-stone-400"}`}>{step}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <img src={selectedBooking.gallery[0]} alt="" className="w-full h-56 lg:h-72 object-cover rounded-3xl mb-4 shadow-sm" />
            
            <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-sm lg:shadow-none border border-stone-100 mb-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="font-bold text-xl lg:text-2xl text-stone-800">{selectedBooking.title}</div>
                <StatusBadge tone={selectedBooking.statusTone}>{selectedBooking.status}</StatusBadge>
              </div>
              <div className="text-stone-500 lg:text-lg">{selectedBooking.location}</div>
              <div className="text-stone-500 lg:text-lg">{selectedBooking.date}</div>
              <div className="text-stone-500 lg:text-lg">ช่างภาพ: <span className="font-medium text-stone-800">{selectedBooking.photographer}</span></div>
              <div className="font-bold text-lg pt-2 lg:text-xl border-t border-stone-100 mt-3">ยอดรวม {selectedBooking.total}</div>
            </div>
            
            <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-sm lg:shadow-none border border-stone-100 lg:mb-0">
              <div className="font-bold text-lg mb-4 text-stone-800">Gallery</div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedBooking.gallery.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-32 lg:h-40 object-cover rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer actions pinned at bottom for both mobile and desktop */}
        <div className="shrink-0 w-full bg-white lg:bg-transparent lg:pb-8">
          <div className="lg:max-w-3xl lg:mx-auto lg:rounded-3xl lg:overflow-hidden lg:border lg:border-stone-200 lg:shadow-sm">
            <BookingDetailsFooter booking={selectedBooking} openReview={openReview} addToGCal={addToGCal} onShowMyReview={() => setShowMyReview(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}
