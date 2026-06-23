import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";

import {
  FaChartBar,
  FaUsers,
  FaFileInvoice,
  FaPlus,
  FaUserPlus,
  FaFileAlt
} from "react-icons/fa";

function MainLayout({ children }) {

  const [showMenu, setShowMenu] =
    useState(false);

  const [showFabMenu, setShowFabMenu] =
    useState(false);

  const navigate = useNavigate();

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

        <div className="w-full p-4 pb-28 md:p-6 overflow-x-hidden">

          {children}

        </div>

      </div>

      {/* Floating Menu */}

      {showFabMenu && (

        <div className="md:hidden fixed bottom-40 right-5 z-50 space-y-3">

          <button
            onClick={() =>
              navigate("/customers")
            }
            className="flex items-center gap-3 bg-white shadow-xl rounded-full px-5 py-3"
          >

            <FaUserPlus className="text-blue-600" />

            Add Customer

          </button>

          <button
            onClick={() =>
              navigate("/quotations")
            }
            className="flex items-center gap-3 bg-white shadow-xl rounded-full px-5 py-3"
          >

            <FaFileAlt className="text-green-600" />

            Create Quote

          </button>

          <button
            onClick={() =>
              navigate("/invoices")
            }
            className="flex items-center gap-3 bg-white shadow-xl rounded-full px-5 py-3"
          >

            <FaFileInvoice className="text-red-600" />

            Create Invoice

          </button>

        </div>

      )}

      {/* Floating + Button */}

      <button
        onClick={() =>
          setShowFabMenu(
            !showFabMenu
          )
        }
        className="
        md:hidden
        fixed
        bottom-20
        right-5
        w-16
        h-16
        rounded-full
        bg-blue-600
        text-white
        shadow-2xl
        z-50
        flex
        items-center
        justify-center
        "
      >

        <FaPlus size={24} />

      </button>

      {/* Bottom Navigation */}

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around py-3 z-40">

        <Link
          to="/"
          className="flex flex-col items-center text-sm"
        >
          <FaChartBar className="text-xl" />
          Home
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
  );
}

export default MainLayout;