import Link from 'next/link'
import {smartTrim} from '../helpers/title'
import renderHTML from "react-render-html";


const LatestBlogs = ({latestBlogs}) => {
  return (
    <div>
        <p className="flex justify-between py-2 font-bold text-2xl mx-3">Top Topics </p>
        <div className="flex flex-wrap mx-3 mb-6">
        {latestBlogs.map((blog, i) => {
            const {title , excerpt , photo} = blog
            blog.title = smartTrim(title, 20, " ", " ...");
            return (
              <Link key={i} href={`/blogs/${blog.slug}`}><a><div 
              className="relative w-full 
              cursor-pointer bg-gray-100 flex m-auto mb-3 justify-between rounded overflow-hidden shadow-md article-card-home-mobile mt-3">
              <div className="p-2 flex-1">
                  <p className="text-black text-xl">{title}</p>
                  <p className="text-gray-700 text-md my-1">{renderHTML(excerpt)}
                  </p>
              </div>
             
              <img src={photo} 
              className="w-32 object-cover relative" 
              alt="blog photo"/>
          </div></a></Link>
            
            )
        })}
        </div>
    </div>
  );
};

export default LatestBlogs;
