import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { addCustomerVehicle } from "../services/customerVehicleService";

import {
  getCustomerDetails,
} from "../services/customerDetailsService";

import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    notes: "",

    vehicle_number: "",
    vehicle_model: "",
    vehicle_make: "",

    km_reading: "",
    fuel_level: "",
  });

const [selectedCustomer, setSelectedCustomer] =
  useState(null);

const [showModal, setShowModal] =
  useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCustomerVehicle(form);

      alert("Customer & Vehicle Added Successfully");

      setForm({
        name: "",
        mobile: "",
        address: "",
        notes: "",

        vehicle_number: "",
        vehicle_model: "",
        vehicle_make: "",

        km_reading: "",
        fuel_level: "",
      });

      loadCustomers();
    } catch (error) {
      alert(
        error?.response?.data?.sqlMessage ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Customer?")) return;

    await deleteCustomer(id);

    loadCustomers();
  };
const handleView = async (id) => {
  const res =
    await getCustomerDetails(id);

  setSelectedCustomer(res.data[0]);

  setShowModal(true);
};

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.mobile.includes(search)
  );

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500">
            Manage Customers & Vehicles
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">
            Total Customers
          </p>

          <h2 className="text-4xl font-bold text-blue-600">
            {customers.length}
          </h2>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">
            Add Customer & Vehicle
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            {/* Customer Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-700">
                Customer Information
              </h3>
            </div>

            <input
              className="border rounded-lg p-3"
              placeholder="Customer Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
            />

            {/* Vehicle Section */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-slate-700">
                Vehicle Information
              </h3>
            </div>

            <input
              className="border rounded-lg p-3"
              placeholder="Vehicle Number"
              value={form.vehicle_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_number: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Vehicle Model"
              value={form.vehicle_model}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_model: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Vehicle Make"
              value={form.vehicle_make}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_make: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="KM Reading"
              value={form.km_reading}
              onChange={(e) =>
                setForm({
                  ...form,
                  km_reading: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Fuel Level"
              value={form.fuel_level}
              onChange={(e) =>
                setForm({
                  ...form,
                  fuel_level: e.target.value,
                })
              }
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Save Customer & Vehicle
              </button>
            </div>
          </form>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-xl shadow p-6">
          <input
            className="w-full border rounded-lg p-3 mb-5"
            placeholder="Search Customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">
                    Name
                  </th>

                  <th className="text-left p-3">
                    Mobile
                  </th>

                  <th className="text-left p-3">
                    Address
                  </th>

                  <th className="text-left p-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map(
                  (customer) => (
                    <tr
                      key={customer.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-3">
                        {customer.name}
                      </td>

                      <td className="p-3">
                        {customer.mobile}
                      </td>

                      <td className="p-3">
                        {customer.address}
                      </td>

                      <td className="p-3 flex gap-2">
  <button
    onClick={() =>
      handleView(customer.id)
    }
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
  >
    View
  </button>

  <button
    onClick={() =>
      handleDelete(customer.id)
    }
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
  >
    Delete
  </button>
</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
{showModal && selectedCustomer && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Customer Details
      </h2>

      <div className="space-y-2">

        <p>
          <strong>Name:</strong>{" "}
          {selectedCustomer.name}
        </p>

        <p>
          <strong>Mobile:</strong>{" "}
          {selectedCustomer.mobile}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {selectedCustomer.address}
        </p>

        <hr className="my-3" />

        <p>
          <strong>Vehicle Number:</strong>{" "}
          {selectedCustomer.vehicle_number}
        </p>

        <p>
          <strong>Vehicle Model:</strong>{" "}
          {selectedCustomer.vehicle_model}
        </p>

        <p>
          <strong>Vehicle Make:</strong>{" "}
          {selectedCustomer.vehicle_make}
        </p>

        <p>
          <strong>KM Reading:</strong>{" "}
          {selectedCustomer.km_reading}
        </p>

        <p>
          <strong>Fuel Level:</strong>{" "}
          {selectedCustomer.fuel_level}
        </p>

      </div>

      <button
        onClick={() =>
          setShowModal(false)
        }
        className="mt-5 bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded"
      >
        Close
      </button>

    </div>

  </div>
)}
    </MainLayout>
  );
}

export default Customers;