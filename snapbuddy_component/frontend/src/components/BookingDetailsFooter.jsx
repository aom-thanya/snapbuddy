export default function BookingDetailsFooter({ booking, openReview, addToGCal, onShowMyReview }) {
  const btnPrimary = "w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2";
  if (booking.status === "กำลังจะถึง") return <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}><button onClick={() => addToGCal(booking)} className={btnPrimary} style={{ background: "white", border: "1.5px solid #4285F4", color: "#4285F4" }}>เพิ่มใน Google Calendar</button></div>;
  if (booking.status === "ได้รับภาพแล้ว") return <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}><button onClick={openReview} className={btnPrimary} style={{ background: "linear-gradient(90deg,#7a8c72,#a8b5a0)", color: "white" }}>รีวิว Booking นี้</button></div>;
  if (booking.status === "เสร็จสิ้น") return <div className="p-4 border-t border-stone-200" style={{ background: "#faf6f1" }}><button onClick={onShowMyReview} className={btnPrimary} style={{ background: "white", border: "1.5px solid #a8b5a0", color: "#7a8c72" }}>ดูรีวิวของคุณ</button></div>;
  return null;
}
