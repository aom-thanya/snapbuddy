import Header from "../components/Header";
import TrendingCard from "../components/TrendingCard";
import TopDestinations from "../components/TopDestinations";

export default function HomeScreen({
  nav,
  setScreen,
  setLiked,
  liked,
  topDestinations,
  vibes,
}) {
  return (
    <div
      style={{ height: "100%", overflowY: "auto" }}
      className="text-stone-800"
    >
      <Header
        right={
          <button
            onClick={() => setScreen("bookings")}
            className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        }
      />

      <div className="px-4 pt-5 sm:pt-7 lg:pt-10 pb-24 max-w-[960px] mx-auto w-full">
        <div className="mb-7 lg:mb-10 text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight sm:max-w-[700px] xl:max-w-[900px]">
            ได้รูปที่ใช่
            <br />
            ใน vibe ที่คุณอยากเป็น ✨
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-stone-500 mt-2 max-w-xs sm:max-w-xl lg:max-w-2xl">
            SnapBuddy ช่วยให้คุณได้รูปที่ตรงกับสไตล์ของคุณ
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8 lg:mb-10">
          <button
            onClick={() => nav("intent", "home")}
            className="w-full bg-white rounded-full pl-5 pr-2 py-2.5 lg:py-3 shadow-sm border border-stone-200 flex items-center justify-between text-left"
          >
            <span className="text-sm sm:text-base lg:text-lg text-stone-400 truncate">
              ✨✨ บอก vibe ของคุณ (เช่น เกาหลีนุ่มๆ, คาเฟ่แสงทอง....)
            </span>

            <span className="shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-rose-400 text-white flex items-center justify-center shadow-sm">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </span>
          </button>
        </div>

        <section className="mt-7 lg:mt-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
            สถานที่แนะนำ
          </h2>
          <TopDestinations nav={nav} topDestinations={topDestinations} />
        </section>

        <section className="mt-8 lg:mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
            🔥 กำลังนิยม
          </h2>
          <div className="grid gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {vibes.map((v) => TrendingCard({ ...v, nav, setLiked, liked }))}
          </div>
        </section>
      </div>
    </div>
  );
}