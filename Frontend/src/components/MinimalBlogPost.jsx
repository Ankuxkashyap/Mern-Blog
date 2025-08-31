import React from "react";
import { Link } from "react-router-dom";

export const MinimalBlogPost = ({ blog, index }) => {
  const {
    title,
    blog_id: id,
    author: {
      personalInfo: { profile_img, fullName, username },
    },
    publishedAt,
  } = blog;

  return (
    <Link to={`blog/${id}`} className="flex gap-5 mb-6 ml-7">
      <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-gray-300 leading-none">
        {index < 9 ? `0${index + 1}` : index + 1}
      </h1>
      
      <div className="flex flex-col gap-2">
        
        <div className="flex gap-2 items-center text-sm text-gray-500">
          <img
            src={profile_img}
            alt={fullName}
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1 text-gray-700">
            {fullName} @{username}
          </p>
          <span className="text-gray-600">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-medium leading-snug text-black line-clamp-2">
          {title}
        </h1>
      </div>
    </Link>
  );
};
