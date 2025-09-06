import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import { BLogPostCard } from "../components/BLogPostCard";
import {BlogInteraction} from '../components/BlogInteraction'
import {BlogContent} from '../components/BlogContent'

export const BlogPage = () => {
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const user = useAuthStore((state) => state.user);
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  // console.log(blog.content);
  const fetchBlogById = async () => {
    try {
      const res = await axios.post("/blog/blog_id", { blog_id });
      setBlog(res.data.blog);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  const fetchBlogBySearch = async (tags) => {
    try {
      const res = await axios.post("/blog/blog-search", {
        tag: tags[0],
        eliminate_blog: blog_id,
      });
      setSimilarBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, [blog_id]);

  
  useEffect(() => {
    if (blog?.tags?.length) {
      fetchBlogBySearch(blog.tags);
    }
  }, [blog]);

  if (!blog) {
    return (
      <p className="w-full p-4 text-center rounded-full bg-gray-400 text-lg text-black">
        Loading blog...
      </p>
    );
  }

  const {
    title,
    content,
    banner,
    author: {
      personalInfo: { username: uName, fullName, profile_img },
    },
    activity,
    publishedAt,
    tags,
  } = blog;
  // console.log(content)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4"
    >
      <div className="max-w-[900px] md:ml-120 center py-10 max-lg:px-[5vw]">
        <img src={banner} className="aspect-video" />
        <h1 className="text-2xl mt-4">{title}</h1>

        <div className="flex max-sm:flex-col justify-between my-8">
          <div className="flex gap-5 items-start">
            <img src={profile_img} className="w-12 h-12 rounded-full" />
            <p className="capitalize">
              {fullName}
              <br />
              @
              <Link to={`/user/${uName}`}>{uName}</Link>
            </p>
          </div>
          <p className="text-gray-500 opacity-75 max-sm:mt-5 max-sm:ml-12 max-sm:pl-5">
            Published on{" "}
            {new Date(publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>

        <hr className="border-gray-200 my-2" />
        <div className="flex gap-6 justify-between">
          <div className="flex gap-3 items-center">
            <button className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100">
              <i className="text-lg font-bold">
                <FaRegHeart />
              </i>
            </button>
            {activity.total_likes}
            <button className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100">
              <i className="text-lg">
                <FaRegComment />
              </i>
            </button>
            {activity.total_comments}
          </div>

          <div className="flex gap-6 items-center">
            {user.username === uName ? (
              <Link to={`/editer/${blog_id}`}>Edit</Link>
            ) : (
              " "
            )}
          </div>
        </div>
        <hr className="border-gray-200 my-2" />



              {
                content[0].blocks.map((block,i)=>{
                  return(
                    <div key={i} className="my-4 md:my-8">
                        <BlogContent block={block}/>
                    </div>
                  )
                })
              }


        <div className="w-full">
        {similarBlogs?.length > 0 && (
          <>
            <h1 className="text-xl mt-4 font-medium">Similar Blogs</h1>
            <div className="">
            {similarBlogs.map((b, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-4"
                >
                  <BLogPostCard
                    content={b}
                    author={b.author.personalInfo}
                  />
                </motion.div>
              );
            })}
            </div>
          </>
        )}
        </div>
      </div>
    </motion.div>
  );
};
