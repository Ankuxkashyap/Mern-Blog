import { InPageNavigection } from "../components/InPageNavigection"
import axios from "../api/axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 
import { BLogPostCard } from "../components/BLogPostCard";
import { motion } from "framer-motion";

export const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
const categories = [
        "Programming",
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "Artificial Intelligence",
        "Cloud Computing",
    ];

  const fetchLatestBlogs = async () => {
    try {
      toast.loading("Fetching blogs...");
      const res = await axios.get("/blog/getBlogs");
      setTimeout(() => {
        toast.dismiss();
      }, 500);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  return (
    <section className="min-h-screen-offset flex w-full justify-center">
      <div className="flex w-[90%]">
        {/* Feed Section */}
        <div className="flex-1 max-w-4xl px-4">
          <InPageNavigection routes={["home"]}>
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
                <p>No blogs available</p>
              )}
            </div>
          </InPageNavigection>
        </div>

        {/* Sidebar */}
        <div className="w-[40%] ml-45 border-l border-gray-200 pl-6 pt-4 max-md:hidden">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-xl">Stories from all interests</h1>

              <div className=" flex gap-5 flex-wrap">
                {
                    categories.map((category, i )=>{
                        return(
                            <button className="p-3 bg-gray-200 rounded-full px-6 capitalize" key={i}>
                                {category}
                            </button>
                        )
                    })
                }
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
