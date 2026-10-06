import React from "react";
import {
  Brain,
  Code2,
  FileText,
  Users,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Trophy,
} from "lucide-react";

const PrepHub = () => {
  const preparation = [
    {
      id: 1,
      title: "Aptitude",
      description:
        "Practice quantitative aptitude, logical reasoning and verbal ability for placement tests.",
      icon: Brain,
      progress: 65,
      topics: "12 Topics",
    },
    {
      id: 2,
      title: "Coding & DSA",
      description:
        "Improve problem-solving skills with coding questions and common DSA concepts.",
      icon: Code2,
      progress: 45,
      topics: "18 Topics",
    },
    {
      id: 3,
      title: "Technical Interview",
      description:
        "Prepare important technical concepts commonly asked during placement interviews.",
      icon: BookOpen,
      progress: 30,
      topics: "10 Topics",
    },
    {
      id: 4,
      title: "HR Interview",
      description:
        "Practice common HR questions and improve your interview communication.",
      icon: Users,
      progress: 20,
      topics: "8 Topics",
    },
    {
      id: 5,
      title: "Resume Preparation",
      description:
        "Build and improve your resume before applying to placement drives.",
      icon: FileText,
      progress: 70,
      topics: "6 Resources",
    },
    {
      id: 6,
      title: "Mock Tests",
      description:
        "Test your preparation with placement-style aptitude and technical assessments.",
      icon: ClipboardCheck,
      progress: 40,
      topics: "15 Tests",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl green-bg-container flex items-center justify-center">
              <BookOpen size={21} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#103d2c]">
                Prep Hub
              </h1>

              <p className="text-gray-500 mt-1">
                Prepare yourself for upcoming placement opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Preparation Overview */}
        <div className="bg-[#103d2c] rounded-2xl p-6 mb-7 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>
              <p className="text-sm text-[var(--moss)] font-medium">
                YOUR PREPARATION
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Keep building your placement skills
              </h2>

              <p className="text-sm text-gray-800 mt-2 max-w-xl">
                Practice regularly to improve your aptitude, coding,
                technical and interview preparation before placement drives.
              </p>
            </div>

            <div className="shrink-0 w-32 h-32 rounded-full border-8 border-white/10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold green">48%</p>
                <p className="text-xs moss">
                  Overall Progress
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Topics Completed
                </p>
                <h3 className="text-2xl font-bold text-[#103d2c] mt-1">
                  24
                </h3>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                <CheckCircle2 size={19} className="text-[#52745a]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Mock Tests
                </p>
                <h3 className="text-2xl font-bold text-[#103d2c] mt-1">
                  8
                </h3>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                <ClipboardCheck size={19} className="text-[#52745a]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Practice Hours
                </p>
                <h3 className="text-2xl font-bold text-[#103d2c] mt-1">
                  18h
                </h3>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                <Clock3 size={19} className="text-[#52745a]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Average Score
                </p>
                <h3 className="text-2xl font-bold text-[#103d2c] mt-1">
                  76%
                </h3>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                <Trophy size={19} className="text-[#52745a]" />
              </div>
            </div>
          </div>

        </div>

        {/* Preparation Areas */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#103d2c]">
              Preparation Areas
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Choose an area and start practicing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {preparation.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
              >

                <div className="flex items-start justify-between">

                  <div className="w-11 h-11 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                    <Icon
                      size={21}
                      className="text-[#52745a]"
                    />
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    {item.topics}
                  </span>

                </div>

                <h3 className="text-lg font-bold text-[#103d2c] mt-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-6">
                  {item.description}
                </p>

                {/* Progress */}
                <div className="mt-5">

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                      Progress
                    </span>

                    <span className="text-xs font-semibold text-[#52745a]">
                      {item.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#52745a] rounded-full"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />
                  </div>

                </div>

                {/* Button */}
                <button className="w-full mt-5 flex items-center justify-center gap-2 green-bg-container text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0c3023] transition">
                  Start Preparation
                  <ArrowRight size={16} />
                </button>

              </div>
            );
          })}

        </div>

        {/* Daily Practice */}
        <div className="mt-7 bg-white border border-gray-100 rounded-2xl p-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 rounded-xl bg-[#e6eee7] flex items-center justify-center shrink-0">
                <Trophy
                  size={20}
                  className="text-[#52745a]"
                />
              </div>

              <div>
                <h3 className="font-bold text-[#103d2c]">
                  Daily Practice
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Solve at least 5 questions every day to maintain
                  your preparation streak.
                </p>
              </div>

            </div>

            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#e6eee7] text-[#103d2c] rounded-xl text-sm font-semibold hover:bg-[#dbe7dc] transition">
              Start Practice
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PrepHub;