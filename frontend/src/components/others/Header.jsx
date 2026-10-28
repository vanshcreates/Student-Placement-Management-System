import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Header = ({ user, onLogout }) => {
  const { students } = useContext(AuthContext)
  const student = students.find((account) => account.email === user?.email)

  return (
    <>
    <header className=' h-30 green-bg-container px-20 flex items-center justify-center'>
      <div className='w-4/5 flex items-center justify-between'>
        <div className='flex items-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-500 chalk text-2xl font-bold'>
          {student?.name?.charAt(0) || 'S'}
        </div>
        <div className='flex flex-col items-baseline mx-5'>
      <h4 className=' text-xl text-gray-400'>Hello! <br /><span className='chalk text-2xl font-bold'>{student?.name || 'Student'}</span></h4>
      <p className='chalk'>{student?.course || student?.branch || 'Student'} | CGPA - {student?.cgpa ?? '—'}</p>
      </div>
      </div>
        <button onClick={onLogout} className='py-2 px-4 font-bold'>Logout</button>
        </div>
    </header>
    </>
  )
}

export default Header