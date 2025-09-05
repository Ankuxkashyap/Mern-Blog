import { InPageNavigection } from "../components/InPageNavigection"
import axios from "../api/axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 
import { BLogPostCard } from "../components/BLogPostCard";
import { motion } from "framer-motion";
import {MinimalBlogPost} from "../components/MinimalBlogPost"
import { IoIosTrendingUp } from "react-icons/io";
import {Link} from "react-router-dom"

export const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [terndingBlogs, setTerndingBlogs] = useState([]);
  const [pageState,setPageState] = useState('home');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  


const categories = [
        "Programming",
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "Artificial Intelligence",
        "Cloud Computing",
        'Rover'
    ];


    const loadBlogByCategory = (e) =>{
      const category =  e.target.innerText
      setBlogs([])
      fetchBlogByCategory(category);
     if(pageState == category){
      setPageState('home')
      return;
     }
     setPageState(category);
    }

  const fetchLatestBlogs = async (page) => {
  try {
    toast.loading("Fetching blogs...");
    const res = await axios.post("/blog/getBlogs", { page });
    setTimeout(() => {
      toast.dismiss();
    }, 500);

    if (res.data.blogs.length === 0) {
      setHasMore(false); 
    } else {
      setBlogs((prevBlogs) => [...prevBlogs, ...res.data.blogs]);
    }
    if (res.data.blogs.length < 5) {
      setHasMore(false);
    }
  } catch (err) {
    console.log(err);
  }
};



const fetchBlogByCategory = async (category) => {
  try {
    const res = await axios.post("/blog/blog-category", {
      tag: category.toLowerCase(),
    });
    setBlogs(res.data.blogs);
  } catch (err) {
    console.log(err);
  }
};

const fetchTreandingBlogs = async()=>{
    try {
      toast.loading("Fetching blogs...");
      const res = await axios.get("/blog/trending-blogs");
      setTimeout(() => {
        toast.dismiss();
      }, 500);
      setTerndingBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
}


  useEffect(() => {
    if(pageState =='home'){
      fetchLatestBlogs(page);
    }
    
      fetchTreandingBlogs();
    
  }, [pageState,page]);

  return (
    <section className="min-h-screen-offset flex w-full justify-center px-4">
      <div className="flex w-[100%]">
        <div className="flex-1 max-w-4xl px-4">
          <InPageNavigection routes={[pageState,"tranding"]}>

            <div className="flex flex-col gap-6">
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
                <p className="relative left-40 w-full p-4 text-center rounded-2xl bg-gray-300 text-lg ml-10 text-black">No blogs available</p>

              )}

              {hasMore && pageState === "home" && (
                  <p
                    onClick={() => setPage(page + 1)}
                    className="text-lg mb-10 text-center text-gray-400 cursor-pointer"
                  >
                    Load More
                  </p>
                )}
            </div>

            {
              terndingBlogs.length > 0 ? (
                terndingBlogs.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost blog={item} index={i} />
                  </motion.div>
                ))
              ) : (
                <p className="w-full p-4 text-center rounded-2xl bg-gray-300 text-lg text-black">No blogs available</p>
              )
            }

            
          </InPageNavigection>
        </div>

        <div className="w-[40%] ml-40 lg:ml-80 border-l border-gray-200 pl-6 pt-4 max-md:hidden">
          <div className="flex flex-col gap-6 mb-8">
            <h1 className="text-2xl font-medium">Stories from all interests</h1>

              <div className=" flex gap-5 flex-wrap">
                {
                    categories.map((category, i )=>{
                        return(
                            <button 
                            onClick={loadBlogByCategory}
                            className={`p-3  cursor-pointer hover:bg-black hover:text-white rounded-full px-6 capitalize  ${(pageState == category) ? "  text-white bg-black" : "bg-gray-200 "}`} key={i}>
                                {category}
                            </button>
                        )
                    })
                }
              </div>

          </div>
          <div>
            <span className="flex items-center text-3xl font-medium mb-8 text-current">
              Trending <IoIosTrendingUp className="ml-2" />
            </span>

            {
              terndingBlogs.length > 0 ? (
                terndingBlogs.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    key={i}
                  >
                     <Link to={`blog/${item.blog_id}`} className="flex gap-5 mb-10">
      
                    <h1 className="text-7xl font-semibold text-gray-300 leading-none">
                      {i < 9 ? `0${i + 1}` : i + 1}
                    </h1>
                    
                    <div className="flex flex-col ">
                      
                      <div className="flex gap-2 items-center text-lg text-gray-500">
                        <img
                          src={item.author?.personalInfo?.profile_img}
                          alt={item.author?.personalInfo?.fullName}
                          className="w-6 h-6 rounded-full"
                        />
                        <p className="line-clamp-1 text-gray-700">
                          {item.author?.personalInfo?.fullName} @{item.author?.personalInfo?.username}
                        </p>
                        <span className="text-gray-600">
                          {new Date(item.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <h1 className="text-3xl  font-serif leading-snug text-black line-clamp-2">
                        {item.title}
                      </h1>
                    </div>
                  </Link>
                  </motion.div>
                ))
              ) : (
                <p className="w-full p-4 text-center rounded-2xl bg-gray-300 text-lg text-black">No blogs available</p>

              )
            }

          </div>
        </div>
      </div>
    </section>
  );
};
