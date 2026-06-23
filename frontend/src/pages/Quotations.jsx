import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { createQuotation } from "../services/quotationService";
import { getCustomers } from "../services/customerService";
import { getVehicles } from "../services/vehicleService";
import {
  downloadQuotationPDF
} from "../services/quotationService";

function Quotations() {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [notes, setNotes] = useState("");
  const [savedQuotationId, setSavedQuotationId] =
  useState(null);

  const [items, setItems] = useState([
    {
      item_name: "",
      item_type: "Part",
      qty: 1,
      rate: 0,
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customerRes = await getCustomers();
      const vehicleRes = await getVehicles();

      setCustomers(customerRes.data);
      setVehicles(vehicleRes.data);
    } catch (err) {
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
        rate: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  const grandTotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.qty || 0) *
        Number(item.rate || 0),
    0
  );

  const handleSaveDraft = async () => {
    try {
      if (!customerId) {
        alert("Please Select Customer");
        return;
      }

      if (!vehicleId) {
        alert("Please Select Vehicle");
        return;
      }

      const payload = {
        customer_id: customerId,
        vehicle_id: vehicleId,
        notes,
        items,
      };

      const res = await createQuotation(payload);
      setSavedQuotationId(
  res.data.quotation_id
);

      alert(
        `Quotation Saved Successfully\n${res.data.quotation_no || ""}`
      );
    } catch (err) {
      console.error(err);
      alert("Failed To Save Quotation");
    }
  };

  const handleDownloadPDF = () => {

  if (!savedQuotationId) {
    alert(
      "Pehle quotation save karo"
    );
    return;
  }

  window.open(
    `${import.meta.env.VITE_API_URL}/quotations/${savedQuotationId}/pdf`,
  "_blank"
  );
};

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Create Quotation
          </h1>

          <p className="text-gray-500">
            Create customer quotation
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="grid md:grid-cols-2 gap-4">

            <select
              className="border rounded-lg p-3"
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name}
                </option>
              ))}
            </select>

            <select
              className="border rounded-lg p-3"
              value={vehicleId}
              onChange={(e) =>
                setVehicleId(e.target.value)
              }
            >
              <option value="">
                Select Vehicle
              </option>

              {vehicles
                .filter(
                  (v) =>
                    String(v.customer_id) ===
                    String(customerId)
                )
                .map((vehicle) => (
                  <option
                    key={vehicle.id}
                    value={vehicle.id}
                  >
                    {vehicle.vehicle_number}
                    {" - "}
                    {vehicle.vehicle_model}
                  </option>
                ))}
            </select>

            <textarea
              className="border rounded-lg p-3 md:col-span-2"
              placeholder="Notes"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />
          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-semibold">
              Quotation Items
            </h2>

            <button
              type="button"
              onClick={addRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Item
            </button>

          </div>

          <div className="grid grid-cols-6 gap-3 mb-3 font-semibold">
            <div>Item Name</div>
            <div>Type</div>
            <div>Qty</div>
            <div>Rate</div>
            <div>Total</div>
            <div>Action</div>
          </div>

          {items.map((item, index) => (
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
                <option value="Part">
                  Part
                </option>

                <option value="Labour">
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

              <div className="border rounded-lg p-3 bg-gray-50">
                ₹{" "}
                {Number(item.qty || 0) *
                  Number(item.rate || 0)}
              </div>

              <button
                type="button"
                onClick={() =>
                  removeRow(index)
                }
                className="bg-red-500 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">

            <p className="text-gray-500">
              Grand Total
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              ₹ {grandTotal}
            </h2>

          </div>

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={handleSaveDraft}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Download PDF
            </button>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Quotations;