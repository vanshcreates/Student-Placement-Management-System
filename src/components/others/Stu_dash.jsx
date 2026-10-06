import React from "react";

import {
  BriefcaseBusiness,
  FileText,
  Users,
  Trophy,
  UserRound,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Stu_dash = () => {

  // -------------------------
  // DEMO DATA
  // Later this will come from backend
  // -------------------------

  const placementActivity = [
    { month: "Jun", applications: 1 },
    { month: "Jul", applications: 2 },
    { month: "Aug", applications: 3 },
    { month: "Sep", applications: 4 },
    { month: "Oct", applications: 5 },
  ];

  const applicationStatus = [
    { name: "Applied", value: 5 },
    { name: "Shortlisted", value: 2 },
    { name: "Rejected", value: 1 },
  ];

  const packageData = [
    { range: "4-6 LPA", drives: 5 },
    { range: "6-8 LPA", drives: 8 },
    { range: "8-10 LPA", drives: 4 },
    { range: "10+ LPA", drives: 2 },
  ];

  const stats = [
    {
      title: "Eligible Drives",
      value: "12",
      icon: BriefcaseBusiness,
    },
    {
      title: "Applications",
      value: "5",
      icon: FileText,
    },
    {
      title: "Shortlisted",
      value: "2",
      icon: Users,
    },
    {
      title: "Selected",
      value: "0",
      icon: Trophy,
    },
  ];

  const pieColors = [
    "#52745a",
    "#103d2c",
    "#d97706",
  ];

  return (
    <div className="min-h-screen bg-[#f5f6ef] px-6 py-8">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold text-[#103d2c]">
              Good Morning, Vansh 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Here's your placement overview.
            </p>
          </div>

          {/* Profile Completion */}

          <div className="mt-5 md:mt-0 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">

            <div className="flex items-center gap-3">

              <UserRound
                size={20}
                className="text-[#52745a]"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Profile Completion
                </p>

                <p className="font-bold text-[#103d2c]">
                  85%
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold text-[#103d2c] mt-2">
                      {item.value}
                    </h2>

                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#e6eee7] flex items-center justify-center">

                    <Icon
                      size={22}
                      className="text-[#52745a]"
                    />

                  </div>

                </div>

              </div>

            );

          })}

        </div>


        {/* ================= GRAPHS ROW 1 ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Placement Activity */}

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-[#103d2c]">
                Placement Activity
              </h2>

              <p className="text-sm text-gray-500">
                Applications submitted over time
              </p>

            </div>


            <div className="h-[280px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={placementActivity}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#103d2c"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* Application Status */}

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            <h2 className="text-lg font-bold text-[#103d2c]">
              Application Status
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              Current application breakdown
            </p>


            <div className="h-[230px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={applicationStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >

                    {applicationStatus.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={pieColors[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>


            <div className="space-y-2">

              {applicationStatus.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: pieColors[index],
                      }}
                    />

                    <span className="text-gray-600">
                      {item.name}
                    </span>

                  </div>

                  <span className="font-bold text-[#103d2c]">
                    {item.value}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ================= GRAPHS ROW 2 ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Package Distribution */}

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            <h2 className="text-lg font-bold text-[#103d2c]">
              Placement Drives by Package
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              Distribution of available placement packages
            </p>


            <div className="h-[280px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={packageData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="range"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="drives"
                    fill="#52745a"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* Placement Progress */}

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

            <h2 className="text-lg font-bold text-[#103d2c]">
              Placement Progress
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Your current placement journey
            </p>


            <div className="space-y-5">

              {/* Profile */}

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-[#e6eee7] flex items-center justify-center">

                  <CheckCircle2
                    size={20}
                    className="text-[#52745a]"
                  />

                </div>

                <div className="flex-1">

                  <div className="flex justify-between mb-1">

                    <span className="text-sm font-semibold">
                      Profile Completed
                    </span>

                    <span className="text-sm font-bold">
                      100%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-100 rounded-full">

                    <div
                      className="h-2 bg-[#52745a] rounded-full"
                      style={{ width: "100%" }}
                    />

                  </div>

                </div>

              </div>


              {/* Documents */}

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-[#e6eee7] flex items-center justify-center">

                  <CheckCircle2
                    size={20}
                    className="text-[#52745a]"
                  />

                </div>

                <div className="flex-1">

                  <div className="flex justify-between mb-1">

                    <span className="text-sm font-semibold">
                      Documents
                    </span>

                    <span className="text-sm font-bold">
                      100%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-100 rounded-full">

                    <div
                      className="h-2 bg-[#52745a] rounded-full"
                      style={{ width: "100%" }}
                    />

                  </div>

                </div>

              </div>


              {/* Applications */}

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-[#e6eee7] flex items-center justify-center">

                  <Clock3
                    size={20}
                    className="text-[#52745a]"
                  />

                </div>

                <div className="flex-1">

                  <div className="flex justify-between mb-1">

                    <span className="text-sm font-semibold">
                      Applications
                    </span>

                    <span className="text-sm font-bold">
                      60%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-100 rounded-full">

                    <div
                      className="h-2 bg-[#52745a] rounded-full"
                      style={{ width: "60%" }}
                    />

                  </div>

                </div>

              </div>


              {/* Interview */}

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">

                  <Clock3
                    size={20}
                    className="text-gray-400"
                  />

                </div>

                <div className="flex-1">

                  <div className="flex justify-between mb-1">

                    <span className="text-sm font-semibold">
                      Interview
                    </span>

                    <span className="text-sm text-gray-400">
                      Pending
                    </span>

                  </div>

                  <div className="h-2 bg-gray-100 rounded-full">

                    <div
                      className="h-2 bg-gray-300 rounded-full"
                      style={{ width: "20%" }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= QUICK INSIGHT ================= */}

        <div className="bg-[#103d2c] rounded-2xl p-6 text-white">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

            <div>

              <p className="text-sm text-gray-600">
                Placement Insight
              </p>

              <h2 className="text-xl font-bold mt-1">
                You have applied to 5 companies this placement season.
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Keep applying to eligible drives to improve your chances.
              </p>

            </div>


            <div className="flex items-center gap-8">

              <div>
                <p className="text-xs text-black">
                  Shortlist Rate
                </p>

                <p className="text-2xl font-bold green">
                  40%
                </p>
              </div>

              <div>
                <p className="text-xs text-black">
                  Profile
                </p>

                <p className="text-2xl font-bold green">
                  85%
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Stu_dash;