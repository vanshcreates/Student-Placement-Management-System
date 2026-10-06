import React from "react";
import {
  Bell,
  CalendarDays,
  Clock3,
  ChevronRight,
  Pin,
  Megaphone,
} from "lucide-react";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "TCS Placement Drive 2026",
      description:
        "TCS has announced a placement drive for eligible students. Students meeting the eligibility criteria can register before the deadline.",
      category: "Placement Drive",
      date: "06 Oct 2026",
      time: "10:30 AM",
      important: true,
    },
    {
      id: 2,
      title: "Resume Verification Deadline",
      description:
        "All students participating in upcoming placement drives must submit their updated resume for verification through the placement cell.",
      category: "Important",
      date: "07 Oct 2026",
      time: "04:00 PM",
      important: true,
    },
    {
      id: 3,
      title: "Pre-Placement Talk by Infosys",
      description:
        "Infosys will conduct a pre-placement talk covering the recruitment process, job roles and selection procedure.",
      category: "Event",
      date: "08 Oct 2026",
      time: "11:00 AM",
      important: false,
    },
    {
      id: 4,
      title: "Aptitude Test Schedule Released",
      description:
        "The aptitude test schedule for the upcoming placement season has been released. Students are advised to check their reporting time.",
      category: "Assessment",
      date: "09 Oct 2026",
      time: "09:30 AM",
      important: false,
    },
    {
      id: 5,
      title: "Placement Cell Orientation",
      description:
        "An orientation session will be conducted for students participating in campus placements this year.",
      category: "General",
      date: "11 Oct 2026",
      time: "02:00 PM",
      important: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6ef] px-6 py-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">

          <div>
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl  green-bg-container flex items-center justify-center">
                <Megaphone
                  size={21}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-[#103d2c]">
                  Announcements
                </h1>

                <p className="text-gray-500 mt-1">
                  Latest updates from the placement cell
                </p>
              </div>

            </div>
          </div>

          <div className="mt-5 md:mt-0 flex items-center ounded-full green-bg-container gap-2 px-4 py-2.5 rounded-xl border shadow-sm">

            <Bell
              size={17}
              className="text-[var(--chalk)]"
            />

            <span className="text-sm font-semibold text-[var(--chalk)]">
              {announcements.length} Announcements
            </span>

          </div>

        </div>


        {/* Important Notice */}
        <div className="bg-[#103d2c] rounded-2xl p-6 mb-7 text-white">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-full green-bg-container flex items-center justify-center shrink-0">
              <Pin size={19} />
            </div>

            <div>

              <div className="flex items-center gap-2 mb-1">

                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--moss)]">
                  Important Notice
                </span>

              </div>

              <h2 className="text-xl font-bold">
                Keep your placement profile updated
              </h2>

              <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                Students are advised to keep their academic details,
                contact information and resume updated before applying
                to placement drives.
              </p>

            </div>

          </div>

        </div>


        {/* Announcement List */}

        <div className="space-y-4">

          {announcements.map((announcement) => (

            <div
              key={announcement.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
            >

              <div className="flex flex-col md:flex-row md:items-center gap-5">

                {/* Icon */}

                <div className="w-12 h-12 rounded-xl bg-[#e6eee7] flex items-center justify-center shrink-0">

                  <Bell
                    size={21}
                    className="text-[#52745a]"
                  />

                </div>


                {/* Content */}

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2 mb-2">

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[var(--moss)]">
                      {announcement.category}
                    </span>

                    {announcement.important && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-red-600">
                        Important
                      </span>
                    )}

                  </div>


                  <h2 className="text-lg font-bold text-[var(--moss)]">
                    {announcement.title}
                  </h2>


                  <p className="text-sm text-gray-500 mt-1 max-w-3xl">
                    {announcement.description}
                  </p>


                  <div className="flex flex-wrap items-center gap-5 mt-3">

                    <div className="flex items-center gap-1.5 text-xs text-gray-400">

                      <CalendarDays size={14} />

                      {announcement.date}

                    </div>


                    <div className="flex items-center gap-1.5 text-xs text-gray-400">

                      <Clock3 size={14} />

                      {announcement.time}

                    </div>

                  </div>

                </div>


                {/* Action */}

                <button className="flex items-center justify-center gap-1 p-2 text-sm font-semibold text-[#52745a] hover:text-[#103d2c] transition">

                  View Details

                  <ChevronRight size={17} />

                </button>

              </div>

            </div>

          ))}

        </div>


        {/* Bottom info */}

        <div className="mt-7 bg-white rounded-2xl p-5">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg flex items-center justify-center">

              <Bell
                size={18}
                className="text-[var(--pine)]"
              />

            </div>

            <div>

              <h3 className="font-semibold text-[#103d2c]">
                Stay updated
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Check this section regularly for new placement
                announcements from the college placement cell.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Announcements;