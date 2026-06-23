import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaFileInvoice
} from "react-icons/fa";

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
        <div className="w-full p-4 pb-24 md:p-6 overflow-x-hidden">

          {children}
          {/* Bottom Navigation */}

<div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around py-3 z-50">

  <Link
    to="/"
    className="flex flex-col items-center text-sm"
  >
    <FaChartBar className="text-xl" />
    Dashboard
  </Link>

  <Link
    to="/customers"
    className="flex flex-col items-center text-sm"
  >
    <FaUsers className="text-xl" />
    Customers
  </Link>

  <Link
    to="/quotations"
    className="flex flex-col items-center text-sm"
  >
    <FaFileInvoice className="text-xl" />
    Quote
  </Link>

  <Link
    to="/invoices"
    className="flex flex-col items-center text-sm"
  >
    <FaFileInvoice className="text-xl" />
    Invoice
  </Link>

</div>

        </div>

      </div>

    </div>
  );
}

export default MainLayout;