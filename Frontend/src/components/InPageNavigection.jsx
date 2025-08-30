export const InPageNavigection = ( routes = [] )=>{
    return(
        <div className="flex gap-2">
            {
            routes.map((route) => (
                <button
                    key={route}
                    className="p-4 px-5 capitalize"
                >
                {route}
                </button>
            ))
            }
        </div>
    )
}