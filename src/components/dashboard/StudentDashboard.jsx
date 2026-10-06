import React from 'react'
import Header from '../others/Header'
import StudentMenu from '../others/StudentMenu'
import Stu_dash from '../others/Stu_dash'
import Drives from '../others/Drives'
import Applications from '../others/Applications'
import Announcements from '../others/Announcements'
import PrepHub from '../others/PrepHub'


const StudentDashboard = () => {
  return (
    <>
    <section className='chalk-bg-container h-screen '>
        <Header/> 
        <StudentMenu/>
        <Stu_dash/>
        <Drives/>
        <Applications/>
        <Announcements/>
        <PrepHub/>
        </section>
    </>
  )
}

export default StudentDashboard;