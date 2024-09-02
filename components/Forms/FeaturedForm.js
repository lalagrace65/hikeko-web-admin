import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import { ReactSortable } from "react-sortablejs";

export default function FeaturedForm({
    _id,
    titleText_1:existingTitleText_1,
    description_1:existingDescription_1,
    bannerImage_1:existingBannerImage_1,
    titleText_2:existingTitleText_2,
    description_2:existingDescription_2,
    bannerImage_2:existingBannerImage_2,
    titleText_3:existingTitleText_3,
    description_3:existingDescription_3,
    bannerImage_3:existingBannerImage_3,

    
}){
    const[titleText_1, setTitleText_1] = useState(existingTitleText_1 || '');
    const[description_1,setDescription_1] = useState(existingDescription_1 || '');
    const[bannerImage_1,setBannerImage_1] = useState(existingBannerImage_1 || []);
    const[titleText_2, setTitleText_2] = useState(existingTitleText_2 || '');
    const[description_2,setDescription_2] = useState(existingDescription_2 || '');
    const[bannerImage_2,setBannerImage_2] = useState(existingBannerImage_2 || []);
    const[titleText_3, setTitleText_3] = useState(existingTitleText_3 || '');
    const[description_3,setDescription_3] = useState(existingDescription_3 || '');
    const[bannerImage_3,setBannerImage_3] = useState(existingBannerImage_3 || []);

    const[goToFeature, setGoToFeature] = useState(false);
    const[isUploading1,setIsUploading1] = useState(false);
    const[isUploading2,setIsUploading2] = useState(false);
    const[isUploading3,setIsUploading3] = useState(false);

    const router = useRouter();
    
    async function saveFeature(ev){
        ev.preventDefault();
        const data = {titleText_1,description_1,bannerImage_1,
            titleText_2,description_2,bannerImage_2,
            titleText_3,description_3,bannerImage_3};
        if (_id){
            //update 
            await axios.put('/api/features', {...data,_id});
        }else{
            //create
            await axios.post('/api/features', data);
        }
        //redirect to Feature - meaning updated
        setGoToFeature(true);
    }
    
    if (goToFeature){
        router.push('/features') ;
    }
    
    async function uploadImages1(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading1(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setBannerImage_1(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading1(false);
        }
    }

    async function uploadImages2(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading2(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setBannerImage_2(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading2(false);
        }
    }

    async function uploadImages3(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading3(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setBannerImage_3(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading3(false);
        }
    }

    function updateBannerImage1Order(bannerImage_1) {
        setBannerImage_1(bannerImage_1);
    }

    function updateBannerImage2Order(bannerImage_2) {
        setBannerImage_2(bannerImage_2);
    }

    function updateBannerImage3Order(bannerImage_3) {
        setBannerImage_3(bannerImage_3);
    }


    
    return (
        
            <form onSubmit={saveFeature}>
            <label>Header 1</label>
                <input 
                    type="text" 
                    placeholder="title 1"
                    value={titleText_1}
                    onChange={ev => setTitleText_1(ev.target.value)}
                />
            <label>Description 1</label>
                <textarea 
                    placeholder="description 1" 
                    value={description_1} 
                    onChange={ev => setDescription_1(ev.target.value)}
                />
            <label>Banner Image 1</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={bannerImage_1}
                    className="flex flex-wrap gap-1"
                    setList={updateBannerImage1Order}>
                    {!!bannerImage_1?.length && bannerImage_1.map(link => {
                        return(
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        );
                    })}
                </ReactSortable>
                {isUploading1 && (
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
                    <input type="file" onChange={uploadImages1} className="hidden"/>
                </label>
            </div>
            <label>Header 2</label>
                <input 
                    type="text" 
                    placeholder="title 2"
                    value={titleText_2}
                    onChange={ev => setTitleText_2(ev.target.value)}
                />
            <label>Description 2</label>
                <textarea 
                    placeholder="description 2" 
                    value={description_2} 
                    onChange={ev => setDescription_2(ev.target.value)}
                />
            <label>Banner Image 2</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={bannerImage_2}
                    className="flex flex-wrap gap-1"
                    setList={updateBannerImage2Order}>
                    {!!bannerImage_2?.length && bannerImage_2.map(link => {
                        return(
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        );
                    })}
                </ReactSortable>
                {isUploading2 && (
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
                    <input type="file" onChange={uploadImages2} className="hidden"/>
                </label>
            </div>
            <label>Header 3</label>
                <input 
                    type="text" 
                    placeholder="title 3"
                    value={titleText_3}
                    onChange={ev => setTitleText_3(ev.target.value)}
                />
            <label>Description 3</label>
                <textarea 
                    placeholder="description 3" 
                    value={description_3} 
                    onChange={ev => setDescription_3(ev.target.value)}
                />
            <label>Banner Image 3</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={bannerImage_3}
                    className="flex flex-wrap gap-1"
                    setList={updateBannerImage3Order}>
                    {!!bannerImage_3?.length && bannerImage_3.map(link => {
                        return(
                            <div key={link} className="h-36">
                                <img src ={link} alt="" className="rounded-lg"/>
                            </div>
                        );
                    })}
                </ReactSortable>
                {isUploading3 && (
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
                    <input type="file" onChange={uploadImages3} className="hidden"/>
                </label>
            </div>
            
            <button 
                type= "submit"
                className="btn-primary">Save</button>
            </form>
       
    );
}