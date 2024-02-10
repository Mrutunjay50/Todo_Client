import React from 'react'
import { Add, EDIT, MEMOPAD } from '../../../assets'

const FeatureCard = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-5 pt-10 md:-ml-12 '>
    <div className=' w-[280px] md:w-[300px] relative h-[380px] md:h-[500px] bg-[#4b4a4a] shadow-md shadow-[#131313] rounded-md flex flex-col pl-3 pt-3'>
        <p className='md:text-[28px] mb-10 drop-shadow-md'>#feature 1</p>
        <img src={MEMOPAD} className='absolute right-4'/>
        <p className='md:text-[20px] p-2 drop-shadow-md'>
            # See all notes and filter by pending, completed, or view all.
            <br />
            # Sort notes in ascending or descending order based on title.
        </p>
        <div className='flex flex-row items-center justify-center gap-3 absolute bottom-4 right-4'>
        <div className='w-[40px] h-[20px] bg-red-700 rounded-t-md rounded-sm shadow-sm shadow-[#131313]'></div>
        <div className='w-[40px] h-[20px] bg-green-500 rounded-b-md rounded-sm shadow-sm shadow-[#131313]'></div>
        <div className='w-[40px] h-[20px] bg-orange-500 rounded-t-md rounded-sm shadow-sm shadow-[#131313]'></div>
        </div>
    </div>

    <div className='w-[280px] md:w-[300px] relative h-[380px] md:h-[500px] bg-[#4b4a4a] shadow-md shadow-[#131313] rounded-md flex flex-col items-center pt-3'>
        <p className='md:text-[28px] mb-10 drop-shadow-md'>#feature 2</p>
        <img src={EDIT} className='absolute right-4'/>
        <p className='md:text-[20px] p-2 drop-shadow-md'>
            # Create, read, update, and delete main notes.
            <br />
            # Create, read, update, and delete subnotes.
            <br />
            # Hierarchy support: Main notes can have associated subnotes.
        </p>
        <div className='flex flex-row items-center justify-center gap-3 absolute bottom-4 right-4'>
        <div className='w-[40px] h-[20px] bg-red-700 rounded-t-md rounded-sm shadow-sm shadow-[#131313]'></div>
        <div className='w-[40px] h-[20px] bg-green-500 rounded-b-md rounded-sm shadow-sm shadow-[#131313]'></div>
        <div className='w-[40px] h-[20px] bg-orange-500 rounded-t-md rounded-sm shadow-sm shadow-[#131313]'></div>
        </div>
    </div>

    <div className='w-[280px] md:w-[300px] relative h-[380px] md:h-[500px] bg-[#4b4a4a] shadow-md shadow-[#131313] rounded-md flex flex-col items-center pt-3'>
        <p className='md:text-[28px] mb-10 drop-shadow-md'>#feature 3</p>
        <img src={Add} className='absolute right-4'/>
        <p className='md:text-[20px] p-2 drop-shadow-md'>
            # Update the status of main notes and subnotes.
            <br />
            # If all subnotes in a main note are complete, the main note updates to complete.
            <br />
            # If the main note status is complete, all subnotes' statuses are set to complete.
            <br />
            # Vice versa for status updates.
        </p>
        <div className='flex flex-row items-center justify-center gap-3 absolute bottom-4 right-4'>
        <div className='w-[40px] h-[20px] bg-red-700 rounded-t-md rounded-sm shadow-sm shadow-[#131313]'></div>
        <div className='w-[40px] h-[20px] bg-green-500 rounded-b-md rounded-sm shadow-sm shadow-[#131313]'></div>
        <div className='w-[40px] h-[20px] bg-orange-500 rounded-t-md rounded-sm shadow-sm shadow-[#131313]'></div>
        </div>
    </div>
</div>

  )
}

export default FeatureCard