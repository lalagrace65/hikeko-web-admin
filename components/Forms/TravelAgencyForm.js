import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import { ReactSortable } from "react-sortablejs";

export default function TravelAgencyForm({
    _id,
    travelAgencyName:existingTravelAgencyName,
    email:existingEmail,
    password:existingPassword,
    confirmPassword:existingConfirmPassword,
    location:existingLocation,
    businessPermit:existingBusinessPermit,
    birCertificate:existingBirCertificate,
    dtiPermit:existingDtiPermit,
    mayorPermit:existingMayorPermit,
    
}){
    const[travelAgencyName, setTravelAgencyName] = useState(existingTravelAgencyName || '');
    const[email,setEmail] = useState(existingEmail || '');
    const[password,setPassword] = useState(existingPassword || '');
    const[confirmPassword,setConfirmPassword] = useState(existingConfirmPassword || '');
    const[location,setLocation] = useState(existingLocation || '');
    const[businessPermit,setBusinessPermit] = useState(existingBusinessPermit || '');
    const[birCertificate,setBirCertificate] = useState(existingBirCertificate || '');
    const[dtiPermit,setDtiPermit] = useState(existingDtiPermit || '');
    const[mayorPermit,setMayorPermit] = useState(existingMayorPermit || '');

    const[goToTravelAgency, setGoToTravelAgency] = useState(false);
    const[isUploading,setIsUploading] = useState(false);
    const router = useRouter();
    
    async function saveTravelAgency(ev){
        ev.preventDefault();
        const data = {travelAgencyName,email,password,confirmPassword,location,
                businessPermit,birCertificate,dtiPermit,mayorPermit};
        if (_id){
            //update 
            await axios.put('/api/travelAgency', {...data,_id});
        }else{
            //create
            await axios.post('/api/travelAgency', data);
        }
        //redirect to TravelAgency - meaning updated
        setGoToTravelAgency(true);
    }
    
    if (goToTravelAgency){
        router.push('/travelAgency') ;
    }
    
    async function uploadImages(ev, setImagesFunction){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImagesFunction(oldImages =>{
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImageOrder(images, setImagesFunction){
        setImagesFunction(images);
    }

    

    return (
        
            <form onSubmit={saveTravelAgency}>
            <label>Travel Agency</label>
                <input 
                    type="text" 
                    placeholder="Travel Agency name"
                    value={travelAgencyName}
                    onChange={ev => setTravelAgencyName(ev.target.value)}
                />
            <label>Email</label>
                <input 
                    type="email" 
                    placeholder="email address"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                />
            <label>Password</label>
                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                />
            <label>Confirm Password</label>
                <input 
                    type="password" 
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={ev => setConfirmPassword(ev.target.value)}
                />
            <label>Location</label>
                <input 
                    type="text" 
                    placeholder="City, Province"
                    value={location}
                    onChange={ev => setLocation(ev.target.value)}
                />
            <label>Business Permit</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={businessPermit}
                    className="flex flex-wrap gap-1"
                    setList={(images) => updateImageOrder(images,setBusinessPermit)}>
                    {!!businessPermit?.length && businessPermit.map(link => (               
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner/>
                    </div>
                )}
                <label className="w-24 h-36 cursor-pointer text-center 
                flex flex-col items-center justify-center text-gray-500
                rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 
                    2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 
                    2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={(ev)=>uploadImages(ev,setBusinessPermit)} className="hidden"/>
                </label>
            </div>
            <label>BIR Certificate</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={birCertificate}
                    className="flex flex-wrap gap-1"
                    setList={(images) => updateImageOrder(images,setBirCertificate)}>
                    {!!birCertificate?.length && birCertificate.map(link => (               
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner/>
                    </div>
                )}
                <label className="w-24 h-36 cursor-pointer text-center 
                flex flex-col items-center justify-center text-gray-500
                rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 
                    2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 
                    2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={(ev)=>uploadImages(ev,setBirCertificate)} className="hidden"/>
                </label>
            </div>
            <label>DTI Permit</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={dtiPermit}
                    className="flex flex-wrap gap-1"
                    setList={(images) => updateImageOrder(images,setDtiPermit)}>
                    {!!dtiPermit?.length && dtiPermit.map(link => (               
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner/>
                    </div>
                )}
                <label className="w-24 h-36 cursor-pointer text-center 
                flex flex-col items-center justify-center text-gray-500
                rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 
                    2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 
                    2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={(ev)=>uploadImages(ev,setDtiPermit)} className="hidden"/>
                </label>
            </div>
            <label>Mayor&apos;s Permit</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={mayorPermit}
                    className="flex flex-wrap gap-1"
                    setList={(images) => updateImageOrder(images,setMayorPermit)}>
                    {!!mayorPermit?.length && mayorPermit.map(link => (               
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner/>
                    </div>
                )}
                <label className="w-24 h-36 cursor-pointer text-center 
                flex flex-col items-center justify-center text-gray-500
                rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 
                    2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 
                    2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={(ev)=>uploadImages(ev,setMayorPermit)} className="hidden"/>
                </label>
            </div>
            <button 
                type= "submit"
                className="btn-primary">Save</button>
            </form>
       
    );
}