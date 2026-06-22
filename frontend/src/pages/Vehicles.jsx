import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getVehicles } from "../services/vehicleService";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicle_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.vehicle_model
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      vehicle.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Vehicles
          </h1>

          <p className="text-slate-500">
            Manage customer vehicles
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">
            Total Vehicles
          </p>

          <h2 className="text-4xl font-bold text-blue-600">
            {vehicles.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <input
            className="w-full border rounded-lg p-3 mb-5"
            placeholder="Search Vehicle..."
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
                    Vehicle No
                  </th>

                  <th className="text-left p-3">
                    Model
                  </th>

                  <th className="text-left p-3">
                    Make
                  </th>

                  <th className="text-left p-3">
                    Customer
                  </th>

                  <th className="text-left p-3">
                    KM
                  </th>

                  <th className="text-left p-3">
                    Fuel
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.map(
                  (vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-3">
                        {vehicle.vehicle_number}
                      </td>

                      <td className="p-3">
                        {vehicle.vehicle_model}
                      </td>

                      <td className="p-3">
                        {vehicle.vehicle_make}
                      </td>

                      <td className="p-3">
                        {vehicle.customer_name}
                      </td>

                      <td className="p-3">
                        {vehicle.km_reading}
                      </td>

                      <td className="p-3">
                        {vehicle.fuel_level}
                      </td>
                    </tr>
                  )
                )}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Vehicles;