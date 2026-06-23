import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

import {
  FaChartBar,
  FaUsers,
  FaFileInvoice,
  FaPlus,
  FaUserPlus,
  FaFileAlt,
} from "react-icons/fa";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showFabMenu, setShowFabMenu] =
    useState(false);

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">

        <Sidebar />

        <div className="flex-1 p-6">
          {children}
        </div>

      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">

        {/* Header */}
        <div className="bg-white px-5 py-4 shadow-sm sticky top-0 z-40">

          <h1 className="text-2xl font-bold text-slate-800">
            🚗 Garage Pro
          </h1>

          <p className="text-gray-500 text-sm">
            Complete Car Care
          </p>

        </div>

        {/* Main Content */}
        <div className="p-4 pb-32">
          {children}
        </div>

        {/* Floating Menu */}
        {showFabMenu && (
          <div className="fixed bottom-40 right-5 z-50 space-y-3">

            <button
              onClick={() => navigate("/customers")}
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-5 py-3"
            >
              <FaUserPlus className="text-blue-600" />
              Add Customer
            </button>

            <button
              onClick={() => navigate("/quotations")}
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-5 py-3"
            >
              <FaFileAlt className="text-green-600" />
              Create Quote
            </button>

            <button
              onClick={() => navigate("/invoices")}
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-5 py-3"
            >
              <FaFileInvoice className="text-red-600" />
              Create Invoice
            </button>

          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() =>
            setShowFabMenu(!showFabMenu)
          }
          className="
          fixed
          bottom-24
          right-5
          w-16
          h-16
          rounded-full
          bg-blue-600
          text-white
          shadow-2xl
          flex
          items-center
          justify-center
          z-50
          "
        >
          <FaPlus size={24} />
        </button>

        {/* Bottom Navigation */}
        <div
          className="
          fixed
          bottom-3
          left-3
          right-3
          bg-white
          rounded-full
          shadow-2xl
          flex
          justify-around
          py-4
          z-40
          "
        >
          <Link
            to="/"
            className={`flex flex-col items-center text-xs ${
              location.pathname === "/"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <FaChartBar className="text-xl" />
            Home
          </Link>

          <Link
            to="/customers"
            className={`flex flex-col items-center text-xs ${
              location.pathname ===
              "/customers"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <FaUsers className="text-xl" />
            Customers
          </Link>

          <Link
            to="/quotations"
            className={`flex flex-col items-center text-xs ${
              location.pathname ===
              "/quotations"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <FaFileInvoice className="text-xl" />
            Quote
          </Link>

          <Link
            to="/invoices"
            className={`flex flex-col items-center text-xs ${
              location.pathname ===
              "/invoices"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            <FaFileInvoice className="text-xl" />
            Invoice
          </Link>
        </div>

      </div>
    </div>
  );
}

export default MainLayout;