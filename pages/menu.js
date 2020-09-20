import Link from "next/link";
import back from "../public/back.png";
import facebook from "../public/images/facebook.png";
import instagram from "../public/images/instagram.png";
import twitter from "../public/images/twitter.png";
import linkedin from "../public/images/linkedin.png";

const Menu = () => {
  return (
    <>
      <div>
        <Link href="/">
          <img src={back} alt="back" className="w-6 h-6 mr-3 mt-4 ml-1"></img>
        </Link>
      </div>
      <div>
        <ul className="search-text m-auto text-center mt-8">
          <Link href="/blogs">
            <a>
              <li className="pt-2 text-lg">Blogs</li>
            </a>
          </Link>
          <Link href="/tags">
            <a>
              <li className="pt-2 text-lg">Tags</li>
            </a>
          </Link>
          <Link href="/category">
            <a>
              <li className="pt-2 text-lg">Category</li>
            </a>
          </Link>
          <Link href="/community">
            <a>
              <li className="pt-2 text-lg">Community</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col">
        <Link href="/community">
          <a
            className="
                  
                        inline-block border-solid border border-white
                              mx-auto
                              mt-12
                              text-white px-8 py-3 uppercase tracking-wider 
                              text-xs font-semibold rounded-lg shadow-md 
                              w-full
                              hover:bg-blue-900 focus:outline-none focus:shadow-outline transition
                              dark-blue
                              text-center
                              search-btn-text
                              max-w-sm
                              "
          >
            Join our community
          </a>
        </Link>
      </div>
      <div className="flex flex-col">
        <Link href="mailto:quonquer@gmail.com">
          <a
            className="
                  
                        inline-block border-solid border border-white
                              mx-auto
                              mt-6
                              text-white px-8 py-3 uppercase tracking-wider 
                              text-xs font-semibold rounded-lg shadow-md 
                              w-full
                              hover:bg-blue-900 focus:outline-none focus:shadow-outline transition
                              dark-blue
                              text-center
                              search-btn-text
                              max-w-sm

                              "
          >
            Private Consultation
          </a>
        </Link>
      </div>
      <div className="flex mt-10 justify-center">
        <a href="https://www.instagram.com/quonquer.mentalhealth">
          <img src={instagram} className="w-10 h-10" alt="instagram" />
        </a>
        <a href="https://www.facebook.com/Quonquer-878341932526317/">
          <img src={facebook} className="w-10 h-10 ml-3" alt="facebook" />
        </a>
        <a href="https://twitter.com/quonquer1">
          <img src={twitter} className="w-10 h-10 ml-3" alt="twitter" />
        </a>
        <a href="https://www.linkedin.com/company/quonquer1">
          <img src={linkedin} className="w-10 h-10 ml-3" alt="linkedin" />
        </a>
      </div>
      <div className="flex justify-center">
        <div className="home-menu-login-text mt-10">
          <Link href="/signin">
            <a className="text-blue-500 mr-6">Signin</a>
          </Link>
        </div>
        <div>
          <div className="flex justify-center home-menu-login-text mt-10">
            <Link href="/signin">
              <a className="text-black mr-4">
                New user? &nbsp;
                <span>
                  <Link href="/signup">
                    <a className="text-blue-500">Signup</a>
                  </Link>
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
