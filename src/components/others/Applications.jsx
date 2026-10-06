import React from 'react'
import Companies_application from './Companies_application'

const Applications = () => {
  return (
    <>
    <section className='flex my-5 gap-2 mx-auto w-[70%] items-center '>
      <div className=' w-1/3 py-10 gold-border moss-bg-container chalk rounded-2xl font-bold text-3xl flex flex-col items-center justify-center gap-2'><spam className='text-5xl'>5</spam> Accepted</div>
      <div className=' w-1/3 py-10 gold-border green-bg-container chalk rounded-2xl font-bold text-3xl flex flex-col items-center justify-center gap-2'><spam className='text-5xl'>2</spam> Shortlisted</div>
      <div className=' w-1/3 py-10 gold-border red-bg-container chalk rounded-2xl font-bold text-3xl flex flex-col items-center justify-center gap-2'><spam className='text-5xl'>3</spam>Rejected</div>
      </section>
      <Companies_application/>
    </>
  )
}

export default Applications