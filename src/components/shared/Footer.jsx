
import Link from "next/link";
import Image from "next/image";
import facebook from "../../../public/images/facebook.png"
import instagram from "../../../public/images/instagram.png"
import twitter from "../../../public/images/twitter.png"
import linkedin from "../../../public/images/linkedin.png"

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 border-t border-gray-200 dark:bg-olive-600 border-b  dark:border-olive-700 shadow-sm md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            StudyNook 
          </h1>
          <p className="mt-4 max-w-xl">
            Your Ultimate Room Booking Companion.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Newsletter */}
          <div>
            <h3 className="text-white mb-3 tracking-wide">NEWSLETTER</h3>
            <p className="mb-4 text-sm">
              Subscribe for exclusive room deals and inspiration.
            </p>

            <div className="flex items-center bg-gray-900  px-4 py-3">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-transparent outline-none text-white flex-1 text-sm"
              />
              <span className="text-white text-lg">↗</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-3 tracking-wide">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Rooms</li>
              <li className="hover:text-white cursor-pointer">About</li>
              
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-3 tracking-wide">SUPPORT</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-3 tracking-wide">CONTACT US</h3>
            <ul className="space-y-2">
              <li>info@studynook.com</li>
              <li>786 901 1622</li>
             
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © 2026 StudyNook. All rights reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0 text-white text-lg">
              <div >
              <h3 className="text-white font-semibold mb-3 text-lg">Social Links</h3>
              <ul className="space-y-2 text-zinc-400 flex justify-start gap-3">
                <li>
                 <Link href="https://www.facebook.com/">
                  <Image 
                  src={facebook} 
                  alt="Facebook Image"
                  width={30}
                  height={30}/>
                 </Link>
                </li>
                <li>

                 <Link href="https://www.instagram.com/">
                <Image 
                src={instagram} 
                alt="Instagram Image"
                width={30}
                height={30}
                />
                 </Link>
                </li>

                <li>
                 <Link href="https://x.com/">
                <Image 
                src={twitter} 
                alt="Twitter Image" 
                width={30}
                height={30}/>
                 </Link>
                </li>

                <li>
                 <Link href="https://www.linkedin.com">
                <Image 
                src={linkedin} 
                alt="LinkedIn Image" 
                width={30}
                height={30}
                className="rounded-full"/>
                 </Link>
                </li>
        
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;