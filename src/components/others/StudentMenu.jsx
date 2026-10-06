import React from 'react'

const StudentMenu = () => {
  return (
    <nav className='h-12 px-55 flex items-center gap-2 justify-around font-bold chalk studentnav' style={{backgroundColor: 'var(--moss)' }}>
        <a href="">Dashboard</a>
        <a href="">Drives</a>
        <a href="">My Applications</a>
        <a href="">Announcements</a>
        <a href="">Prep Hub</a>
    </nav>
  )
}

export default StudentMenu