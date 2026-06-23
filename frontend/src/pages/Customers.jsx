import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

import {
  addCustomerVehicle,
} from "../services/customerVehicleService";

import {
  getCustomerDetails,
} from "../services/customerDetailsService";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

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

    try {

      const res =
        await getCustomers();

      setCustomers(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addCustomerVehicle(form);

      alert(
        "Customer Added Successfully"
      );

      setShowAddModal(false);

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
        error?.response?.data
          ?.sqlMessage ||
          "Something went wrong"
      );

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete Customer?"
      )
    )
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

    setShowViewModal(true);

  };

  const filteredCustomers =
    customers.filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.mobile.includes(
          search
        )
    );
      return (
    <MainLayout>

      <div className="space-y-5">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-gray-500">
            Manage Customers & Vehicles
          </p>

        </div>

        {/* Search */}

        <input
          className="w-full bg-white rounded-2xl shadow p-4 outline-none"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Add Button */}

        <button
          onClick={() =>
            setShowAddModal(true)
          }
          className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg shadow"
        >
          + Add Customer
        </button>

        {/* Customer Cards */}

        <div className="space-y-4">

          {filteredCustomers.map(
            (customer) => (

              <div
                key={customer.id}
                className="bg-white rounded-3xl shadow p-5"
              >

                <h2 className="text-xl font-bold text-slate-800">

                  👤 {customer.name}

                </h2>

                <p className="text-gray-500 mt-2">

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
                    className="flex-1 bg-blue-600 text-white py-3 rounded-2xl"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        customer.id
                      )
                    }
                    className="flex-1 bg-red-600 text-white py-3 rounded-2xl"
                  >
                    Delete
                  </button>

                </div>

              </div>

            )
          )}

        </div>
                {/* Add Customer Modal */}

        {showAddModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

              <h2 className="text-2xl font-bold mb-5">

                Add Customer

              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  className="w-full border rounded-2xl p-4"
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
                  className="w-full border rounded-2xl p-4"
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
                  className="w-full border rounded-2xl p-4"
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
                  className="w-full border rounded-2xl p-4"
                  placeholder="Vehicle Number"
                  value={form.vehicle_number}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      vehicle_number:
                        e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-2xl p-4"
                  placeholder="Vehicle Model"
                  value={form.vehicle_model}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      vehicle_model:
                        e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-2xl p-4"
                  placeholder="Vehicle Make"
                  value={form.vehicle_make}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      vehicle_make:
                        e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-2xl p-4"
                  placeholder="KM Reading"
                  value={form.km_reading}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      km_reading:
                        e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-2xl p-4"
                  placeholder="Fuel Level"
                  value={form.fuel_level}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fuel_level:
                        e.target.value,
                    })
                  }
                />

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-2xl"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAddModal(false)
                    }
                    className="flex-1 bg-gray-300 py-3 rounded-2xl"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}
                {/* View Customer Modal */}

        {showViewModal &&
          selectedCustomer && (

            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

              <div className="bg-white rounded-3xl p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-5">
                  Customer Details
                </h2>

                <div className="space-y-3">

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

                  <hr />

                  <p>
                    <strong>Vehicle Number:</strong>{" "}
                    {
                      selectedCustomer.vehicle_number
                    }
                  </p>

                  <p>
                    <strong>Vehicle Model:</strong>{" "}
                    {
                      selectedCustomer.vehicle_model
                    }
                  </p>

                  <p>
                    <strong>Vehicle Make:</strong>{" "}
                    {
                      selectedCustomer.vehicle_make
                    }
                  </p>

                  <p>
                    <strong>KM Reading:</strong>{" "}
                    {
                      selectedCustomer.km_reading
                    }
                  </p>

                  <p>
                    <strong>Fuel Level:</strong>{" "}
                    {
                      selectedCustomer.fuel_level
                    }
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowViewModal(false)
                  }
                  className="w-full bg-slate-800 text-white py-3 rounded-2xl mt-5"
                >
                  Close
                </button>

              </div>

            </div>

          )}

      </div>

    </MainLayout>
  );
}

export default Customers;