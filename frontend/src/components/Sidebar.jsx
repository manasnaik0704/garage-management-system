import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCar,
  FaFileInvoice,
  FaTools,
  FaMoneyBill,
  FaHistory,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        🚗 Garage Pro
      </h1>

      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaChartBar />
          Dashboard
        </Link>

        <Link
          to="/customers"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaUsers />
          Customers
        </Link>

        <Link
          to="/vehicles"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaCar />
          Vehicles
        </Link>

        <Link
          to="/quotations"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaFileInvoice />
          Quotations
        </Link>

        <Link
          to="/jobcards"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaTools />
          Job Cards
        </Link>
        
        <Link
          to="/history"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FaHistory />
          History
        </Link>
        <Link
  to="/invoices"
  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
  <FaFileInvoice />
  Invoices
</Link>
      </nav>
    </div>
  );
}

export default Sidebar;