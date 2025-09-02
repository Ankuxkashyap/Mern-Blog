import React from 'react'
import { FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom';

export const BLogPostCard = ({ content, author }) => {
  const { title, banner, dis, tags, activity, publishedAt, blog_id: id } = content;
  const { profile_img, fullName, username } = author;

  return (
    <Link 
      to={`/blog/${id}`} 
      className="lg:w-[1000px] md:w-[700px] w-full md:ml-5 flex items-start justify-between gap-4 border-b border-gray-200 pb-5 mb-4"
    >
      
      <div className="flex-1 min-w-0">
      
        <div className="flex gap-2 items-center mb-2">
          <img src={profile_img} className="w-7 h-7 rounded-full" alt={fullName}/>
          <p className="line-clamp-1 text-sm md:text-lg">{fullName} @{username}</p>
          <p className="text-sm md:text-lg text-center text-gray-500">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>


        <h1 className="text-2xl font-serif leading-6 line-clamp-2">{title}</h1>


        <p className="mt-2 mb-4 text-gray-600 text-xl font-serif hidden md:line-clamp-2">
          {dis}
        </p>

        <div className="flex gap-4 mt-3">
          {tags?.length > 0 && (
            <span className="px-2 py-1 bg-gray-200 rounded-lg text-[16px]">
              {tags[0]}
            </span>
          )}
          <span className="flex items-center gap-1 text-sm text-gray-700">
            <FcLike className="text-lg" /> {activity?.total_likes || 0}
          </span>
        </div>
      </div>


      <div className="w-28 h-20 md:w-32 md:h-24 flex-shrink-0">
        <img
          src={banner}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </Link>
  );
};
