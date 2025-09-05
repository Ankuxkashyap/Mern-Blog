import React from 'react'
import { Link } from 'react-router-dom'

export const UserCard = ({user}) => {
    const {username,fullName,profile_img} = user;

  return (
    <Link to={`/user/${username}`} className='flex gap-5 items-center mb-5'>
        <img src={profile_img} className='w-14 h-14 rounded-full' />
        <div>
            <h1 className='font-medium text-lg line-clamp-2'>{fullName}</h1>
            <p className='text-gray-500 '> @{username}</p>
        </div>
    </Link>
  )
}
