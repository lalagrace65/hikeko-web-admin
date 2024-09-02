import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import { ReactSortable } from "react-sortablejs";
import GoogleMapView from "../GoogleMapView";
import { UserLocationContext } from "@/context/UserLocationContext";

// Utility function to parse coordinate strings
function parseCoordinate(coordinate) {
    const [value, direction] = coordinate.split(/°\s*/);
    const number = parseFloat(value);

    if (direction === 'S' || direction === 'W') {
        return -number; // Convert to negative for South and West
    }
    return number;
}

export default function TrailForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    trailClass:existingTrailClass,
    difficultyLevel:existingDifficultyLevel,
    elevation:existingElevation,
    trailImages:existingtTrailImages,
    coordinates: existingCoordinates, 
    category:assignedCategory,
    properties:assignedProperties,
}){
    const[title, setTitle] = useState(existingTitle || '');
    const[description,setDescription] = useState(existingDescription || '');
    const[category,setCategory] = useState(assignedCategory || '');
    const[trailProperties,setTrailProperties] = useState(assignedProperties || {});
    const[price,setPrice] = useState(existingPrice || '');
    const[trailClass,setTrailClass] = useState(existingTrailClass || '');
    const[difficultyLevel,setDifficultyLevel] = useState(existingDifficultyLevel || '');
    const[elevation,setElevation] = useState(existingElevation || '');
    const[trailImages,setTrailImages] = useState(existingtTrailImages || []);
    const[latitude, setLatitude] = useState(existingCoordinates?.lat || '');
    const[longitude, setLongitude] = useState(existingCoordinates?.lng || '');
    
    const[categories,setCategories] = useState([]);
    const[goToTrails, setGoToTrails] = useState(false);
    const[isUploading,setIsUploading] = useState(false);
    const router = useRouter();
    //for category
    useEffect(()=>{
        axios.get('/api/categories').then (result =>{
            setCategories(result.data);
        })
    },[]);
    async function saveTrail(ev){
        ev.preventDefault();
        const data = {title,category,description,price,
            trailClass,difficultyLevel,elevation, 
            properties: trailProperties,
            trailImages, coordinates: {
                lat: parseCoordinate(latitude),  // Parse the latitude input
                lng: parseCoordinate(longitude)  // Parse the longitude input
            }
        };
        if (_id){
            //update 
            await axios.put('/api/trails', {...data,_id});
        }else{
            //create
            await axios.post('/api/trails', data);
        }
        //redirect to Trails - meaning updated
        setGoToTrails(true);
    }
    
    if (goToTrails){
        router.push('/trails') ;
    }
    
    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setTrailImages(oldImages =>{
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateTrailImagesOrder(trailImages){
        setTrailImages(trailImages);
    }
    function setTrailProp(propName, value){
        setTrailProperties(prev => {
            const newTrailProps = {...prev};
            newTrailProps[propName] = value;
            return newTrailProps;
        })
    }
    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        
        // Check if catInfo is defined before accessing properties
        if (catInfo && catInfo.properties) {
            propertiesToFill.push(...catInfo.properties);
        }

        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            if (!parentCat) break; // Exit loop if parent category is not found
            
            catInfo = parentCat;
            
            // Again, check if catInfo is defined before accessing properties
            if (catInfo.properties) {
                propertiesToFill.push(...catInfo.properties);
            }
        }
    }

    return (
        <form onSubmit={saveTrail}>
        <label>Trail Name</label>
            <input 
                type="text" 
                placeholder="trail name"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />
        <label>Category</label>
            <select value={category}
                onChange={ev => setCategory(ev.target.value)}>
            <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(c => (
            <option value={c._id}>{c.name}</option>
            ))}
            </select>
            {propertiesToFill.length >0 && propertiesToFill.map(p => (
                <div className="flex gap-1">
                    <div>{p.name}</div>
                    <select value={trailProperties[p.name]} 
                        onChange={ev =>
                        setTrailProp(p.name,ev.target.value)
                    }>
                        {p.values.map (v => (
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
            <ReactSortable 
                list={trailImages}
                className="flex flex-wrap gap-1"
                setList={updateTrailImagesOrder}>
                {!!trailImages?.length && trailImages.map(link => {
                    return(
                        <div key={link} className="h-36">
                            <img src ={link} alt="" className="rounded-lg"/>
                        </div>
                    );
                })}
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
                <input type="file" onChange={uploadImages} className="hidden"/>
            </label>
        </div>
        <label>Description</label>
            <textarea 
                placeholder="description" 
                value={description} 
                onChange={ev => setDescription(ev.target.value)}
            />
        <label>Price</label>
            <input 
                type="text" 
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
            />
        <label>Trail Class</label>
            <input 
                type="text" 
                placeholder="trail class"
                value={trailClass}
                onChange={ev => setTrailClass(ev.target.value)}
            />
        <label>Difficulty Level</label>
            <input 
                type="text" 
                placeholder="difficulty level"
                value={difficultyLevel}
                onChange={ev => setDifficultyLevel(ev.target.value)}
            />
        <label>Elevation</label>
            <input 
                type="text" 
                placeholder="elevation"
                value={elevation}
                onChange={ev => setElevation(ev.target.value)}
            />
        <label>Latitude</label>
        <input
            type="text"
            placeholder="Latitude (e.g., 14.0379° N)"
            value={latitude}
            onChange={ev => setLatitude(ev.target.value)}
        />
        <label>Longitude</label>
        <input
            type="text"
            placeholder="Longitude (e.g., 120.8061° E)"
            value={longitude}
            onChange={ev => setLongitude(ev.target.value)}
        />
        <label>Map</label>
        <div>
            <UserLocationContext.Provider value={{ userLocation: { lat: parseFloat(latitude), lng: parseFloat(longitude) } }}>
                <GoogleMapView />
            </UserLocationContext.Provider>
        </div>
        <button 
            type= "submit"
            className="btn-primary">Save</button>
        </form>
       
    );
}