import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data:session} = useSession();
  console.log({session});
  return <Layout>
    <div className="text-customPrBg flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-xl overflow-hidden">
          <img src ={session?.user?.image} alt="" className="w-8 h-8 rounded-full"/>
          <span className="p-1">
            {session?.user?.name}
          </span>
        </div>
    </div>
  </Layout>
}
