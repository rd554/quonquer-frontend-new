import React from 'react';

const LatestBlogs = ({ latestBlogs = [] }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">Latest Blogs</h2>
      {latestBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestBlogs.map((blog, index) => (
            <div key={index} className="border rounded p-4 shadow">
              <h3 className="font-bold">{blog.title || 'Untitled'}</h3>
              <p className="text-sm text-gray-600">{blog.excerpt || 'No description available'}</p>
              </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No blogs available at the moment.</p>
      )}
    </div>
  );
};

export default LatestBlogs;
