import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { addCustomerVehicle } from "../services/customerVehicleService";
import { getCustomerDetails } from "../services/customerDetailsService";
import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

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

      alert(
        "Customer & Vehicle Added Successfully"
      );

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

    if (!window.confirm("Delete Customer?"))
      return;

    await deleteCustomer(id);

    loadCustomers();

  };

  const handleView = async (id) => {

    const res =
      await getCustomerDetails(id);

    setSelectedCustomer(
      res.data[0]
    );

    setShowModal(true);

  };

  const filteredCustomers =
    customers.filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.mobile.includes(search)
    );

  return (
    <MainLayout>

      <div className="space-y-6">

        {/* Header */}

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500">
            Manage Customers & Vehicles
          </p>

        </div>

        {/* Stats */}

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-gray-500">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {customers.length}
          </h2>

        </div>

        {/* Form */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Add Customer & Vehicle
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
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
              className="border rounded-xl p-4"
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
                className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold"
              >
                Save Customer & Vehicle
              </button>

            </div>

          </form>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow p-6">

          <input
            className="w-full border rounded-xl p-4 mb-5"
            placeholder="Search Customer"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="space-y-4">

            {filteredCustomers.map(
              (customer) => (

                <div
                  key={customer.id}
                  className="bg-slate-50 rounded-2xl p-5 shadow"
                >

                  <h2 className="text-xl font-bold">
                    {customer.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    📞 {customer.mobile}
                  </p>

                  <p className="text-gray-500">
                    📍 {customer.address}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        handleView(
                          customer.id
                        )
                      }
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          customer.id
                        )
                      }
                      className="flex-1 bg-red-600 text-white py-3 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {showModal &&
        selectedCustomer && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[95%] md:w-[500px]">

            <h2 className="text-2xl font-bold mb-5">
              Customer Details
            </h2>

            <div className="space-y-2">

              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Mobile:</strong> {selectedCustomer.mobile}</p>
              <p><strong>Address:</strong> {selectedCustomer.address}</p>

              <hr />

              <p><strong>Vehicle No:</strong> {selectedCustomer.vehicle_number}</p>
              <p><strong>Model:</strong> {selectedCustomer.vehicle_model}</p>
              <p><strong>Make:</strong> {selectedCustomer.vehicle_make}</p>
              <p><strong>KM:</strong> {selectedCustomer.km_reading}</p>
              <p><strong>Fuel:</strong> {selectedCustomer.fuel_level}</p>

            </div>

            <button
              className="w-full mt-6 bg-slate-800 text-white py-3 rounded-xl"
              onClick={() =>
                setShowModal(false)
              }
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