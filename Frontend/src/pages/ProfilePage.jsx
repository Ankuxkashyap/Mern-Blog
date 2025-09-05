import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useAuthStore} from '../store/auth'
import { AboutUser } from "../components/AboutUser";
import { InPageNavigection } from "../components/InPageNavigection";
import {motion} from 'framer-motion'
import { BLogPostCard } from "../components/BLogPostCard";

export const ProfilePage = () => {
  const { id: username } = useParams();
  const [profile, setProfile] = useState(null);
  const [blogs,setBlogs] = useState([])

  const user = useAuthStore((state)=>state.user)

  const fetchUser = async () => {
    try {
      const res = await axios.post("/users/user-profile", { username });
      if (res.data.user && res.data.user.length > 0) {
        setProfile(res.data.user[0]); 
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const getBlog  =  async({user_id})=>{
        try{
          const res = await axios.post('/blog/blog-search',{author:user_id});
          setBlogs(res.data.blogs)
        }catch(err){
          console.log(err);
        }
  }


  useEffect(() => {
    if (username) fetchUser();
    getBlog(user.id)
  }, [username]);
  console.log(profile)

 if (!profile) return (
  <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>
);
 

    const {
  personalInfo: { username: uName, fullName, profile_img, bio },
  account_info: { total_posts, total_reads },
  social_links: { facebook, github, instagram, twitter, website, youtube },
  joinedAt
} = profile;


  return (
    <>
      <section className="min-h-[calc(100vh-80px)] md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
        <div className="flex flex-col max-md:items-center gap-5 min-w-[250px]">
            <img src={profile_img} className=" w-48 h-48 bg-gray-100 rounded-full md:w-32 md:h-32 mt-4"/>
            <h1 className=" text-2xl font-medium">@{uName}</h1>
            <p className="text-xl capitalize h-6">{fullName}</p>
            <p className="">{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()}  Reads </p>

            <div className="flex gap-4  mt-2">
                {
                    user.username == uName ? 
                    <Link to='/setting/edit-profile' className="bg-gray-300 p-3 rounded-md">Edit Profile</Link>
                   : " "
                }
            </div>
            <AboutUser
            bio={bio}
            joinedAt={joinedAt}
            className={" max-md:hidden "}
            links={{
              facebook : 'https://facebook.com',
              github:"https://github.com",
              instagram:"https://instagram.com",
              twitter,
              website,
              youtube : "https://youtube.com",
            }}
            />
            </div>
            <div className="max-md:mt-12 md:w-[70%] w-[95%]">
              <InPageNavigection routes={["Blogs Publish","About"]}>
                <>
                    <div className="flex flex-col ml-5 gap-6">
                  {blogs.length > 0 ? (
                    blogs.map((blog, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        key={i}
                      >
                        <BLogPostCard
                          content={blog}
                          author={blog.author.personalInfo}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <p className=" w-full p-4 text-center rounded-full  bg-gray-400 text-lg  text-black">No blogs available</p>

                  )}
                </div>
                </>
                <AboutUser
            bio={bio}
            joinedAt={joinedAt}
            className={" flex items-center flex-col"}
            links={{
              facebook : 'https://facebook.com',
              github:"https://github.com",
              instagram:"https://instagram.com",
              twitter,
              website,
              youtube : "https://youtube.com",
            }}
            />
              </InPageNavigection>
            </div>

      </section>
    </>
  );
};
