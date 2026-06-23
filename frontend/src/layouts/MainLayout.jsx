import Sidebar from "../components/Sidebar";
import {
  Link,
  useLocation
} from "react-router-dom";

import {
  FaChartBar,
  FaUsers,
  FaFileInvoice
} from "react-icons/fa";

function MainLayout({ children }) {

  const location = useLocation();

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Desktop Layout */}
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

        {/* Content */}

        <div className="p-4 pb-28">

          {children}

        </div>

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
              location.pathname === "/customers"
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
              location.pathname === "/quotations"
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
              location.pathname === "/invoices"
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