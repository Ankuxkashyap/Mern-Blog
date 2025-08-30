import  {InPageNavigection } from "../components/InPageNavigection"

export const HomePage = ()=>{
    return(
            // <h2>yapp</h2>
        <section className="min-h-screen-offset flex justify-center gap-10 ">
            <div className="w-full">
                    <InPageNavigection routes={["home","trnading blogs"]}>

                    </InPageNavigection>
            </div>
            <div>

            </div>
        </section>
    )
}