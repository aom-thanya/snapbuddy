import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";

export default function ProfileScreen({ setScreen, screen }) {
  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      <Sidebar screen={screen} setScreen={setScreen} />
      
      <div className="flex-1 h-full overflow-y-auto bg-white relative">
        <div className="lg:hidden">
          <Header title="โปรไฟล์" onBack={() => setScreen("home")} />
        </div>
        
        <div className="p-6 max-w-2xl mx-auto mt-4 lg:mt-12">
          <h1 className="text-3xl font-bold text-stone-800 mb-8 hidden lg:block">โปรไฟล์ส่วนตัว</h1>
          
          <div className="bg-white lg:bg-stone-50 p-6 rounded-3xl shadow-sm lg:shadow-none border border-stone-100 mb-6 flex flex-col items-center">
            <img 
              src="/avatar.jpg" 
              alt="Avatar" 
              className="w-24 h-24 rounded-2xl object-cover mb-4"
            />
            <h2 className="text-xl font-bold tracking-[0.15em] text-stone-800"># T H A N Y A #</h2>
            <p className="text-stone-500 mt-1">thanya@example.com</p>
            <button className="mt-4 px-6 py-2 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors">แก้ไขโปรไฟล์</button>
          </div>
          
          <div className="bg-white lg:bg-stone-50 p-6 rounded-3xl shadow-sm lg:shadow-none border border-stone-100">
            <h3 className="text-lg font-bold text-stone-800 mb-4">การตั้งค่า</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <span className="text-stone-600 font-medium">การแจ้งเตือน</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <span className="text-stone-600 font-medium">ภาษา</span>
                  <span className="text-stone-400">ไทย (TH)</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
