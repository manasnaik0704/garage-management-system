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
<div className="grid md:grid-cols-4 gap-4 mt-5">

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

          <div className="grid md:grid-cols-2 gap-4">

            <select
              className="border rounded-lg p-3"
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
              className="border rounded-lg p-3"
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
            className="border rounded-lg p-3 w-full mt-4"
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

          <div className="flex justify-between mb-5">

            <h2 className="text-xl font-bold">
              Invoice Items
            </h2>

            <button
              onClick={addRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >

              + Add Item

            </button>

          </div>

          {items.map(
            (item, index) => (

              <div
                key={index}
                className="grid grid-cols-6 gap-3 mb-3"
              >

                <input
                  className="border rounded-lg p-3"
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

                <select
                  className="border rounded-lg p-3"
                  value={item.item_type}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "item_type",
                      e.target.value
                    )
                  }
                >

                  <option>
                    Part
                  </option>

                  <option>
                    Labour
                  </option>

                </select>

                <input
                  type="number"
                  className="border rounded-lg p-3"
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
                  className="border rounded-lg p-3"
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "rate",
                      e.target.value
                    )
                  }
                />

                <div className="border rounded-lg p-3 bg-gray-100">

                  ₹
                  {
                    item.qty *
                    item.rate
                  }

                </div>

                <button
                  className="bg-red-500 text-white rounded-lg"
                  onClick={() =>
                    removeRow(
                      index
                    )
                  }
                >

                  Remove

                </button>

              </div>

            )
          )}

          <div className="mt-6 text-right">

            <h1 className="text-3xl font-bold text-green-600">

              ₹ {grandTotal}

            </h1>

          </div>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5"
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
    className="border rounded-lg p-3"
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
  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="p-3 text-left">
  Invoice No
</th>

<th className="p-3 text-left">
  Customer
</th>

<th className="p-3 text-left">
  Vehicle
</th>

<th className="p-3 text-left">
  Total
</th>

<th className="p-3 text-left">
  Paid
</th>

<th className="p-3 text-left">
  Balance
</th>

<th className="p-3 text-left">
  Status
</th>

<th className="p-3 text-left">
  Action
</th>

        </tr>

      </thead>

      <tbody>

        {
  invoices
    .filter((invoice) => {

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

        statusFilter === "All"

        ||

        invoice.status ===
        statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    })

    .map((invoice) => (

          <tr
            key={invoice.id}
            className="border-b"
          >

            <td className="p-3">
              {invoice.invoice_no}
            </td>

            <td className="p-3">
              {invoice.customer_name}
            </td>

            <td className="p-3">
              {invoice.vehicle_number}
            </td>

            <td className="p-3">
              ₹ {invoice.total_amount}
            </td>

            <td className="p-3">
  ₹ {invoice.paid_amount}
</td>

<td className="p-3">
  ₹ {invoice.balance_amount}
</td>

            <td className="p-3">

              <span
                className={
                  invoice.status === "Paid"
                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                    : invoice.status === "Partial"
                    ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                    : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                }
              >

                {invoice.status}

              </span>

            </td>

            <td className="p-3">
                <button
  className="bg-green-600 text-white px-3 py-2 rounded-lg mr-2"
  onClick={() =>
    handleMarkPaid(
      invoice
    )
  }
>

  Mark Paid

</button>

              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_API_URL}/invoices/${id}/pdf`,
  "_blank"
                  )
                }
              >

                PDF

              </button>
              
              <button
  className="bg-red-600 text-white px-3 py-2 rounded-lg ml-2"
  onClick={() =>
    handleDeleteInvoice(
      invoice.id
    )
  }
>

  Delete

</button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Invoice;