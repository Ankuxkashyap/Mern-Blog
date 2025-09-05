import { useState ,useRef, useEffect, Children  } from "react"

export const InPageNavigection = ( {routes = [] ,defaultIndex = 0, children})=>{

    const [isActive,setIsActive] = useState(defaultIndex);
    const activeLine = useRef();
    const activeTab = useRef();
    // console.log(isActive);

    const changePageState = (btn ,i)=> {
        // console.log(btn)
        // console.log("I ", i )
        const {offsetWidth,offsetLeft} = btn;
        activeLine.current.style.width = offsetWidth + "px"
        activeLine.current.style.left = offsetLeft + "px"
        setIsActive(i);  
    }  

    useEffect(()=>{
        changePageState(activeTab.current,defaultIndex);
    },[])

    return(
        <>
        <div className="bg-white overflow-auto flex flex-nowrap mb-5 border-gray-100 md:ml-8 md:mr-25 gap-2 border-b relative ">
            {
            routes.map((route ,i) => (
                <button
                    ref={i == defaultIndex ? activeTab : null}
                    onClick={(e)=>{changePageState(e.target, i)}}
                    key={i}
                    className={"p-4 px-5 capitalize " + (isActive == i  ? "text-black " : "text-gray-500  md:hidden")}
                >
                {route}
                </button>
            ))
            }
            <hr ref={activeLine} className="absolute bottom-0 duration-300 "/>
        </div>

        { Array.isArray(children) ? children[isActive] : children}
    </>
    )
}