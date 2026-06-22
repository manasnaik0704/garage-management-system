import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { getCustomers } from "../services/customerService";
import { getJobCards } from "../services/jobCardService";

import {
  getPayments,
  createPayment,
} from "../services/paymentService";

function Payments() {
  const [customers, setCustomers] = useState([]);
  const [jobCards, setJobCards] = useState([]);
  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    job_card_id: "",
    amount: "",
    payment_mode: "Cash",
    payment_status: "Paid",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customerRes =
        await getCustomers();

      const jobCardRes =
        await getJobCards();

      const paymentRes =
        await getPayments();

      setCustomers(customerRes.data);
      setJobCards(jobCardRes.data);
      setPayments(paymentRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPayment(form);

      alert(
        "Payment Saved Successfully"
      );

      setForm({
        customer_id: "",
        job_card_id: "",
        amount: "",
        payment_mode: "Cash",
        payment_status: "Paid",
      });

      loadData();

    } catch (err) {
      console.error(err);
      alert("Failed To Save Payment");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Payments
          </h1>

          <p className="text-gray-500">
            Manage Customer Payments
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Add Payment
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
              value={form.job_card_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  job_card_id:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Job Card
              </option>

              {jobCards
                .filter(
                  (job) =>
                    String(
                      job.customer_id
                    ) ===
                    String(
                      form.customer_id
                    )
                )
                .map((job) => (
                  <option
                    key={job.id}
                    value={job.id}
                  >
                    {job.job_card_no}
                  </option>
                ))}
            </select>

            <input
              className="border rounded-lg p-3"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount:
                    e.target.value,
                })
              }
            />

            <select
              className="border rounded-lg p-3"
              value={form.payment_mode}
              onChange={(e) =>
                setForm({
                  ...form,
                  payment_mode:
                    e.target.value,
                })
              }
            >
              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Card
              </option>

              <option>
                Bank Transfer
              </option>
            </select>

            <select
              className="border rounded-lg p-3"
              value={form.payment_status}
              onChange={(e) =>
                setForm({
                  ...form,
                  payment_status:
                    e.target.value,
                })
              }
            >
              <option>
                Paid
              </option>

              <option>
                Pending
              </option>
            </select>

            <div className="md:col-span-2">

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Save Payment
              </button>

            </div>

          </form>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Payment History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b">

                  <th className="text-left p-3">
                    Customer
                  </th>

                  <th className="text-left p-3">
                    Job Card
                  </th>

                  <th className="text-left p-3">
                    Amount
                  </th>

                  <th className="text-left p-3">
                    Mode
                  </th>

                  <th className="text-left p-3">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {payments.map(
                  (payment) => (
                    <tr
                      key={payment.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {payment.customer_name}
                      </td>

                      <td className="p-3">
                        {payment.job_card_no}
                      </td>

                      <td className="p-3">
                        ₹{payment.amount}
                      </td>

                      <td className="p-3">
                        {payment.payment_mode}
                      </td>

                      <td className="p-3">
                        {payment.payment_status}
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

export default Payments;