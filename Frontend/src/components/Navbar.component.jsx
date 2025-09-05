import { useState } from "react"
import { FiSearch } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import { IoNotificationsOutline } from "react-icons/io5";
import { UserNavigetComponent } from "../components/UserNavigetComponent";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const [searchBox,setSearchBox] = useState(false);
    const navigate = useNavigate() 
    const [userNevPanel,setUserNevPanel] = useState(false);
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleBlur = () => {
        setTimeout(() => {
            setUserNevPanel(false);
        }, 200);
    }
    const handleSearch = (e)=>{
        const query = e.target.value;
        if(e.key == "Enter" && query.length){
            navigate(`/serch/${query}`)
        }
    }


  return (
    <>
    <nav className="w-full flex items-center h-[70px] border-b-2 border-gray-50  gap-4 ">
        <Link to="/" className=" p-6 mr-6 text-2xl font-bold text" >BLOG.</Link>

        <div className= {`absolute w-full left-0 top-15 mt-0 border-b border-gray-50 cursor-pointer py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:opacity-100 ${searchBox ? " opacity-100" : "opacity-0  duration-100" }`}>
            <input
                type="text" 
                placeholder="Search"
                onKeyDown={handleSearch}
                className="w-full md:w-auto bg-gray-100 p-3 pl-6 pr[12%] md:pr-6 rounded-full placeholder:text-gray-700 cursor-pointer md:pl-14 "
            />
            <FiSearch className="absolute right-[50px] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 cursor-pointer text-xl"/>
        </div>

        <div className="flex items-center justify-center  md:gap-6 ml-auto  cursor-pointer">
            <button className="md:hidden absolute right-30  cursor-pointer  bg-gray-100 w-10 h-10 rounded-full items-center justify-center flex text-gray-700"
            onClick={()=>setSearchBox(prev => !prev)}
            >
                    <FiSearch className="text-xl"/>
            </button>

        </div>

        {
            user ? <Link
            to="/editer"
            className= {`hidden absolute right-30 bg-gray-100 text-gray-700 px-3 py-2 rounded-2xl md:flex items-center gap-2 text-lg`}
            >
            <FaRegEdit />
            <p>write</p>
            </Link>
             : 
            <Link
            to="/singup"
            className="whitespace-nowrap bg-gray-200 text-black rounded-full px-4 py-2 text-lg items-center gap-2 ml-2 hidden md:static md:translate-y-0 md:flex md:px-4 md:py-2"
            >
            Sign Up
            </Link>
        }

                    
            {
                isAuthenticated ?
                <>
                <div className="flex items-center justify-center md:gap-6 ml-auto  cursor-pointer">
                    <button className=" absolute right-18 ml-6 bg-gray-100 w-10 h-10 rounded-full items-center  cursor-pointer justify-center flex text-gray-700"
                    
                    >
                    <IoNotificationsOutline className="text-2xl"/>
                    </button>

                </div> 
                
                <div className="relative group flex items-center justify-center md:gap-6 ml-auto  cursor-pointer">
                    <button onBlur={handleBlur}
                        className=" absolute right-5 flex items-center justify-center cursor-pointer bg-gray-100 text-gray-700 w-10 h-10 rounded-2xl gap-2 text-lg"
                    >
                        <img
                        src={user.profile_img}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                        onClick={()=>setUserNevPanel(prev => !prev)}
                        />
                    </button>

                    <div >
                        {
                            userNevPanel ? <UserNavigetComponent />: null
                        }
                    </div>
                </div>


                </>
                :<Link
                   to="/singin"
                   className="whitespace-nowrap bg-black text-white rounded-full px-4 py-2 md:mr-5 text-lg items-center gap-2 ml-2
                    absolute right-5
                    md:static md:translate-y-0 md:flex md:px-4 md:py-2"
                     >
                   Sign In
                </Link>   
            }
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar