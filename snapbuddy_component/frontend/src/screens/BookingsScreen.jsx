import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";

export default function BookingsScreen({ setScreen, bookings, setSelectedBooking }) {
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <Header title="Bookings" onBack={() => setScreen("home")} />
      <div className="p-4 space-y-3">
        {bookings.map((booking) => <button key={booking.id} onClick={() => { setSelectedBooking(booking); setScreen("bookingDetails"); }} className="w-full text-left rounded-3xl p-4 bg-white shadow-sm"><div className="flex items-start gap-3"><img src={booking.gallery[0]} alt="" className="w-20 h-20 rounded-2xl object-cover" /><div className="flex-1 min-w-0"><div className="font-semibold">{booking.title}</div><div className="text-sm text-stone-500 mt-1">{booking.location}</div><div className="text-sm text-stone-500">{booking.date}</div><div className="mt-2"><StatusBadge tone={booking.statusTone}>{booking.status}</StatusBadge></div></div></div></button>)}
      </div>
    </div>
  );
}
