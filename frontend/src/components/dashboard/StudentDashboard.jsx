import { useState } from "react"
import Header from '../others/Header'
import StudentMenu from '../others/StudentMenu'
import Stu_dash from '../others/Stu_dash'
import Drives from '../others/Drives'
import Applications from '../others/Applications'
import Announcements from '../others/Announcements'


const StudentDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState("Dashboard")

  return (
    <section className='chalk-bg-container min-h-screen'>
      <Header user={user} onLogout={onLogout} />
      <StudentMenu
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main>
        {activeSection === "Dashboard" && (
          <Stu_dash user={user} onNavigate={setActiveSection} />
        )}
        {activeSection === "Drives" && <Drives user={user} />}
        {activeSection === "My Applications" && <Applications />}
        {activeSection === "Announcements" && <Announcements />}
      </main>
    </section>
  )
}

export default StudentDashboard;