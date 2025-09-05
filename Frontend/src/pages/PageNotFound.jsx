import React from 'react'
import pangeNotfound from "../assets/404.png"
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <section className='min-h-[calc(100vh-80px)] p-10 flex flex-col items-center gap-20 text-cernter'>
        <img src={pangeNotfound} className='select-none border-2 border-gray-200 w-72 aspect-square object-cover rounded' />
        <h1 className='text-4xl font-mono leading-7'>Page not found</h1>
        <p className='text-gray-800 text-xl leading-7 -mt-8'> The page you are looking for does not exists. Head back to the <Link to='/' className="text-black underline " >home page</Link></p>
        <div className='mt-auto'>
            <img src="" alt=""  className='h-8 object-contain mx-auto select-none'/>
            <p className='mt-5 text-gray-800'>Read millons of stories around the world</p>
        </div>
    </section>
  )
}
