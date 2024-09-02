import Image from "next/image";
import Link from "next/link";

export default function Logo(){
    return (
    <Link href={'/'} className="flex gap-1 ">
        <Image class="rounded-full" 
            src="/hikeko_logo.png"
            alt="HikeKo Logo" 
            width={90} 
            height={70}   />        
            <span className="text-justify">
            HikeKo Admin
        </span>
    </Link>
    );
}