import React from 'react'

const Header = () => {
  return (
    <>
    <header className=' h-30 green-bg-container px-20 flex items-center justify-center'>
      <div className='w-4/5 flex items-center justify-between'>
        <div className='flex items-center'>
        <div className='border-amber-500 border-2 rounded-full h-25 w-25'><img src="" alt="" /></div>
        <div className='flex flex-col items-baseline mx-5'>
      <h4 className=' text-xl text-gray-400'>Hello! <br /><spam className='chalk text-2xl font-bold'>Vansh</spam></h4>
      <p className='chalk'>Btech 2023 B | CGPA - 8.79 | 7th Sem</p>
      </div>
      </div>
        <button className='py-2 px-4 font-bold'>Logout</button>
        </div>
    </header>
    </>
  )
}

export default Header