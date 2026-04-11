import { useEffect, useMemo, useRef, useState } from "react";
import { topDestinations, vibes, buddies, initialBookings, issueOptions } from "./data/mockData";
import { suggestTagsFromVibe } from "./utils/vibeTags";
import HomeScreen from "./screens/HomeScreen";
import IntentScreen from "./screens/IntentScreen";
import RefineScreen from "./screens/RefineScreen";
import GeneratingScreen from "./screens/GeneratingScreen";
import PlanScreen from "./screens/PlanScreen";
import MatchingScreen from "./screens/MatchingScreen";
import BookingScreen from "./screens/BookingScreen";
import BookingsScreen from "./screens/BookingsScreen";
import BookingDetailsScreen from "./screens/BookingDetailsScreen";
import ReviewModal from "./components/ReviewModal";
import MyReviewModal from "./components/MyReviewModal";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [prevScreen, setPrevScreen] = useState(null);
  const [liked, setLiked] = useState({});
  const [vibeText, setVibeText] = useState("เช้าๆ ในคาเฟ่สไตล์เกาหลีนุ่มๆ โทนมัทฉะ แสงธรรมชาติ ผ้าห่มอบอุ่น…");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [refImages, setRefImages] = useState([]);
  const fileInputRef = useRef(null);
  const [occasion, setOccasion] = useState("☕ ทั่วไป");
  const [budget, setBudget] = useState(120);
  const [groupSize, setGroupSize] = useState(2);
  const [addons, setAddons] = useState(["💄 แต่งหน้า"]);
  const [tab, setTab] = useState("แมทช์ดีสุด");
  const [progress, setProgress] = useState(0);
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState(initialBookings[0]);
  const [reviewStep, setReviewStep] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewVibe, setReviewVibe] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewIssues, setReviewIssues] = useState([]);
  const [showMyReview, setShowMyReview] = useState(false);

  const checklist = useMemo(() => [["เตรียมชุดพร้อมแล้ว", false], ["ยืนยันเวลาแล้ว", true], ["ปักหมุดสถานที่แล้ว", true], ["บันทึกรูป reference แล้ว", false]], []);

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";
    document.head.appendChild(link1);
    const link2 = document.createElement("link");
    link2.rel = "preconnect";
    link2.href = "https://fonts.gstatic.com";
    link2.crossOrigin = "anonymous";
    document.head.appendChild(link2);
    const link3 = document.createElement("link");
    link3.rel = "stylesheet";
    link3.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap";
    document.head.appendChild(link3);
    const style = document.createElement("style");
    style.textContent = `* { font-family: 'IBM Plex Sans Thai', sans-serif !important; }`;
    document.head.appendChild(style);
    return () => [link1, link2, link3, style].forEach((el) => document.head.contains(el) && document.head.removeChild(el));
  }, []);

  const nav = (next, prev) => { setPrevScreen(prev || screen); setScreen(next); };
  const toggleAddon = (name) => setAddons((prev) => prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]);
  const generateTags = () => {
    if (!vibeText.trim() && !refImages.length) return;
    const next = refImages.length && !vibeText.trim() ? ["#soft", "#editorial", "#portrait", "#warmtones"] : suggestTagsFromVibe(vibeText);
    setSelectedTags((prev) => (prev.length ? prev : next));
  };
  const addTag = (raw) => {
    const c = raw.trim();
    if (!c) return;
    const f = c.startsWith("#") ? c : "#" + c.split(" ").join("");
    setSelectedTags((prev) => (prev.includes(f) ? prev : [...prev, f]));
    setTagInput("");
  };
  const removeTag = (tag) => setSelectedTags((prev) => prev.filter((i) => i !== tag));
  const goGenerating = () => {
    setScreen("generating");
    setProgress(0);
    let v = 0;
    const t = setInterval(() => {
      v += 20;
      setProgress(v);
      if (v >= 100) { clearInterval(t); setTimeout(() => setScreen("plan"), 250); }
    }, 220);
  };
  const openReview = () => { setReviewRating(0); setReviewVibe(0); setReviewComment(""); setReviewIssues([]); setReviewStep(1); };
  const toggleIssue = (issue) => setReviewIssues((prev) => prev.includes(issue) ? prev.filter((x) => x !== issue) : [...prev, issue]);
  const submitReview = () => {
    const review = { rating: reviewRating, vibeMatch: reviewVibe, comment: reviewComment, issues: reviewIssues };
    const updated = bookings.map((b) => b.id === selectedBooking.id ? { ...b, status: "เสร็จสิ้น", statusTone: "stone", review } : b);
    setBookings(updated);
    setSelectedBooking({ ...selectedBooking, status: "เสร็จสิ้น", statusTone: "stone", review });
    setReviewStep(4);
  };
  const addToGCal = (booking) => {
    const title = encodeURIComponent(`${booking.title} · SnapBuddy`);
    const loc = encodeURIComponent(booking.location);
    const details = encodeURIComponent(`ช่างภาพ: ${booking.photographer}\nจองผ่าน SnapBuddy`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260413T083000/20260413T100000&details=${details}&location=${loc}`, "_blank");
  };

  const sharedProps = { screen, setScreen, prevScreen, nav, liked, setLiked, vibeText, setVibeText, selectedTags, setSelectedTags, tagInput, setTagInput, refImages, setRefImages, fileInputRef, occasion, setOccasion, budget, setBudget, groupSize, setGroupSize, addons, toggleAddon, tab, setTab, progress, bookings, setBookings, selectedBooking, setSelectedBooking, checklist, generateTags, addTag, removeTag, goGenerating, openReview, addToGCal, setShowMyReview };

  const screenMap = {
    home: <HomeScreen {...sharedProps} topDestinations={topDestinations} vibes={vibes} />,
    intent: <IntentScreen {...sharedProps} />,
    refine: <RefineScreen {...sharedProps} />,
    generating: <GeneratingScreen progress={progress} />,
    plan: <PlanScreen {...sharedProps} />,
    matching: <MatchingScreen {...sharedProps} buddies={buddies} />,
    booking: <BookingScreen {...sharedProps} />,
    bookings: <BookingsScreen {...sharedProps} />,
    bookingDetails: <BookingDetailsScreen {...sharedProps} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100vh", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.05)", background: "#fff", position: "relative", display: "flex", flexDirection: "column" }}>
        {screenMap[screen]}
        <ReviewModal reviewStep={reviewStep} setReviewStep={setReviewStep} reviewRating={reviewRating} setReviewRating={setReviewRating} reviewVibe={reviewVibe} setReviewVibe={setReviewVibe} reviewComment={reviewComment} setReviewComment={setReviewComment} reviewIssues={reviewIssues} toggleIssue={toggleIssue} issueOptions={issueOptions} selectedBooking={selectedBooking} submitReview={submitReview} />
        <MyReviewModal open={showMyReview} onClose={() => setShowMyReview(false)} selectedBooking={selectedBooking} />
      </div>
    </div>
  );
}
