import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../public/app_img.jpg";
import { APP_NAME } from "../config";
import { isAuth } from "../actions/auth";

// const links = [
//   { href: "/signin", label: "Sign in" },
//   { href: "/community", label: "Community" },
// ].map((link) => {
//   link.key = `header-link-${link.href}-${link.label}`;
//   return link;
// });

const Header = () => {
  const [headerCTA, setHeaderCTA] = useState({
    href: "/signin",
    label: "Sign in",
  });

  useEffect(() => {
    if (isAuth()) {
      setHeaderCTA({
        href: "/community",
        label: "Community",
      });
    }
  }, []);

  return (
    <div>
      <section className="fixed bg-white h-12 w-full top-0 item-center flex shadow-md justify-between px-4 z-20">
        <div className="sm:w-1/3 h-full flex content-center flex-wrap cursor-pointer">
          <Link href="/">
            <a>
              <div className="w-8 h-8 text-center flex items-center">
                <img
                  src={logo}
                  className="rounded-full shadow-md"
                  alt="Quonquer"
                />
              </div>
            </a>
          </Link>

          <Link href="/">
            <a>
              <p className="h-auto text-black pl-2 text-xl app-font-center font-medium">
                {APP_NAME}
              </p>
            </a>
          </Link>
        </div>
        <div
          className="w-1/3 h-full flex content-center justify-end
        flex-wrap cursor-pointer"
        >
          <ul>
            <li>
              <Link href={headerCTA.href}>
                <a
                  className="inline-block dark-blue
    text-white px-2 py-2 uppercase tracking-wider 
    text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
                  href={headerCTA.href}
                >
                  {headerCTA.label}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Header;
