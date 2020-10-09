
const LatestBlogs = ({latestBlogs}) => {
  return (
    <div>
        <p className="md:max-w-full max-w-md w-full flex justify-between py-2 text-2xl">Top Topics</p>
        <div className="flex flex-wrap md:hidden">
        {latestBlogs.map(blog => {
            const {title , excerpt , photo} = blog
            return (
            <div 
            className="relative w-full 
            cursor-pointer bg-gray-100 flex m-auto justify-between rounded overflow-hidden shadow-md article-card-home-mobile">
            <div className="p-2 flex-1">
                <p className="text-gray-700 text-xl">{title}</p>
                <p className="text-gray-700 text-xs">{excerpt}
                </p>
            </div>
            <i className="fa fa-share-alt text-xl dark-blue-text pr-6 pb-3 self-end align-bottom"></i>
            <i className="fa fa-bookmark text-xl dark-blue-text pr-3 pb-3 self-end align-bottom"></i>
            <img src={photo} 
            className="w-32 object-cover relative" 
            alt="asdjasd"/>
        </div>
            )
        })}
        </div>
    </div>
  );
};

export default LatestBlogs;
