import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500">
            Garage Management Overview
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Customers
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              2
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Vehicles
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              2
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Quotations
            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-2">
              0
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Open Jobs
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              2
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Delivered
            </p>

            <h2 className="text-4xl font-bold text-emerald-600 mt-2">
              0
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">
              Revenue
            </p>

            <h2 className="text-3xl font-bold text-orange-600 mt-2">
              ₹9950
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">

            <div className="border rounded-lg p-4">
              🔧 Job Card Created
            </div>

            <div className="border rounded-lg p-4">
              🚗 Vehicle Added
            </div>

            <div className="border rounded-lg p-4">
              👤 Customer Added
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;