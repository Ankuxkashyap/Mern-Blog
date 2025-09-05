import React from 'react'
import {Link} from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaGlobe, FaYoutube } from "react-icons/fa";

export const AboutUser = ({bio,links ,className,joinedAt}) => {
  const icons = {
  facebook: FaFacebook,
  github: FaGithub,
  instagram: FaInstagram,
  twitter: FaTwitter,
  website: FaGlobe,
  youtube: FaYoutube,
};

    return (  
        <div className={"md:w-[90%] md:mt-7" + className }   >
          <p className='text-xl leading-7 '>{bio.lenght?bio:"Nothing to read here"}</p>

          <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-gray-800">
                {Object.keys(links).map((key) => {
                  const link = links[key];
                  const Icon = icons[key]; // get the icon for this key
                  return link && Icon ? (
                    <a
                      key={key}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl  transition"
                    >
                      <Icon />
                    </a>
                  ) : null;
                })}

                <p className='text-xl leading-7 text-gray-800 mt-3'> Joined on {new Date(joinedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year:"numeric"
                })}</p>
              </div>
        </div>

  )
}
