import Image from "next/image";
import Link from "next/link";

const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }

export default function Logo(){
    return (
    <Link href={'/'} className="flex gap-1 ">
        <Image
            src="/hikeko_logo.png"
            alt="HikeKo Logo"
            width={90}
            height={70} 
            style={imageStyle} />        
            <span className="text-justify">
            HikeKo Admin
        </span>
    </Link>
    );
}