import React, {
  useState,
  useEffect,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  createQuotation,
} from "../services/quotationService";

import {
  getCustomers,
} from "../services/customerService";

import {
  getVehicles,
} from "../services/vehicleService";

function Quotations() {

  const [customers, setCustomers] =
    useState([]);

  const [vehicles, setVehicles] =
    useState([]);

  const [showInfoModal, setShowInfoModal] =
    useState(false);

  const [customerId, setCustomerId] =
    useState("");

  const [vehicleId, setVehicleId] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [savedQuotationId,
    setSavedQuotationId] =
    useState(null);

  const [items, setItems] =
    useState([
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

      const customerRes =
        await getCustomers();

      const vehicleRes =
        await getVehicles();

      setCustomers(
        customerRes.data
      );

      setVehicles(
        vehicleRes.data
      );

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

      [field]: value,

    };

    setItems(updated);

  };

  const grandTotal =
    items.reduce(

      (sum, item) =>

        sum +

        Number(
          item.qty || 0
        ) *

        Number(
          item.rate || 0
        ),

      0

    );

  const handleSaveDraft =
    async () => {

      try {

        if (!customerId) {

          alert(
            "Please Select Customer"
          );

          return;

        }

        if (!vehicleId) {

          alert(
            "Please Select Vehicle"
          );

          return;

        }

        const payload = {

          customer_id:
            customerId,

          vehicle_id:
            vehicleId,

          notes,

          items,

        };

        const res =
          await createQuotation(
            payload
          );

        setSavedQuotationId(
          res.data
            .quotation_id
        );

        alert(
          "Quotation Saved Successfully"
        );

      } catch (err) {

        console.error(
          err
        );

        alert(
          "Failed To Save Quotation"
        );

      }

    };

  const handleDownloadPDF =
    () => {

      if (
        !savedQuotationId
      ) {

        alert(
          "Pehle Save Karo"
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

      <div className="space-y-5">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            Quotations

          </h1>

          <p className="text-gray-500">

            Create customer quotation

          </p>

        </div>

        {/* Vehicle Info Card */}

        <div className="bg-white rounded-3xl shadow p-5">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="font-bold text-lg">

                Customer Details

              </h2>

              <p className="text-gray-500 text-sm">

                Select Customer & Vehicle

              </p>

            </div>

            <button

              onClick={() =>
                setShowInfoModal(true)
              }

              className="bg-blue-600 text-white px-5 py-3 rounded-2xl"

            >

              Select

            </button>

          </div>

        </div>

        {/* Item Header */}

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">

            Items

          </h2>

          <button

            type="button"

            onClick={addRow}

            className="bg-blue-600 text-white px-5 py-3 rounded-2xl"

          >

            + Add

          </button>

        </div>

        {/* Item Cards */}

        <div className="space-y-4">

          {

            items.map(

              (

                item,

                index

              ) => (

                <div

                  key={index}

                  className="bg-white rounded-3xl shadow p-5"

                >

                  <input

                    className="w-full border rounded-2xl p-4"

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

                    className="w-full border rounded-2xl p-4 mt-4"

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

                  <div className="grid grid-cols-2 gap-4 mt-4">

                    <input

                      type="number"

                      className="border rounded-2xl p-4"

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

                      className="border rounded-2xl p-4"

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

                  </div>

                  <div className="bg-green-100 rounded-2xl p-4 mt-4">

                    <h2 className="text-3xl font-bold text-green-700">

                      ₹ {

                        Number(item.qty || 0)

                        *

                        Number(item.rate || 0)

                      }

                    </h2>

                  </div>

                  <button

                    type="button"

                    onClick={() =>
                      removeRow(index)
                    }

                    className="w-full bg-red-600 text-white py-3 rounded-2xl mt-4"

                  >

                    Remove

                  </button>

                </div>

              )

            )

          }
                  </div>

        {/* Grand Total */}

        <div className="bg-green-50 rounded-3xl shadow p-5">

          <p className="text-gray-500">

            Grand Total

          </p>

          <h2 className="text-4xl font-bold text-green-700">

            ₹ {grandTotal}

          </h2>

        </div>

        {/* Buttons */}

        <div className="space-y-4">

          <button

            type="button"

            onClick={handleSaveDraft}

            className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg"

          >

            Save Draft

          </button>

          <button

            type="button"

            onClick={handleDownloadPDF}

            className="w-full bg-red-600 text-white py-4 rounded-2xl text-lg"

          >

            Download PDF

          </button>

        </div>

        {/* Customer Info Modal */}

        {

          showInfoModal && (

            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

              <div className="bg-white rounded-3xl p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-5">

                  Customer Details

                </h2>

                <div className="space-y-4">

                  <select

                    className="w-full border rounded-2xl p-4"

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

                    {

                      customers.map(

                        (

                          customer

                        ) => (

                          <option

                            key={customer.id}

                            value={customer.id}

                          >

                            {customer.name}

                          </option>

                        )

                      )

                    }

                  </select>

                  <select

                    className="w-full border rounded-2xl p-4"

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

                    {

                      vehicles

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

                          (

                            vehicle

                          ) => (

                            <option

                              key={vehicle.id}

                              value={vehicle.id}

                            >

                              {

                                vehicle.vehicle_number

                              }

                              {" - "}

                              {

                                vehicle.vehicle_model

                              }

                            </option>

                          )

                        )

                    }

                  </select>

                  <textarea

                    className="w-full border rounded-2xl p-4"

                    placeholder="Notes"

                    value={notes}

                    onChange={(e) =>

                      setNotes(

                        e.target.value

                      )

                    }

                  />

                  <div className="flex gap-3">

                    <button

                      className="flex-1 bg-blue-600 text-white py-3 rounded-2xl"

                      onClick={() =>

                        setShowInfoModal(

                          false

                        )

                      }

                    >

                      Done

                    </button>

                  </div>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </MainLayout>

  );

}

export default Quotations;