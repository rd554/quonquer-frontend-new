import Link from "next/link";



const TopBlogs = ({ blog, onClick }) => {
  let topS = [],
  
  if (blogs) {
    let i = blogs.indexOf(b)
  

    topS.push(
      <div>
      onClick={() => onClick(b.id)}
      className={classnames('relative w-full cursor-pointer  bg-gray-100 flex m-auto justify-between rounded overflow-hidden shadow-md article-card-home-mobile' ,{'mb-4' : i !== (12) - 1})}
          <div className="p-2 flex-1">
            <p className="text-gray-700 text-xl">{blog.title}</p>
            <p className="text-gray-700 text-xs">{blog.Excerpt}
            </p>
          </div>
          <i className="fa fa-share-alt text-xl dark-blue-text pr-6 pb-3 self-end align-bottom"></i>
          <i className="fa fa-bookmark text-xl dark-blue-text pr-3 pb-3 self-end align-bottom"></i>
          <img src={b.BlogImage} 
          className="w-32 object-cover relative" 
          alt="asdjasd"/>
      
      </div>
    )
  }
};

const LatestBlogs = () => {
  return (
    <React.Fragment>
      <div className="px-4">
        <div className="mx-auto lg:ml-0 lg:mr-auto xl:mx-0 xl:w-5/6">
          <p className="md:max-w-full max-w-md w-full flex justify-between py-2 text-2xl">
            Top Topics
          </p>
          <div className="flex flex-wrap md:hidden">
            {TopBlogs()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LatestBlogs;
