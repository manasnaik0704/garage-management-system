import { useState } from "react";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {

  const [showMenu, setShowMenu] =
    useState(false);

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between">

        <h1 className="text-xl font-bold">
          🚗 Garage Pro
        </h1>

        <button
          onClick={() =>
            setShowMenu(!showMenu)
          }
          className="text-3xl"
        >
          ☰
        </button>

      </div>

      <div className="flex">

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {showMenu && (
          <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-slate-900 z-50">

            <button
              className="text-white text-3xl p-4"
              onClick={() =>
                setShowMenu(false)
              }
            >
              ✕
            </button>

            <Sidebar />

          </div>
        )}

        {/* Main Content */}
        <div className="w-full p-4 md:p-6 overflow-x-hidden">

          {children}

        </div>

      </div>

    </div>
  );
}

export default MainLayout;