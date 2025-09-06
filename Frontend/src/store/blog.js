import { create } from "zustand";
import axios from '../api/axios';


export const useBlogStore = create((set, get) => ({  
  banner: "",
  title: "",
  dis: "",
  content: [],  
  draft: {},
  tags: [],

  setBanner: (banner) => set({ banner }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setDis: (dis) => set({ dis }),
  setDraft: (draft) => set({ draft }),
  setTag: (tags) => set({ tags }),

  resetBlog: () =>
    set({
      banner: "",
      title: "",
      dis: "",
      content: [],
      draft: {},
      tags: []
    }),

  publish: async () => {
    const { banner, title, content, dis, tags } = get();
    console.log("dis form frontend ",dis)
    try {
      const res = await axios.post('/blog/publish-blog', {
        banner,
        title,
        content,
        dis,
        tags
      });
      return({success: true,message:"publish successful!"})
      // console.log("Blog published:", res.data);
    } catch (err) {
      return({
        success:false,
        message:"Failed to publish"
      })
      console.error("Error publishing blog:", err.response?.data || err.message);
    }
  },
  saveDraft: async()=>{
     const { banner, title, content, dis, tags } = get();

    try {
      const res = await axios.post('/blog/save-draft', {
        banner,
        title,
        content,
        dis,
        tags
      });
      return({success: true,message:"SaveDraft successful!"})
      // console.log("Blog published:", res.data);
    } catch (err) {
      return({
        success:false,
        message:"Failed to SaveDraft"
      })
      console.error("Error SaveDraft blog:", err.response?.data || err.message);
    }
  }
  ,
   fetchBlogById: async ({ blog_id }) => {
  try {
    const res = await axios.post("/blog/blog_id", { blog_id });
    const blog = res.data.blog;

    if (blog) {
      set({
        banner: blog.banner || "",
        title: blog.title || "",
        dis: blog.dis || "",
        content: blog.content || { blocks: [] },
        tags: blog.tags || [],
        draft: blog, // if you want to keep full object
        currentBlog: blog,
      });
    }
    return blog;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

}));
