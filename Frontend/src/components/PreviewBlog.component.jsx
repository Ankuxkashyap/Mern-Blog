import React, { useState } from 'react'
import { BsXLg } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useBlogStore } from '../store/blog'
import { Tag } from '../components/Tag';
import toast from 'react-hot-toast';

export const PreviewBlog = () => {
  const navigate = useNavigate();
  const { banner, title, dis, setDis, setTitle, tags, setTag } = useBlogStore();
  const [inputValue, setInputValue] = useState("");
  const maxlength = 200;
  const maxTaglimit = 5;

  const changeTitle = (e) => setTitle(e.target.value);
  const changeDis = (e) => setDis(e.target.value);

const handleRemoveTag = (tagToRemove) => {
  setTag(tags.filter((tag) => tag !== tagToRemove));
};


const handleTagKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    if ((tags || []).length >= maxTaglimit) {
      toast.error("You can add only 5 tags!");
      return;
    }

    if ((tags || []).includes(inputValue.trim())) {
      toast.error("Tag already added!");
      return;
    }

    setTag([...(tags || []), inputValue.trim()]);
    setInputValue("");
  }
};



    console.log(tags)
  const handelCancle = () => navigate(-1);

  return (
    <>
      <button
        className="text-2xl absolute right-[5vw] md:right-[4vw] z-10 top-5 md:top-[5%] lg:top-[5%] cursor-pointer"
        onClick={handelCancle}
      >
        <BsXLg />
      </button>

      <section className="w-full max-w-6xl md:mt-50 mt-5 mx-auto px-4 flex flex-col md:flex-row md:gap-10 lg:gap-20">
        <div className="flex-1">
          <p className="text-gray-700 mb-2 text-sm sm:text-base">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-200 mt-4">
            {banner ? (
              <img src={banner} alt="Preview banner" className="w-full h-full object-cover" />
            ) : (
              <p className="flex justify-center items-center h-full text-gray-500">No Banner</p>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-3 leading-snug sm:leading-tight line-clamp-3">
            {title || "Untitled Blog"}
          </h1>

          <p className="text-base sm:text-lg leading-7 mt-4 text-gray-800 line-clamp-4">
            {dis || "No description yet..."}
          </p>
        </div>

        <div className="flex-1 mt-8 md:mt-0 md:pl-8 border-gray-300">
          <p className="text-gray-700 text-lg sm:text-xl mb-2">Blog Title</p>
          <input
            type="text"
            value={title}
            onChange={changeTitle}
            className="w-full h-12 px-3 rounded-md outline-none border border-gray-300 bg-gray-100"
          />

          <p className="text-gray-700 text-lg sm:text-xl mb-2 mt-5">Short description</p>
          <textarea
            className="resize-none bg-gray-100 w-full h-25 p-2 outline-none rounded-lg"
            maxLength={maxlength}
            value={dis}
            onChange={changeDis}
          />
          <p className="flex flex-row-reverse">{maxlength - dis.length} Characters left</p>

          <p className="text-gray-700 text-lg sm:text-xl mb-2 mt-5">Topics (helps in search & ranking) </p>
          <div className="bg-gray-100 rounded-lg p-2">
            <input
              type="text"
              placeholder="Press Enter to add tag"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="w-full mb-2 p-2 bg-white rounded"
            />
            <div className="flex flex-wrap">
              {(tags || []).map((tag, i) => (
                <Tag key={i} tag={tag} onRemove={() => handleRemoveTag(tag)} />
            ))}
            </div>
          </div>
            <p className='flex flex-row-reverse'>
             {maxTaglimit - (tags?.length || 0)} Tags left
            </p>
        </div>
      </section>

      <button
        className="mt-5 absolute left-[40vw] md:left-[53vw] whitespace-nowrap bg-black text-white rounded-full px-3 py-1 md:mr-5 text-lg items-center gap-2 ml-2 cursor-pointer"
      >
        Publish
      </button>
    </>
  );
};
