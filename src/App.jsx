import React from 'react'
import './index.css'
import Login from './components/Auth/Login'
import StudentDashboard from './components/dashboard/StudentDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'

const App = () => {
  return (
    <>
    {/* <Login/> */}
    {/* <StudentDashboard/> */}
    <AdminDashboard/>
    </>
  )
}

export default App
