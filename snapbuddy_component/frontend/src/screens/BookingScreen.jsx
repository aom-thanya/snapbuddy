import Header from "../components/Header";

export default function BookingScreen({ setScreen, setSelectedBooking, bookings }) {
  const booking = bookings[0];
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: "80px" }}>
      <Header title="ยืนยันการจอง" onBack={() => setScreen("matching")} />
      <div className="px-5 py-6 space-y-5"><div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.7)" }}><div className="font-bold text-lg mb-2">{booking.title}</div><div className="text-sm text-stone-500">{booking.location}</div><div className="text-sm text-stone-500 mt-1">{booking.date}</div><div className="text-sm text-stone-500 mt-1">ช่างภาพ: {booking.photographer}</div><div className="font-semibold mt-3">รวม {booking.total}</div></div></div>
      <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}><button onClick={() => { setSelectedBooking(booking); setScreen("bookingDetails"); }} className="w-full py-3.5 rounded-2xl font-semibold text-white" style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)" }}>ยืนยันการจอง</button></div>
    </div>
  );
}
