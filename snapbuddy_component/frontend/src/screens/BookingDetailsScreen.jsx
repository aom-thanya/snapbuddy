import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import BookingDetailsFooter from "../components/BookingDetailsFooter";

export default function BookingDetailsScreen({ setScreen, selectedBooking, openReview, addToGCal, setShowMyReview }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header title="Booking details" onBack={() => setScreen("bookings")} />
      <div style={{ flex: 1, overflowY: "auto" }} className="p-4 space-y-4">
        <img src={selectedBooking.gallery[0]} alt="" className="w-full h-56 object-cover rounded-3xl" />
        <div className="bg-white rounded-3xl p-4 shadow-sm space-y-2"><div className="flex items-center justify-between gap-3"><div className="font-bold text-lg">{selectedBooking.title}</div><StatusBadge tone={selectedBooking.statusTone}>{selectedBooking.status}</StatusBadge></div><div className="text-sm text-stone-500">{selectedBooking.location}</div><div className="text-sm text-stone-500">{selectedBooking.date}</div><div className="text-sm text-stone-500">ช่างภาพ: {selectedBooking.photographer}</div><div className="font-semibold pt-1">ยอดรวม {selectedBooking.total}</div></div>
        <div className="bg-white rounded-3xl p-4 shadow-sm"><div className="font-semibold mb-3">Gallery</div><div className="grid grid-cols-2 gap-2">{selectedBooking.gallery.map((img, i) => <img key={i} src={img} alt="" className="w-full h-28 object-cover rounded-2xl" />)}</div></div>
      </div>
      <BookingDetailsFooter booking={selectedBooking} openReview={openReview} addToGCal={addToGCal} onShowMyReview={() => setShowMyReview(true)} />
    </div>
  );
}
