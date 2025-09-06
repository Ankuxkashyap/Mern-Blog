import React from 'react'

const Img = ({url, caption})=>{
    return (
        <div>
            <img src={url} />
            {caption.length ? <p className='w-full text-center md:mb-12 text-base text-gray-800'>{caption}</p> : " "}
        </div>
    )
}

const Quote = ({quote,caption})=>{
    return(
        <div className='bg-purple-200 p-3 pl-5 border-l-4 border-purple-500'>
            <p className='text-xl leading-10 md:text-2xl'>{quote}</p>
            {caption.length ? <p className='w-full text-purple-500 text-base'>{caption}</p> : " "}
        </div>
    )
}

const List = ({ style, items }) => {
  return (
    <ol
      className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}
    >
      {items.map((listItem, i) => (
        <li key={i} className="my-2">
          {listItem.content}
          {listItem.items?.length > 0 && (
            <List style={style} items={listItem.items} />
          )}
        </li>
      ))}
    </ol>
  );
};



export const BlogContent = ({block}) => {
    const {type,data} = block;

    if(type== "paragraph"){
        return <p dangerouslySetInnerHTML={{__html:data.text}}></p>
    }
    if(type== "header"){
        if(data.lavel==3){
            return <h3 className='text-3xl font-bold' dangerouslySetInnerHTML={{__html:data.text}}></h3>
        }
        return <h2 className='test-4xl font-bold' dangerouslySetInnerHTML={{__html:data.text}}></h2>
    }
    if(type == "image"){
        return <Img url={data.file.url} caption={data.caption}/>
    }
    if(type == "quote"){
        return <Quote quote={data.text} caption={data.caption}/>
    }
    if(type == 'list'){
        return <List style={data.style} items={data.items}/>
    }

  return (
    <div>This is the blog content </div>
  )
}
