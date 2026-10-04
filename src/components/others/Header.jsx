import React from 'react'

const Header = () => {
  return (
    <>
    <header className='w-100% h-30 chalk-bg-container px-20 flex items-center justify-between'>
        <div className='flex items-center'>
        <div className='border-amber-500 border-2 rounded-full h-25 w-25'></div>
      <h4 className='m-5 text-3xl text-gray-500 font-bold'>Hello! <br /><spam className='text-amber-900'>Vansh</spam></h4></div>
        <button className='py-2 px-4'>Logout</button>
    </header>
    </>
  )
}

export default Header