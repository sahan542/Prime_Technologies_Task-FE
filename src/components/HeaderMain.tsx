import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";



const HeaderMain = () => {
  return (
    <div className='border-b border-gray-200 py-6 bg-white'>
        <div className='container sm:flex justify-between items-center'>
            <div className='font-bold text-4xl text-center pb-4 sm:pb-0 text-yellow-600'>
                Logo
            </div>
            <div className='w-full sm:w-[300px] md:w-[70%] relative'>
                <input className='border-gray-200 border- p-2 px-4 rounded-lg w-full' type='text' placeholder='Enter any product name..' />
                <CiSearch className='absolute right-0 top-0 mr-3 mt-3 text-gray-400' size={20}/>
            </div>

            <div className='hidden lg:flex gap-4 text-gray-500 text-[20px]'>
                <FaUser />
            </div>

        </div>
    </div>
  )
}

export default HeaderMain