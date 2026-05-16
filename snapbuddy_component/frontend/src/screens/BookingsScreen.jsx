import { useState } from "react";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";

export default function BookingsScreen({ setScreen, screen, bookings, setSelectedBooking }) {
  const [filter, setFilter] = useState("ทั้งหมด");
  const tabs = ["ทั้งหมด", "กำลังจะถึง", "ได้รับภาพแล้ว", "เสร็จสิ้น"];

  const filteredBookings = bookings.filter((b) => filter === "ทั้งหมด" || b.status === filter);

  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      <Sidebar screen={screen} setScreen={setScreen} />

      <div className="flex-1 h-full overflow-y-auto bg-white relative">
        <div className="lg:hidden">
          <Header title="Bookings" onBack={() => setScreen("home")} />
        </div>

        <div className="p-4 lg:p-6 lg:mt-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-800 mb-6 hidden lg:block">การจองของฉัน</h1>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === t 
                    ? "bg-stone-800 text-white" 
                    : "bg-white lg:bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="space-y-3">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <button 
                  key={booking.id} 
                  onClick={() => { setSelectedBooking(booking); setScreen("bookingDetails"); }} 
                  className="w-full text-left rounded-3xl p-4 bg-white border border-stone-100 shadow-sm lg:shadow-none hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 lg:gap-4">
                    <img src={booking.gallery[0]} alt="" className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-800 lg:text-lg">{booking.title}</div>
                      <div className="text-sm text-stone-500 mt-1">{booking.location}</div>
                      <div className="text-sm text-stone-500">{booking.date}</div>
                      <div className="mt-2 lg:mt-3">
                        <StatusBadge tone={booking.statusTone}>{booking.status}</StatusBadge>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-stone-500 bg-white lg:bg-stone-50 rounded-3xl border border-stone-100 border-dashed">
                ไม่มีการจองในสถานะนี้
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
