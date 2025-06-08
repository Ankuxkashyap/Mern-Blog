import React from 'react'
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";

const InputBox = (name,type,placeholder,value,id,icons) => {
  return (
    <div className='relative w-[100%] mb-4 flex items-center justify-center'>
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            className='w-[400px]  rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black'
        />
        {type === "email" ? (
            <MdEmail className=' absolute left-25 text-3xl top-1/2 -translate-y-1/2 '/>
        ) : type === "password" ? (
            <IoKeyOutline className =" absolute left-25 text-3xl top-1/2 -translate-y-1/2"/>
        ) : (
            <CiUser className='absolute top-1/2 -translate-y-1/2 text-2xl text-gray-600  md:left-[150px] sm:left-[100px] left-[18px] lg:left-[510px]' />
        )}
    
        {/* <CiUser className=' absolute left-25 text-3xl top-1/2 -translate-y-1/2' />
        <MdEmail className=' absolute left-25 text-3xl top-1/2 -translate-y-1/2 '/>
        <IoKeyOutline className =" absolute left-25 text-3xl top-1/2 -translate-y-1/2"/> */}
    </div>
  )
}

export default InputBox