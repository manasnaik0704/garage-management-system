import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { getQuotations } from "../services/quotationService";
import { getJobCards } from "../services/jobCardService";
import { getPayments } from "../services/paymentService";

function History() {
  const [quotations, setQuotations] = useState([]);
  const [jobCards, setJobCards] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const quotationRes = await getQuotations();
      const jobCardRes = await getJobCards();
      const paymentRes = await getPayments();

      setQuotations(quotationRes.data);
      setJobCards(jobCardRes.data);
      setPayments(paymentRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            History
          </h1>

          <p className="text-gray-500">
            Quotations, Job Cards & Payments History
          </p>
        </div>

        {/* Quotations */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Quotations History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">
                    Quotation No
                  </th>

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Vehicle
                  </th>

                  <th className="p-3 text-left">
                    Amount
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {quotations.map((q) => (

                  <tr
                    key={q.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {q.quotation_no}
                    </td>

                    <td className="p-3">
                      {q.customer_name}
                    </td>

                    <td className="p-3">
                      {q.vehicle_number}
                    </td>

                    <td className="p-3">
                      ₹{q.total_amount}
                    </td>

                    <td className="p-3">
                      {q.status}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Job Cards */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Job Cards History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">
                    Job Card No
                  </th>

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Vehicle
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
                    Cost
                  </th>

                </tr>

              </thead>

              <tbody>

                {jobCards.map((job) => (

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
                      {job.status}
                    </td>

                    <td className="p-3">
                      ₹{job.estimated_cost}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Payments */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Payment History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Amount
                  </th>

                  <th className="p-3 text-left">
                    Mode
                  </th>

                  <th className="p-3 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {payment.customer_name}
                    </td>

                    <td className="p-3">
                      ₹{payment.amount}
                    </td>

                    <td className="p-3">
                      {payment.payment_mode}
                    </td>

                    <td className="p-3">
                      {new Date(
                        payment.created_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default History;