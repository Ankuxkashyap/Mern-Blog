import React from "react";
import { Link } from "react-router-dom";

export const MinimalBlogPost = ({ blog, index }) => {
if (!blog) return null;

  // Destructure required fields from blog
  const {
    title,
    blog_id: id,
    author: {
      personalInfo: { profile_img, fullName, username } = {},
    } = {},
    publishedAt,
  } = blog;


  return (
    <Link to={`blog/${id}`} className="flex gap-5 mb-5">
      
      <h1 className="text-4xl font-semibold text-gray-300 leading-none">
        {index < 9 ? `0${index + 1}` : index + 1}
      </h1>
      
      <div className="flex flex-col ">
        
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
            })}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-serif leading-snug text-black line-clamp-2">
          {title}
        </h1>
      </div>
    </Link>
  );
};
