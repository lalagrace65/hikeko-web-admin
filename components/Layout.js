import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";
import Nav from "@/components/Nav";

// This is the welcome page
export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="w-screen h-screen grid grid-cols-5">
        {/* Left side Cover page */}
        <div className="relative col-span-2">
          <img 
              src="/hiking-welcomepage.jpg" 
              alt="Cover Image" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-customScBg opacity-50"></div>     
        </div>

        {/* Right side with login */}
        <div className="flex flex-col col-span-3 bg-customPrBg text-white justify-center items-center p-4">
          <div className="mb-4 text-3xl font-bold text-center">
            Welcome to Hikeko<br/>
            Super Admin Panel
          </div>
          <button
            onClick={() => signIn("google")}
            className="bg-white text-customPrBg p-4 rounded-lg hover:bg-gray-200"
          >
            Log in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-customScBg min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex flex-grow">
        <Nav show={showNav} />
        <div className="bg-white flex-grow rounded-l-lg p-4 min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
