import GoogleAddressSearch from '@/components/GoogleAddressSearch';
import { Button } from '@mui/material';
import React,{useState} from 'react'
import { RiSupabaseFill } from 'react-icons/ri';
import axios from 'axios';
import Layout from '@/components/Layout';

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const[coordinates,setCoordinates] = useState(null);

  const nextHandler = async () => {
    console.log("Selected Address:", selectedAddress);
  console.log("Coordinates:", coordinates);

    if (!selectedAddress || !coordinates) {
      console.log("Address or coordinates are missing");
      return;
    }

    try {
      const response = await axios.post('/api/listings', {
        address: selectedAddress.label,
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        createdBy: 'user@example.com' // Replace with actual user email or ID
      });

      if (response.status === 20) {
        console.log("New listing added", response.data);
      }
    } catch (error) {
      console.error("Error adding listing", error);
    }
  }
  {/*
  const nextHandler =async () => {
    console.log(selectedAddress,coordinates);
     
    const{data, error} = await supabase
    .from('listings')
    .insert([
    {
      address: selectedAddress.label,
      coordinates: coordinates
      createdBy:user?.primaryEmailAddress.primaryEmailAddress
    },
    ])
    .select();
    if(data){
      console.log("New listing added",data);
    }
    if(error){
      console.log("Error",error);
    }
      */}
  
  return (
    <Layout>
    <div className='mt-10 md:mx-56 lg:mx-80'>
    <div className='p-10 flex flex-col gap-4 items-center justify-center'>
        <h2 className='font-bold text-2xl'>Add new Listing</h2>
        <div className='p-10 px-27 rounded-lg border w-full shadow md flex flex-col gap-4'>
          <h2 className='text-gray-500'>Enter Address which you want</h2>
          <GoogleAddressSearch 
            setSelectedAddress={setSelectedAddress} 
            setCoordinates={setCoordinates}
          />
          
            <Button
              //disabled={!selectedAddress || !coordinates}
                onClick={nextHandler}  
            >Save</Button>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default AddNewListing