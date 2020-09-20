import SearchBlog from "../components/blog/SearchBlog";

const showAllCategories = () => {
  return (
    <div className="rounded shadow-md bg-gray-100 ml-3 mr-3 hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
      {categories.map((c, i) => {
        return (
          <Link href={`/categories/${c.slug}`} key={i}>
            <a>
              <button className="cursor-pointer rounded-full bg-gray-600 text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
                {c.name}
              </button>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

const showAllTags = () => {
  return (
    <div className="rounded shadow-md bg-gray-100 ml-3 mr-3 mt-4 hor-list-nobar overflow-x-auto whitespace-no-wrap py-3 px-2">
      {tags.map((t, i) => (
        <Link href={`/tags/${t.slug}`} key={i}>
          <a className="ml-2">
            <button className="cursor-pointer rounded-full bg-gray-700 text-white font-extrabold hover:bg-gray-500 text-sm focus:outline-none focus:shadow-outline transition mt-1 ml-2 px-2">
              {t.name}
            </button>
          </a>
        </Link>
      ))}
    </div>
  );
};

const search = () => {
  return (
    <div>
      <div>
        <SearchBlog />
      </div>
      <section>
        <div>
          <p className="block ml-3 text-gray-700 text-lg mt-4 mb-2 font-semibold">
            All Categories
          </p>

          {showAllCategories()}
        </div>
        <div>
          <p className="block ml-3 text-gray-700 text-lg mt-6 mb-1 font-semibold">
            All Tags
          </p>

          {showAllTags()}
        </div>
      </section>
    </div>
  );
};

export default search;
