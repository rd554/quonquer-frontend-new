import Link from "next/link";
import logo from "../public/app_img.jpg";
import facebook from "../public/images/facebook.png";
import instagram from "../public/images/instagram.png";
import twitter from "../public/images/twitter.png";
import linkedin from "../public/images/linkedin.png";
import WorkWithUs from "./WorkWithUs";

const Footer = () => {
  return (
    <div className="dark-blue w-full min:h-64 pb-24 pt-4 z-10">
      <div className="flex mt-4 max-w-2xl m-auto">
        <div className="w-1/2 text-white">
          <ul>
            <Link href="/community">
              <a>
                <li className="w-24 m-auto">Community</li>
              </a>
            </Link>
            <Link href="/blogs">
              <a>
                <li className="w-24 m-auto">Blogs</li>
              </a>
            </Link>
            <Link href="/sitemap">
              <a>
                <li className="w-24 m-auto">Sitemap</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="w-1/2 text-white mr-12">
          <ul>
            <li className="w-24 m-auto">Contact us</li>
            <li className="w-24 m-auto text-sm">
              <a href="mailto:quonquer@gmail.com">quonquer@gmail.com</a>
            </li>
          </ul>
          <div className="flex mt-3">
            <a href="https://www.instagram.com/quonquer.mentalhealth">
              <img src={instagram} className="w-8 h-8 ml-8" alt="instagram" />
            </a>
            <a href="https://www.facebook.com/Quonquer-878341932526317/">
              <img src={facebook} className="w-8 h-8 ml-3" alt="facebook" />
            </a>
            <a href="https://twitter.com/quonquer1">
              <img src={twitter} className="w-8 h-8 ml-3" alt="twitter" />
            </a>
            <a href="https://www.linkedin.com/company/quonquer1">
              <img src={linkedin} className="w-8 h-8 ml-3" alt="linkedin" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-8 h-8 mr-2">
          <img
            src={logo}
            className="rounded-full shadow-md mt-8"
            alt="asdasd"
          />
        </div>

        <p className="text-center text-xl text-white relative app-font mt-8">
          QUONQUER
        </p>
      </div>
      <div className="flex flex-row justify-center mt-6">
        <div className="mt-4">
          <p className="text-white text-xs text-hairline">
            Quonquer<span className="copy-right-text absolute">©&nbsp;-</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Build with&nbsp;
            <span className="heart">❤</span>&nbsp;by us&nbsp;-
          </p>
        </div>
        <div className="mt-3">
          <Link href="/about">
            <a className="text-white text-xs">&nbsp;About me&nbsp;-</a>
          </Link>
        </div>

        <div className="mt-3">
          <Link href="/about">
            <a className="text-white text-xs">&nbsp;Work with us</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
