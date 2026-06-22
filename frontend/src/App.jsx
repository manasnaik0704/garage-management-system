import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Quotations from "./pages/Quotations";
import JobCards from "./pages/JobCards";
import Bills from "./pages/Bills";
import History from "./pages/History";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/quotations" element={<Quotations />} />
        <Route path="/jobcards" element={<JobCards />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/history" element={<History />} />
        <Route
  path="/invoices"
  element={<Invoice />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;