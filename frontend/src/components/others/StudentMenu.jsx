const sections = ["Dashboard", "Drives", "My Applications", "Announcements"]

const StudentMenu = ({ activeSection, onSectionChange }) => {
  return (
    <nav
      aria-label="Student sections"
      className='flex min-h-12 flex-wrap items-center justify-around gap-2 px-4 font-bold studentnav'
      style={{ backgroundColor: "var(--moss)" }}
    >
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          aria-current={activeSection === section ? "page" : undefined}
          onClick={() => onSectionChange(section)}
          className={`rounded-lg px-4 py-2 border-0 transition ${
            activeSection === section
              ? "bg-[var(--chalk)] text-[var(--pine)]"
              : "bg-[var(--pine)] text-[var(--chalk)] hover:bg-[var(--ink)]"
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  )
}

export default StudentMenu