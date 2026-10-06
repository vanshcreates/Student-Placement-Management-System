import React from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  FileText,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  UserCheck,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import AddData from "./AddData";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+8.2%",
      icon: Users,
    },
    {
      title: "Active Companies",
      value: "42",
      change: "+5.4%",
      icon: Building2,
    },
    {
      title: "Placement Drives",
      value: "18",
      change: "+12.5%",
      icon: BriefcaseBusiness,
    },
    {
      title: "Applications",
      value: "2,846",
      change: "+16.8%",
      icon: FileText,
    },
  ];

  const recentDrives = [
    {
      company: "TCS",
      role: "Software Developer",
      students: 186,
      status: "Active",
      date: "06 Oct 2026",
    },
    {
      company: "Infosys",
      role: "Systems Engineer",
      students: 142,
      status: "Active",
      date: "08 Oct 2026",
    },
    {
      company: "Deloitte",
      role: "Analyst",
      students: 98,
      status: "Upcoming",
      date: "12 Oct 2026",
    },
    {
      company: "Wipro",
      role: "Project Engineer",
      students: 124,
      status: "Completed",
      date: "02 Oct 2026",
    },
  ];

  const recentApplications = [
    {
      name: "Rahul Sharma",
      company: "TCS",
      role: "Software Developer",
      status: "Shortlisted",
    },
    {
      name: "Priya Singh",
      company: "Infosys",
      role: "Systems Engineer",
      status: "Applied",
    },
    {
      name: "Arjun Kumar",
      company: "Deloitte",
      role: "Analyst",
      status: "Shortlisted",
    },
    {
      name: "Ananya Gupta",
      company: "Wipro",
      role: "Project Engineer",
      status: "Under Review",
    },
  ];

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      name: "Students",
      icon: Users,
    },
    {
      name: "Companies",
      icon: Building2,
    },
    {
      name: "Placement Drives",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applications",
      icon: FileText,
    },
    {
      name: "Announcements",
      icon: Megaphone,
    },
    {
      name: "Reports",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6ef] flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 green-bg-container z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
<div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
    <aside
  className="h-full w-64 shrink-0 text-white flex flex-col green-bg-container"
>
  {/* Sidebar Content */}


        {/* Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b">
          <div>
            <h1 className="text-xl font-bold chalk">
              Placement Portal
            </h1>

            <p className="text-xs text-green-200 mt-1">
              Admin Panel
            </p>
          </div>

          <button
            className="lg:hidden chalk"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  item.active
                    ? "chalk-bg-container text-[#103d2c]"
                    : "text-[var(--pine)] hover:gold-border"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}

          <div className="pt-5 mt-5 border-t">

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--pine)] hover:bg-white/10 transition">
              <Settings size={18} />
              Settings
            </button>

          </div>

        </nav>

        {/* Admin */}
        <div className="p-4 border-t border-white/10">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">

            <div className="w-10 h-10 rounded-full chalk-bg-container text-[#103d2c] flex items-center justify-center font-bold">
              A
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">
                Placement Admin
              </p>

              <p className="text-xs text-green-200 truncate">
                admin@college.edu
              </p>
            </div>

          </div>

          <button className="w-full mt-3 flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--pine)] hover:bg-white/10 rounded-xl transition">
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">

        {/* Topbar */}
        <header className="h-20 chalk-bg-container border-b green-border px-5 lg:px-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden text-[#103d2c]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-[#103d2c]">
                Dashboard
              </h2>

              <p className="text-xs text-gray-500">
                Placement management overview
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 rounded-xl">
              <Search size={17} className="text-gray-400 px-2 py-3 green" />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-80 px-4 py-2"
              />
            </div>

            {/* Notification */}
            <button className="relative w-10 h-10 rounded-xl green-bg-container flex items-center justify-center">
              <Bell size={18} className="chalk" />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>

          </div>

        </header>

        {/* Content */}
        <div className="p-5 lg:p-8">

          {/* Welcome */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">

            <div>
              <h1 className="text-2xl font-bold text-[#103d2c]">
                Good morning, Admin
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Here's what's happening with campus placements.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 green-bg-container text-white px-5 py-3 rounded-xl text-sm font-semibold hover:chalk-bg-container transition">
              <Plus size={17} />
              Create Drive
            </button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        {stat.title}
                      </p>

                      <h3 className="text-2xl font-bold text-[#103d2c] mt-2">
                        {stat.value}
                      </h3>

                      <p className="text-xs text-green-600 font-semibold mt-2">
                        {stat.change} this month
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                      <Icon
                        size={20}
                        className="text-[#52745a]"
                      />
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Analytics */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-7">

            {/* Placement Overview */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="font-bold text-[#103d2c]">
                    Placement Overview
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Student placement statistics
                  </p>
                </div>

                <select className="text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none text-gray-600">
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>

              </div>

              {/* Fake Graph */}
              <div className="h-56 flex items-end gap-4 sm:gap-7 px-3">

                {[45, 62, 50, 75, 68, 88, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >

                      <div className="w-full flex items-end h-44">

                        <div
                          className="w-full green-bg-container rounded-t-lg hover:bg-[#103d2c] transition"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <span className="text-xs text-gray-400">
                        {[
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                        ][index]}
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* Placement Status */}
            <div className="chalk-bg-container rounded-2xl border border-gray-100 shadow-sm p-6">

              <h2 className="font-bold text-[#103d2c]">
                Placement Status
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Current student status
              </p>

              <div className="flex justify-center py-6">

                <div className="w-40 h-40 rounded-full border-[18px]  border-r-[#dce9dd] border-b-[#dce9dd] flex items-center justify-center">

                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#103d2c]">
                      68%
                    </p>

                    <p className="text-xs text-gray-400">
                      Placed
                    </p>
                  </div>

                </div>

              </div>

              <div className="space-y-3">

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full moss-bg-container" />
                    Placed
                  </span>

                  <span className="font-semibold">68%</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full gray-bg-container" />
                    Not Placed
                  </span>

                  <span className="font-semibold">32%</span>
                </div>

              </div>

            </div>

          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Drives */}
            <div className="chalk-bg-container rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="p-5 flex items-center justify-between border-b border-gray-100">

                <div>
                  <h2 className="font-bold text-[#103d2c]">
                    Recent Placement Drives
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Latest company drives
                  </p>
                </div>

                <button className="text-xs font-semibold text-[#52745a] py-1 px-2">
                  View All
                </button>

              </div>

              <div className="divide-y divide-gray-100">

                {recentDrives.map((drive) => (
                  <div
                    key={drive.company}
                    className="p-4 flex items-center gap-3"
                  >

                    <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center shrink-0">
                      <Building2
                        size={18}
                        className="text-[#52745a]"
                      />
                    </div>

                    <div className="flex-1 min-w-0">

                      <h3 className="text-sm font-semibold text-[#103d2c]">
                        {drive.company}
                      </h3>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {drive.role}
                      </p>

                    </div>

                    <div className="text-right">

                      <span
                        className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                          drive.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : drive.status === "Upcoming"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {drive.status}
                      </span>

                      <p className="text-[11px] text-gray-400 mt-1">
                        {drive.students} students
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Applications */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="p-5 flex items-center justify-between border-b border-gray-100">

                <div>
                  <h2 className="font-bold text-[#103d2c]">
                    Recent Applications
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Latest student applications
                  </p>
                </div>

                <button className="text-xs font-semibold text-[var(--moss)] px-2 py-1">
                  View All
                </button>

              </div>

              <div className="divide-y divide-gray-100">

                {recentApplications.map((application) => (
                  <div
                    key={application.name}
                    className="p-4 flex items-center gap-3"
                  >

                    <div className="w-10 h-10 rounded-full bg-[#dce9dd] text-[#103d2c] flex items-center justify-center text-sm font-bold">
                      {application.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">

                      <h3 className="text-sm font-semibold text-[#103d2c]">
                        {application.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {application.company} • {application.role}
                      </p>

                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                        application.status === "Shortlisted"
                          ? "bg-green-50 text-green-600"
                          : application.status === "Applied"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {application.status}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-7">

            <h2 className="text-lg font-bold text-[#103d2c] mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <button className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition">

                <Plus
                  size={20}
                  className="text-[#52745a]"
                />

                <p className="font-semibold text-[#103d2c] mt-3">
                  Add Company
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Register a new company
                </p>

              </button>

              <button className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition">

                <BriefcaseBusiness
                  size={20}
                  className="text-[#52745a]"
                />

                <p className="font-semibold text-[#103d2c] mt-3">
                  Create Drive
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Publish placement drive
                </p>

              </button>

              <button className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition">

                <Megaphone
                  size={20}
                  className="text-[#52745a]"
                />

                <p className="font-semibold text-[#103d2c] mt-3">
                  Announcement
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Notify students
                </p>

              </button>

              <button className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md transition">

                <BarChart3
                  size={20}
                  className="text-[#52745a]"
                />

                <p className="font-semibold text-[#103d2c] mt-3">
                  Generate Report
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  View placement reports
                </p>

              </button>

            </div>

          </div>

        </div>
      <AddData/>
      </main>
</div>
    </div>

  );
};

export default AdminPanel;