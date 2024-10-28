import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/menu/Modal";

export default function Trails(){
    const [trails,setTrails] = useState([]);
    const [expandedTrailId, setExpandedTrailId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        axios.get('/api/trails').then(response => {
            setTrails(response.data);
        });
    }, []);
    // Function to toggle the expansion of the description
  const toggleExpand = (trailId) => {
    setExpandedTrailId(expandedTrailId === trailId ? null : trailId);
  };
  const openModal = (imageUrl) => {
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setSelectedImage("");
  };


    return(
        <Layout>
            <Link className="btn-primary" href={'/trails/new'}>Add new trail</Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Trail Image </td>
                        <td>Trail Name </td>
                        <td>Trail Location </td>
                        <td>Trail Class </td>
                        <td>Difficulty Level </td>
                        <td>Elevation</td>
                        <td>Description</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {trails.map(trail => (
                        <tr key={trail._id}>
                            <td>
                                {trail.trailImages.map((link, index) => (
                                    <img
                                        key={index}
                                        src={link}
                                        alt="trail Images"
                                        className="h-20 w-20 object-cover rounded-lg cursor-pointer"
                                        onClick={() => openModal(link)} // Open modal on click
                                    />
                                ))}
                            </td>
                            <td>{trail.title}</td>
                            <td>{trail.trailLocation}</td>
                            <td>{trail.trailClass}</td>
                            <td>{trail.difficultyLevel}</td>
                            <td>{trail.elevation}</td>
                            <td>
                                {expandedTrailId === trail._id ? (
                                  <>
                                    {trail.description}{" "}
                                    <button onClick={() => toggleExpand(trail._id)}  
                                    className="text-customPrBg text-decoration-underline">
                                      Show less
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {trail.description.length > 100
                                      ? `${trail.description.substring(0, 100)}...`
                                      : trail.description}{" "}
                                    {trail.description.length > 100 && (
                                      <button onClick={() => toggleExpand(trail._id)} 
                                        className="text-customPrBg text-decoration-underline">
                                        Read more
                                      </button>
                                    )}
                                  </>
                                )}
                            </td>
                            <td>
                                <Link href={'/trails/edit/'+trail._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} stroke="currentColor" 
                                    className="w-4 h-4">
                                    <path strokeLinecap="round" 
                                    strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 
                                    1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897
                                    1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0
                                    0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 
                                    2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Edit
                                </Link>
                                <Link href={'/trails/delete/'+trail._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} stroke="currentColor" 
                                    className="w-4 h-4">
                                    <path strokeLinecap="round" 
                                    strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 
                                    9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 
                                    19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 
                                    1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 
                                    .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 
                                    0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 
                                    1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal} 
            imageUrl={selectedImage} /> {/* Modal to show selected image */}
        </Layout>
    )
    
}
