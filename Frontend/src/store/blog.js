
import { create } from "zustand";

export const useBlogStore = create((set) => ({
    
  banner: "",
  title: "",
  dis:"",
  content: [],  
  draft: {},
  tags:[],

  setBanner: (banner) => set({ banner }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setDis:(dis)=>set({dis}),
  setDraft: (draft) => set({ draft }),
  setTag:(tags)=>set({tags}),
  

  resetBlog: () =>
    set({
      banner: "",
      title: "",
      content: [],
      draft: {}
    }),
}));
