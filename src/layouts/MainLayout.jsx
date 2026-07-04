import { Outlet } from "react-router-dom";
import ChatBot from "../components/chat/ChatBot"
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
       
        </main>
         <ChatBot />
      </div>
    </div>
  );
};

export default MainLayout;