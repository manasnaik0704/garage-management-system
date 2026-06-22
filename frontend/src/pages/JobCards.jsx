import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { getCustomers } from "../services/customerService";
import { getVehicles } from "../services/vehicleService";

import {
  getJobCards,
  createJobCard,
  updateJobStatus,
} from "../services/jobCardService";

function JobCards() {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [jobCards, setJobCards] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    vehicle_id: "",
    complaint: "",
    diagnosis: "",
    current_km: "",
    estimated_cost: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customerRes =
        await getCustomers();

      const vehicleRes =
        await getVehicles();

      const jobCardRes =
        await getJobCards();

      setCustomers(customerRes.data);
      setVehicles(vehicleRes.data);
      setJobCards(jobCardRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res =
        await createJobCard(form);

      alert(
        `Job Card Created\n${res.data.job_card_no}`
      );

      setForm({
        customer_id: "",
        vehicle_id: "",
        complaint: "",
        diagnosis: "",
        current_km: "",
        estimated_cost: "",
        notes: "",
      });

      loadData();

    } catch (err) {
      console.error(err);
      alert("Failed To Create Job Card");
    }
  };
  const handleStatusChange = async (
  id,
  status
) => {
  try {
    await updateJobStatus(
      id,
      status
    );

    loadData();

  } catch (err) {
    console.error(err);
  }
};

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Job Cards
          </h1>

          <p className="text-gray-500">
            Manage Workshop Jobs
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Create Job Card
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <select
              className="border rounded-lg p-3"
              value={form.customer_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  customer_id:
                    e.target.value,
                })
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
              value={form.vehicle_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicle_id:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Vehicle
              </option>

              {vehicles
                .filter(
                  (vehicle) =>
                    String(
                      vehicle.customer_id
                    ) ===
                    String(
                      form.customer_id
                    )
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

            <input
              className="border rounded-lg p-3"
              placeholder="Current KM"
              value={form.current_km}
              onChange={(e) =>
                setForm({
                  ...form,
                  current_km:
                    e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Estimated Cost"
              value={form.estimated_cost}
              onChange={(e) =>
                setForm({
                  ...form,
                  estimated_cost:
                    e.target.value,
                })
              }
            />

            <textarea
              className="border rounded-lg p-3"
              placeholder="Complaint"
              value={form.complaint}
              onChange={(e) =>
                setForm({
                  ...form,
                  complaint:
                    e.target.value,
                })
              }
            />

            <textarea
              className="border rounded-lg p-3"
              placeholder="Diagnosis"
              value={form.diagnosis}
              onChange={(e) =>
                setForm({
                  ...form,
                  diagnosis:
                    e.target.value,
                })
              }
            />

            <div className="md:col-span-2">

              <textarea
                className="border rounded-lg p-3 w-full"
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes:
                      e.target.value,
                  })
                }
              />

            </div>

            <div className="md:col-span-2">

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Create Job Card
              </button>

            </div>

          </form>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Job Card List
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b">

                  <th className="text-left p-3">
                    Job Card No
                  </th>

                  <th className="text-left p-3">
                    Customer
                  </th>

                  <th className="text-left p-3">
                    Vehicle
                  </th>

                  <th className="text-left p-3">
  Status
</th>

<th className="text-left p-3">
  Cost
</th>

<th className="text-left p-3">
  Action
</th>

                </tr>
              </thead>

              <tbody>

                {jobCards.map(
                  (job) => (
                    <tr
                      key={job.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {job.job_card_no}
                      </td>

                      <td className="p-3">
                        {job.customer_name}
                      </td>

                      <td className="p-3">
                        {job.vehicle_number}
                      </td>

                      <td className="p-3">
  <span
    className={`px-3 py-1 rounded-full text-white text-sm ${
      job.status === "Open"
        ? "bg-red-500"
        : job.status === "In Progress"
        ? "bg-yellow-500"
        : job.status === "Ready"
        ? "bg-blue-500"
        : "bg-green-600"
    }`}
  >
    {job.status}
  </span>
</td>

<td className="p-3">
  ₹{job.estimated_cost}
</td>

<td className="p-3">
  <select
    value={job.status}
    onChange={(e) =>
      handleStatusChange(
        job.id,
        e.target.value
      )
    }
    className="border rounded-lg p-2"
  >
    <option value="Open">
      Open
    </option>

    <option value="In Progress">
      In Progress
    </option>

    <option value="Waiting Parts">
      Waiting Parts
    </option>

    <option value="Ready">
      Ready
    </option>

    <option value="Delivered">
      Delivered
    </option>
  </select>
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

export default JobCards;