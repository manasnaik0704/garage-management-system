import MainLayout from "../layouts/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Garage Pro
          </h1>

          <p className="text-gray-500">
            Welcome Back 👋
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-blue-600 text-white rounded-3xl p-5 shadow-lg">
            <p className="text-sm opacity-90">
              Total Revenue
            </p>

            <h2 className="text-3xl font-bold mt-3">
              ₹9950
            </h2>
          </div>

          <div className="bg-red-500 text-white rounded-3xl p-5 shadow-lg">
            <p className="text-sm opacity-90">
              Open Jobs
            </p>

            <h2 className="text-3xl font-bold mt-3">
              2
            </h2>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid grid-cols-2 gap-4">

          <button className="bg-white rounded-3xl shadow p-5">

            <div className="text-4xl">
              👤
            </div>

            <p className="mt-3 font-semibold">
              Add Customer
            </p>

          </button>

          <button className="bg-white rounded-3xl shadow p-5">

            <div className="text-4xl">
              🔧
            </div>

            <p className="mt-3 font-semibold">
              New Job Card
            </p>

          </button>

        </div>

        {/* Work Orders */}

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Work Orders
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-blue-100 rounded-2xl p-4 text-center">

              <div className="text-3xl">
                📄
              </div>

              <p className="font-bold mt-3">
                Estimate
              </p>

              <p className="text-blue-700 font-bold">
                4
              </p>

            </div>

            <div className="bg-yellow-100 rounded-2xl p-4 text-center">

              <div className="text-3xl">
                ⚙
              </div>

              <p className="font-bold mt-3">
                Progress
              </p>

              <p className="text-yellow-700 font-bold">
                2
              </p>

            </div>

            <div className="bg-green-100 rounded-2xl p-4 text-center">

              <div className="text-3xl">
                ✅
              </div>

              <p className="font-bold mt-3">
                Delivered
              </p>

              <p className="text-green-700 font-bold">
                8
              </p>

            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-bold">
              Recent Activity
            </h2>

            <button className="text-blue-600">
              View All
            </button>

          </div>

          <div className="space-y-4">

            <div className="bg-slate-50 rounded-2xl p-4">

              <p className="font-semibold">
                🔧 Job Card Created
              </p>

              <p className="text-gray-500 text-sm mt-1">
                MH04AB1234
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-4">

              <p className="font-semibold">
                🚗 Vehicle Added
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Swift Dzire
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-4">

              <p className="font-semibold">
                👤 Customer Added
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Akshay
              </p>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;