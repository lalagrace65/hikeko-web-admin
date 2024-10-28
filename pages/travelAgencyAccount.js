import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TravelAgency(){
    const [travelAgency, setTravelAgency] = useState([]);
    
    useEffect(() => {
        axios.get('/api/travelAgency').then(response => {
            setTravelAgency(response.data);
        });
    }, []);
    
    return (
        <Layout>
            <Link className="bg-customPrBg rounded-md text-white py-1 px-2" href="/travelAgency/new">Add new travelAgency</Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Travel Agency Name</td>
                        <td>Email</td>
                        <td>Password</td>
                        <td>Location</td>
                        <td>Business Permit</td>
                        <td>BIR Certificate</td>
                        <td>DTI Permit</td>
                        <td>Mayor&apos;s Permit</td>
                        <td>Status</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {travelAgency.map((agency) => (
                        <tr key={agency._id}>
                            <td>{agency.travelAgencyName}</td>
                            <td>{agency.email}</td>
                            <td>{agency.password}</td>
                            <td>{agency.location}</td>
                            <td>{agency.businessPermit.map((link, index) => (
                                <img key={index} src={link} alt="" className="h-20 w-20 object-cover rounded-lg" />
                            ))}</td>
                            <td>{agency.birCertificate.map((link, index) => (
                                <img key={index} src={link} alt="" className="h-20 w-20 object-cover rounded-lg" />
                            ))}</td>
                            <td>{agency.dtiPermit.map((link, index) => (
                                <img key={index} src={link} alt="" className="h-20 w-20 object-cover rounded-lg" />
                            ))}</td>
                            <td>{agency.mayorPermit.map((link, index) => (
                                <img key={index} src={link} alt="" className="h-20 w-20 object-cover rounded-lg" />
                            ))}</td>
                            <td></td>
                            <td>
                                <Link href={`/travelAgency/edit/${agency._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487L18.549 2.799a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Edit
                                </Link>
                                <Link href={`/travelAgency/delete/${agency._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9M9.26 9l-.346 9M19.74 5.79c.342.052.682.107 1.022.166M19.74 5.79L18.16 19.673A2.25 2.25 0 0115.916 21H8.084A2.25 2.25 0 015.84 19.673L4.26 5.79M19.74 5.79a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165M4.26 5.79a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}
