import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { getCustomers } from "../services/customerService";
import { getVehicles } from "../services/vehicleService";
import {
  createInvoice,
  getInvoices,
  updateInvoicePayment,
  deleteInvoice
} from "../services/invoiceService";

function Invoice() {

  const [customers, setCustomers] =
    useState([]);

  const [vehicles, setVehicles] =
    useState([]);

  const [invoices, setInvoices] =
    useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [vehicleId, setVehicleId] =
    useState("");

  const [notes, setNotes] =
    useState("");

    const [search, setSearch] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("All");

  const [items, setItems] =
    useState([
      {
        item_name: "",
        item_type: "Part",
        qty: 1,
        rate: 0
      }
    ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const customerRes =
        await getCustomers();

      const vehicleRes =
        await getVehicles();

      const invoiceRes =
        await getInvoices();

      setCustomers(
        customerRes.data
      );

      setVehicles(
        vehicleRes.data
      );

      setInvoices(
        invoiceRes.data
      );

    }
    catch (err) {

      console.error(err);

    }

  };

  const addRow = () => {

    setItems([
      ...items,
      {
        item_name: "",
        item_type: "Part",
        qty: 1,
        rate: 0
      }
    ]);

  };

  const removeRow = (index) => {

    if (items.length === 1)
      return;

    setItems(
      items.filter(
        (_, i) =>
          i !== index
      )
    );

  };

  const updateItem = (
    index,
    field,
    value
  ) => {

    const updated =
      [...items];

    updated[index] = {
      ...updated[index],
      [field]: value
    };

    setItems(updated);

  };

  const grandTotal =
    items.reduce(
      (sum, item) =>
        sum +
        Number(item.qty || 0) *
        Number(item.rate || 0),
      0
    );
      const handleSaveInvoice = async () => {

    try {

      if (!customerId) {
        alert("Select Customer");
        return;
      }

      if (!vehicleId) {
        alert("Select Vehicle");
        return;
      }

      const payload = {
        customer_id: customerId,
        vehicle_id: vehicleId,
        job_card_id: null,
        notes,
        items
      };

      const res =
        await createInvoice(payload);

      alert(
        `Invoice Created\n${res.data.invoice_no}`
      );

      setCustomerId("");
      setVehicleId("");
      setNotes("");

      setItems([
        {
          item_name: "",
          item_type: "Part",
          qty: 1,
          rate: 0
        }
      ]);

      loadData();

    }
    catch (err) {

      console.error(err);

      alert(
        "Failed To Create Invoice"
      );

    }

  };
  const handleMarkPaid = async (
  invoice
) => {

  const amount =
    prompt(
      "Enter Paid Amount",
      invoice.paid_amount
    );

  if (!amount)
    return;

  try {

    await updateInvoicePayment(
      invoice.id,
      amount
    );

    loadData();

  }
  catch (err) {

    console.error(err);

    alert(
      "Failed To Update Payment"
    );

  }

};
const handleDeleteInvoice = async (
  id
) => {

  const confirmDelete =
    window.confirm(
      "Are you sure?"
    );

  if (!confirmDelete)
    return;

  try {

    await deleteInvoice(
      id
    );

    loadData();

  }
  catch (err) {

    console.error(err);

    alert(
      "Failed To Delete Invoice"
    );

  }

};

  return (

    <MainLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Invoices
          </h1>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

  <div className="bg-blue-600 text-white p-5 rounded-xl">
    <h3>Total Invoices</h3>
    <h1 className="text-3xl font-bold">
      {invoices.length}
    </h1>
  </div>

  <div className="bg-green-600 text-white p-5 rounded-xl">
    <h3>Total Revenue</h3>
    <h1 className="text-3xl font-bold">
      ₹ {
        invoices.reduce(
          (sum, i) =>
            sum +
            Number(i.total_amount),
          0
        )
      }
    </h1>
  </div>

  <div className="bg-purple-600 text-white p-5 rounded-xl">
    <h3>Collected</h3>
    <h1 className="text-3xl font-bold">
      ₹ {
        invoices.reduce(
          (sum, i) =>
            sum +
            Number(i.paid_amount),
          0
        )
      }
    </h1>
  </div>

  <div className="bg-red-600 text-white p-5 rounded-xl">
    <h3>Pending</h3>
    <h1 className="text-3xl font-bold">
      ₹ {
        invoices.reduce(
          (sum, i) =>
            sum +
            Number(i.balance_amount),
          0
        )
      }
    </h1>
  </div>

</div>
          <p className="text-gray-500">
            Create Invoice
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              className="border rounded-2xl p-4"
              value={customerId}
              onChange={(e) =>
                setCustomerId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Customer
              </option>

              {customers.map(
                (customer) => (

                  <option
                    key={customer.id}
                    value={customer.id}
                  >

                    {customer.name}

                  </option>

                )
              )}

            </select>

            <select
              className="border rounded-2xl p-4"
              value={vehicleId}
              onChange={(e) =>
                setVehicleId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Vehicle
              </option>

              {vehicles
                .filter(
                  (v) =>
                    String(
                      v.customer_id
                    ) ===
                    String(
                      customerId
                    )
                )
                .map(
                  (vehicle) => (

                    <option
                      key={vehicle.id}
                      value={vehicle.id}
                    >

                      {vehicle.vehicle_number}
                      {" - "}
                      {vehicle.vehicle_model}

                    </option>

                  )
                )}

            </select>

          </div>

          <textarea
className="border rounded-2xl p-4 w-full mt-4"
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
  Invoice Items
</h2>

          {items.map((item, index) => (

  <div
    key={index}
    className="bg-slate-50 rounded-2xl p-5 shadow mb-4 space-y-3"
  >

    <input
      className="border rounded-2xl p-4 w-full"
      placeholder="Item Name"
      value={item.item_name}
      onChange={(e) =>
        updateItem(
          index,
          "item_name",
          e.target.value
        )
      }
    />
<button
  type="button"
  onClick={addRow}
  className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg"
>
  + Add Item
</button>
    <select
      className="border rounded-2xl p-4 w-full"
      value={item.item_type}
      onChange={(e) =>
        updateItem(
          index,
          "item_type",
          e.target.value
        )
      }
    >
      <option>Part</option>
      <option>Labour</option>
    </select>

    <input
      type="number"
      className="border rounded-2xl p-4 w-full"
      placeholder="Qty"
      value={item.qty}
      onChange={(e) =>
        updateItem(
          index,
          "qty",
          e.target.value
        )
      }
    />

    <input
      type="number"
      className="border rounded-2xl p-4 w-full"
      placeholder="Rate"
      value={item.rate}
      onChange={(e) =>
        updateItem(
          index,
          "rate",
          e.target.value
        )
      }
    />

    <div className="bg-green-100 rounded-2xl p-4 text-xl font-bold text-green-700">

      ₹ {Number(item.qty || 0) * Number(item.rate || 0)}

    </div>

    <button
      type="button"
      className="w-full bg-red-600 text-white py-3 rounded-2xl"
      onClick={() =>
        removeRow(index)
      }
    >
      Remove Item
    </button>

  </div>

))}

          <div className="bg-green-50 rounded-2xl p-5 mt-6">

<p className="text-gray-500">

Grand Total

</p>

<h1 className="text-4xl font-bold text-green-700">

₹ {grandTotal}

</h1>

</div>

          <button
           className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg mt-5"
            onClick={
              handleSaveInvoice
            }
          >

            Save Invoice

          </button>
          <div className="bg-white rounded-xl shadow p-6">

  <h2 className="text-xl font-bold mb-5">
    Invoice History
  </h2>
<div className="flex gap-4 mb-5">

  <input
    type="text"
    placeholder="Search Invoice / Customer / Vehicle"
    className="border rounded-lg p-3 w-full"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

  <select
    className="border rounded-2xl p-4"
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
  >

    <option>All</option>
    <option>Paid</option>
    <option>Partial</option>
    <option>Unpaid</option>

  </select>

</div>
<div className="space-y-4">
  {
invoices
.filter((invoice)=>{

const matchesSearch =

invoice.invoice_no
.toLowerCase()
.includes(
search.toLowerCase()
)

||

invoice.customer_name
.toLowerCase()
.includes(
search.toLowerCase()
)

||

invoice.vehicle_number
.toLowerCase()
.includes(
search.toLowerCase()
);

const matchesStatus =

statusFilter==="All"

||

invoice.status===statusFilter;

return (
matchesSearch &&
matchesStatus
);

})

.map((invoice)=>(

<div
key={invoice.id}
className="bg-slate-50 rounded-2xl shadow p-5"
>
  <div className="space-y-2">

<h2 className="text-xl font-bold">
{invoice.invoice_no}
</h2>

<p>
👤 {invoice.customer_name}
</p>

<p>
🚗 {invoice.vehicle_number}
</p>

<p>
💰 Total : ₹{invoice.total_amount}
</p>

<p>
✅ Paid : ₹{invoice.paid_amount}
</p>

<p>
⚠ Balance : ₹{invoice.balance_amount}
</p>

<span
className={
invoice.status==="Paid"
?
"bg-green-100 text-green-700 px-3 py-2 rounded-full"

:

invoice.status==="Partial"

?

"bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full"

:

"bg-red-100 text-red-700 px-3 py-2 rounded-full"
}
>

{invoice.status}

</span>

</div>
<div className="space-y-3 mt-5">

<button
className="w-full bg-green-600 text-white py-3 rounded-2xl"
onClick={()=>
handleMarkPaid(invoice)
}
>
Mark Paid
</button>

<button
className="w-full bg-blue-600 text-white py-3 rounded-2xl"
onClick={()=>
window.open(
`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/pdf`,
"_blank"
)
}
>
Download PDF
</button>

<button
className="w-full bg-red-600 text-white py-3 rounded-2xl"
onClick={()=>
handleDeleteInvoice(
invoice.id
)
}
>
Delete Invoice
</button>

</div>

</div>

))
}

</div>

</div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Invoice;