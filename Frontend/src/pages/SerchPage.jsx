import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {InPageNavigection} from '../components/InPageNavigection'
import axios from '../api/axios'
import {motion} from 'framer-motion'
import {UserCard} from '../components/UserCard'
import { CiUser } from 'react-icons/ci'
import {BLogPostCard} from "../components/BLogPostCard"

export  const SerchPage = () => {
  const [blogs,setBlogs] = useState([]);
  const [user,setUser] = useState([]);
  // console.log("user : ",user)
    const {query} = useParams()
    
    const fetchBolgBySearch = async()=>{
        try{
          const res = await axios.post('/blog/blog-search',{query});
          setBlogs(res.data.blogs)
        }catch(err){
          console.log(err);
        }
    }

    const fetchUserBySearch = async()=>{
        try{
          const res = await axios.post('/users/search-user',{query});
          setUser(res.data.users)
        }catch(err){
          console.log(err);
        }
    }

    useEffect(()=>{
      resetState()
      fetchUserBySearch()
      fetchBolgBySearch()
    },[query])

    const resetState = ()=>{
      setBlogs([])
      setUser([])
    }

    const UserCardWrapper = () => {
  return (
    <>
      {user.length > 0 ? (
        user.map((u, i) => (
           <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    key={i}
                  >
                    <UserCard
                      user={u.personalInfo}
                    />
                  </motion.div>
        ))
      ) : (
        <p className='p-4 bg-gray-400 rounded-full m-5 text-center text-lg'>No users found</p>
      )} 
    </>
  );
};
  return (
      <section className=' min-h-[calc(100vh-80px)] flex justify-center gap-10'>
        <div className='w-full'>
            <InPageNavigection routes={[`Search Result ${query}`,"Accounts Matched"]}>

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

              <UserCardWrapper/>

            </InPageNavigection>
        </div>  
        <div className='min-w-[40%] lg:min-w-[550px]  max-w-min border-l-1 border-gray-200 pl-8 max-md:hidden '>
            <h1 className='mt-5 font-medium text-xl mb-8 flex items-center gap-2 '>User related to Search <i className='text-xl'><CiUser/> </i></h1>
            <UserCardWrapper/>
        </div>
      </section>
  )
}

