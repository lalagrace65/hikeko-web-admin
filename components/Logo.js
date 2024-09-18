import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Logo() {
    const [systemName, setSystemName] = useState("HikeKo Admin");
    const [systemImage, setSystemImage] = useState("/hikeko_logo.png");

    useEffect(() => {
        // Fetch the system settings from the API
        axios.get('/api/systemSettings')
            .then(response => {
                if (response.data) {
                    setSystemName(response.data.systemName || "HikeKo Admin");
                    setSystemImage(response.data.systemImage || "/hikeko_logo.png");
                }
            })
            .catch(error => {
                console.error('Error fetching system settings', error);
            });
    }, []);

    return (
        <Link href={'/'} className="flex gap-1">
            <Image
                src={systemImage}
                alt={`${systemName} Logo`}
                width={90}
                height={70} 
            />
            <span className="text-justify">
                {systemName}
            </span>
        </Link>
    );
}
