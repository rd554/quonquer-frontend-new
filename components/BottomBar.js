import Link from "next/link";
import Home from "../public/svg/home.svg";
import Menu from "../public/svg/up-chevron.svg";
import {getCookie} from '../actions/auth'
import { useRouter } from "next/router";
import search from "../public/svg/loupe.svg";
import Community from "../public/svg/help.svg";
import Profile from "../public/svg/user.svg";
import { API, DOMAIN } from "../config";

const BottomBar = () => {
  const token = getCookie("token");
  const router = useRouter();
  const handleProfileClick = () => {
    router.push(token ? '/user' : '/signin')
  }
 
  return (
    <div>
      <section className="fixed bg-white h-12 w-full bottom-0 flex justify-between px-4 shadow-inner z-20">
        <div className="w-8 cursor-pointer ml-auto mr-auto focus:outline-none focus:shadow-outline transition mt-1">
          <Link href="/" legacyBehavior>
            <a>
              <div className="">
                <img src="/svg/home.svg" alt="Quonquer" />
              </div>
              <div className="-ml-1">
                <p className="dark-blue-text font-light text-xs">Home</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="w-8 content-center cursor-pointer ml-auto mr-auto focus:outline-none focus:shadow-outline transition mt-1">
          <Link href="blogs/search" legacyBehavior>
            <a>
              <div className="ml-3">
                <img src="/svg/loupe.svg" alt="Quonquer Search" />
              </div>
              <div className="">
                <p className="dark-blue-text font-light text-xs">Search</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="rounded-full w-20 h-12 ml-auto mr-auto flex justify-center app-logo-center shadow-outer focus:outline-none focus:shadow-outline transition mt-1">
          <Link href="/menu" legacyBehavior>
            <a>
              <div className="pt-2">
                <img src="/svg/up-chevron.svg" alt="Quonquer Menu" />
              </div>
            </a>
          </Link>
        </div>
        <div className="w-8 content-center cursor-pointer ml-auto mr-auto focus:outline-none focus:shadow-outline transition mt-1">
          <Link href="/community" legacyBehavior>
            <a>
              <div className="">
                <img src="/svg/help.svg" alt="Quonquer Community" />
              </div>
              <div className="-ml-4">
                <p className="dark-blue-text font-light text-xs">Community</p>
              </div>
            </a>
          </Link>
        </div>
        <div className="w-8 content-center cursor-pointer ml-auto mr-auto focus:outline-none focus:shadow-outline transition mt-1" onClick={handleProfileClick}>
            <a>
              <div className="ml-2">
                <img src="/svg/user.svg" alt="Profile" />
              </div>
              <div className="ml-1">
                <p className="dark-blue-text font-light text-xs">Profile</p>
              </div>
            </a>
        </div>
      </section>
    </div>
  );
};

export default BottomBar;
