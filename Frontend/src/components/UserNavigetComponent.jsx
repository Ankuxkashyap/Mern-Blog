import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth';
import { motion } from 'framer-motion';

export const UserNavigetComponent = () => {
    const user = useAuthStore((state) => state.user);
    const {logout} = useAuthStore();
  return (
    <>
    
    <motion.div 
        initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
     className= 'absolute top-8 right-10 bg-white rounded-lg z-1 shadow-lg flex items-center flex-col w-35'>
        <Link
            to="/editer"
            className="flex items-center w-full p-2 gap-2 text-gray-500 hover:bg-gray-100 rounded border-b border-gray-200"
            >
            <FaRegEdit />
            <p>write</p>
        </Link>

        
        <Link 
            to= {`users/${user?.username}`}
            className="flex items-center w-full p-2 gap-2 text-gray-500 hover:bg-gray-100  rounded border-b border-gray-200"
            >
                Profile
        </Link>
         <Link 
            to= {'/dashboard/blogs'}
            className="flex items-center w-full p-2 gap-2 text-gray-500 hover:bg-gray-100  rounded border-b border-gray-200"
            >
                Dashboard
        </Link>

        <Link 
            to= {'/settings/edit-profile'}
            className="flex items-center w-full p-2 gap-2 text-gray-500 hover:bg-gray-100  rounded border-b border-gray-200"
            >
                Settings
        </Link>

        <button className='text-left p-2 hover:bg-gray-100 w-full cursor-pointer'
        onClick={()=>{logout()}}
        >
            <h1 className='text-red-500 text-lg mg-1'>Sing Out</h1>
            <p className='text-gray-800'>@{user?.username}</p>
        </button>
        
    </motion.div>
    
    </>
  )
}
