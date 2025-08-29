import { data, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import defaultBanner from "../assets/blogBanner.png";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import axios from "../api/axios";
import toast from "react-hot-toast";
import "../editor.css";
import { useBlogStore } from "../store/blog";

const Editer = () => {
  const { banner, setBanner, setContent, setTitle, content, title } = useBlogStore();
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!banner) setBanner(defaultBanner);
  }, [banner, setBanner]);

  const handelBannerUplode = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const formData = new FormData();
    formData.append("image", img);

    try {
      toast.loading("Uploading...");
      const res = await axios.post("/blog/uplode-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.dismiss();
      if (res.data.success) {
        toast.success("Uploaded 👍");
        setBanner(res.data.file.url);
      }
    } catch (err) {
      toast.dismiss();
      console.log("Error in upload banner:", err.response?.data || err.message);
      toast.error("Upload failed");
    }
  };

  const handelTiltleChange = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setTitle(input.value);
  };

  const handelTiltlekeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handlePublish = () => {
    if (!banner || banner === defaultBanner) {
      toast.error("Please upload a banner");
      return;
    }

    if (!title || title.trim().length < 5) {
      toast.error("Title must be at least 5 characters long");
      return;
    }

    if (!content || !content.blocks || content.blocks.length === 0) {
      toast.error("Content cannot be empty");
      return;
    }

    toast.success("All good! Redirecting to preview...");
    navigate("/preview");
  };

  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor",
      placeholder: "Let's write an awesome story",
      tools: {
        embed: Embed,
        header: {
          class: Header,
          config: {
            placeholder: "Type Heading...",
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        list: { class: List, inlineToolbar: true },
        quote: { class: Quote, inlineToolbar: true },
        marker: Marker,
        inlineCode: InlineCode,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("image", file);
                try {
                  const res = await axios.post("/blog/uplode-banner", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  if (res.data.success) {
                    return { success: 1, file: { url: res.data.file.url } };
                  }
                } catch (err) {
                  console.error("Image upload failed:", err);
                  return { success: 0 };
                }
              },
            },
          },
        },
      },
      data: content && content.blocks && content.blocks.length > 0 ? content : { blocks: [] },
      onChange: async () => {
        const data = await editor.save();
        setContent(data);
      },
    });

    editorRef.current = editor;
    return () => {
      editorRef.current = null;
    };
  }, [setContent]);

  return (
    <>
      <nav className="w-full flex items-center h-[70px] border-b-2 border-gray-50 gap-4 justify-between">
        <Link to="/" className="p-6 mr-6 text-2xl font-bold">
          BLOG.
        </Link>
        <div className="flex flex-row m-3">
          <button
            className="whitespace-nowrap bg-black text-white rounded-full px-3 py-1 md:mr-5 text-lg items-center gap-2 ml-2 cursor-pointer"
            onClick={handlePublish}
          >
            Publish
          </button>
          <button className="whitespace-nowrap bg-gray-200 text-black rounded-full px-3 py-1 md:mr-5 text-lg items-center gap-2 ml-2 cursor-pointer">
            Save Draft
          </button>
        </div>
      </nav>

      <motion.div>
        <section>
          <div className="mx-auto max-w-[900px] w-full mt-5">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray-200">
              <label htmlFor="uploadBanner">
                <img src={banner} alt="banner" className="z-20" />
                <input
                  type="file"
                  hidden
                  accept=".png,.jpg,.jpeg"
                  id="uploadBanner"
                  onChange={handelBannerUplode}
                />
              </label>
            </div>

            <textarea
              className="w-full text-4xl h-20 font-medium outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              placeholder="Blog Title"
              value={title}   
              onChange={handelTiltleChange}
              onKeyDown={handelTiltlekeyDown}
            ></textarea>

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor"></div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Editer;
