import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Logo from "./Logo";

//this is the welcome page 
export default function Layout({children}) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if(!session){
    return (
      <div className={"bg-blue-900 w-screen h-screen flex flex-col"}>
      <div className="flex-none">This is header</div>
      <div className={"flex-none bg-red-600"}>
        Welcome to Hikeko Admin Panel
      </div>
      <div className="flex-grow flex items-center justify-center">
        <button onClick={() => signIn('google')} className="bg-white p-2 rounded-lg">
          Log in with Google
        </button>
      </div>
    </div>
    );
  }
  return (
    <div className=" bg-customScBg min-h-screen flex">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo/>
        </div>
      </div>
      <div className="flex flex-grow">
        <Nav show={showNav}/>
        <div className="bg-white flex-grow rounded-l-lg p-4 min-h-full">
          {children}
        </div>
      </div>
    </div>
    
  );
}
