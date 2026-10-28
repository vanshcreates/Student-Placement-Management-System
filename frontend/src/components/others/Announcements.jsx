import { useContext, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Megaphone,
  X,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Announcements = () => {
  const { announcements } = useContext(AuthContext);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  return (
    <section className="min-h-screen bg-[var(--chalk)] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl green-bg-container">
              <Megaphone size={21} className="text-[var(--chalk)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--pine)]">Announcements</h1>
              <p className="mt-1 text-gray-500">Updates from the placement cell</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl green-bg-container px-4 py-2.5">
            <Bell size={17} className="text-[var(--chalk)]" />
            <span className="text-sm font-semibold text-[var(--chalk)]">
              {announcements.length} {announcements.length === 1 ? "Announcement" : "Announcements"}
            </span>
          </div>
        </header>

        {announcements.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <Bell size={28} className="mx-auto text-[var(--moss)]" />
            <h2 className="mt-3 text-lg font-semibold text-[var(--pine)]">
              No announcements yet
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Updates about new companies and placement drives will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--chalk)]">
                    <Bell size={21} className="text-[var(--moss)]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="inline-flex rounded-full bg-[var(--chalk)] px-2.5 py-1 text-xs font-semibold text-[var(--pine)]">
                      {announcement.category}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-[var(--pine)]">
                      {announcement.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {announcement.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-gray-500">
                      {announcement.date && (
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {announcement.date}
                        </span>
                      )}
                      {announcement.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {announcement.time}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAnnouncement(announcement)}
                    className="flex shrink-0 items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--pine)] transition hover:bg-[var(--chalk)]"
                  >
                    View Details
                    <ChevronRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedAnnouncement(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-detail-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-[var(--chalk)] px-2.5 py-1 text-xs font-semibold text-[var(--pine)]">
                  {selectedAnnouncement.category}
                </span>
                <h2
                  id="announcement-detail-title"
                  className="mt-3 text-xl font-bold text-[var(--pine)]"
                >
                  {selectedAnnouncement.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close announcement details"
                onClick={() => setSelectedAnnouncement(null)}
                className="rounded-lg p-2 text-[var(--pine)] hover:bg-[var(--chalk)]"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {selectedAnnouncement.description}
            </p>

            {(selectedAnnouncement.date || selectedAnnouncement.time) && (
              <div className="mt-5 flex flex-wrap gap-5 border-t pt-4 text-sm text-gray-500">
                {selectedAnnouncement.date && (
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {selectedAnnouncement.date}
                  </span>
                )}
                {selectedAnnouncement.time && (
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {selectedAnnouncement.time}
                  </span>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </section>
  );
};

export default Announcements;
