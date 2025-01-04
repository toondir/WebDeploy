import Navbar from "../components/navbar";
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

import { MdOutlineClose } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';

import PlacesAutocomplete from "../components/PlacesAutocomplete";


"use client";




const libraries = ['places'];


//const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;





function Gallery()
{


  

  
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 37.7749, lng: -122.4194 });
  const mapRef = useRef(null);
  




  

    


  const mapStyles = {
    height: '100%',
    width: '100%'
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkers([newMarker]);

    console.log(newMarker.lat);
    console.log(newMarker.lng);

    setLatitude(newMarker.lat);
    setLongitude(newMarker.lng);
    
    
  };


  useEffect(() => {
    if (markers.length > 0) {
      
      setLatitude(markers[markers.length - 1].lat);
      setLongitude(markers[markers.length - 1].lng);
    } else {
      
      setLatitude("");
      setLongitude("");
    }
  }, [markers]);
  

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentPosition(pos);
          
          setMarkers([pos]);
          mapRef.current?.panTo(pos);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };



  
  

  
 
  

 



  



  

  
  

  //const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 });



   const[pictures, setPictures] = useState([]);

   const[image,setImage] = useState(null);
   const[description,setDescription] = useState("");
   const[date,setDate] = useState();
   const [latitude, setLatitude] = useState("");
   const [longitude, setLongitude] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [API_KEY, setApiKey] = useState('');

   const[popup,setOpenPopup] =useState(false);
   const[selectedimage,setSelectedimage] = useState(null);

   

   


  

  {/*test*/}

  const fetchCountry = async (latitude, longitude) => {
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  
    try {
      const response = await axios.get(url);
      const country = response.data.results[0]?.address_components.find(component =>
        component.types.includes('country'))?.long_name;
      
      return country || 'Country not available';
    } catch (error) {
      console.error('Error fetching country:', error);
      return 'Country not available';
    }
  };

  const [countryData, setCountryData] = useState({});
  const [visitedCountriesCount, setVisitedCountriesCount] = useState(0);

  useEffect(() => {
    const getCountries = async () => {
      const countryPromises = pictures.map(async (picture) => {
        const country = await fetchCountry(picture.latitude, picture.longitude);
        return { [picture.image]: country };
      });

      const countries = await Promise.all(countryPromises);
      const countryObj = countries.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setCountryData(countryObj);
      const uniqueCountries = new Set(Object.values(countryObj));
      const filteredCountries = Array.from(uniqueCountries).filter((country) => country !== 'Country not available');


setVisitedCountriesCount(filteredCountries.length);
    };

    getCountries();
  }, [pictures]);

  




  
  
  

  

    

  
     
   

    
    


    

  


  





  

   const openPopup = (img) =>{
    setOpenPopup(true);
    setSelectedimage(img);

   };

   const closePopup = () => {
    setOpenPopup(false);
    setSelectedimage(null);
  };
  

   

  useEffect(() => {
    const initializeData = async () => {
      try {
        setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
        const response = await axios.get("http://127.0.0.1:8000/api/picture/pictures/");
        
        setPictures(response.data);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

   const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDate("2024-10-31")
    console.log(date);
  
    
    const formData = new FormData();
    formData.append("image", image); 
    formData.append("description", description); 
    formData.append("date_taken", date);


    if (latitude) {
      formData.append("latitude", latitude);
    } else {
      formData.append("latitude", "");
    }
  
    if (longitude) {
      formData.append("longitude", longitude);
    } else {
      formData.append("longitude", "");
    }

    



    
  
    axios
      .post("http://127.0.0.1:8000/api/picture/pictures/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
       
        setPictures([...pictures, response.data]);
        setDescription("");
        setImage(null);
        setDate("");
        setLatitude("");
        setLongitude("");
       
      })
      .catch((error) => {
        console.error("Error posting image:", error);
      });
  };

  const handleDelete = (picture)=>{
    axios.delete(`http://127.0.0.1:8000/api/picture/pictures/${picture.id}/`)
    .then(()=>{
      const updatedPicture = pictures.filter((i) => i.id !== picture.id);
      setPictures(updatedPicture);
    }).catch((error)=>{
      console.error("Error in deletion",error);
    });
    

  };


  if (isLoading || !API_KEY) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  } 
  

   return(
    
    <>
    <Navbar></Navbar>

    <h1  className=" text-6xl font-medium mb-9 mt-9 text-center font-custom text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-500 to-orange-00">Gallery</h1>
    <h1 className="text-gray-400 text-4xl ml-6  font-custom">You have visited {visitedCountriesCount} countries</h1>

    {/*Picture display*/}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 p-4 ml-3">
          {pictures.map((picture) => (
            <div
              key={picture.image}
               className="max-w-[600px] w-full h-[500px] mb-[30px] bg-gray-200 shadow-md rounded-lg overflow-hidden flex flex-col items-center p-2 transform"
            >
              <img
                src={`${picture.image}`}
                alt={picture.description}
                className=" object-cover w-[95%] h-[70%] rounded-lg  cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[102%]"
                onClick={()=>openPopup(picture.image)}
              />
              <h1 className="text-lg font-semibold mt-2 text-center font-custom">{picture.description}</h1>
              <h1 className="text-lg font-semibold mt-2 text-center font-custom">
                Country: {countryData[picture.image] ? countryData[picture.image] : (
                  <div className="animate-pulse flex space-x-4"></div>
                )}
              </h1>
              <h1 className="text-lg font-semibold mt-2 m text-center font-custom">
                Date taken: {new Date(picture.date_taken).toLocaleDateString('en-US') || "Date not available"}
              </h1> 
              
              <button type="button" className="bg-red-500 text-white py-2 px-4 rounded transition ease-in-out duration-300 hover:bg-red-700 font-custom" onClick={()=>handleDelete(picture)} >Delete</button>
            </div>
          ))}
        </div>

        {popup && (
          <div 
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 backdrop-blur-sm  flex justify-center items-center z-50 "
            onClick={closePopup} 
          >
            <div 
              className="bg-white p-4 rounded-lg relative "
              onClick={(e) => e.stopPropagation()} 
            >
              <MdOutlineClose
                onClick={closePopup}
                className="absolute top-5 right-5 text-2xl text-gray-900  bg-white bg-opacity-20 hover:scale-110 transition-transform duration-200 rounded-full cursor-pointer"
              />
              <img 
                src={selectedimage} 
                alt="Full-size" 
                className="max-w-full max-h-[80vh] rounded-lg"
              />
            </div>
          </div>
        )}
        {/*Picture display*/}

        {/*Form*/}

        <div className=" text-center flex items-center justify-center mb-5">
          <form className="p-5 bg-gray-200 rounded  w-[700px] " onSubmit={handleSubmit}>
            <label className="block flex font-medium mb-3">Image</label>
            
            <input
            type = "file"
            accept="image/*"
            className="file-input mb-5 px-4 py-2 bg-indigo-700 text-white font-medium rounded-lg shadow-md transition ease-in-out duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer" 
            onChange={handleImageChange} required
            />

            <label className="block flex mb-3 font-medium">Description</label>
            <textarea
            
            value={description}
              className="block border-2 border-black p-2 rounded-md mt-2 mb-9 w-full h-40"
            
            
            onChange={(e)=>{setDescription(e.target.value); setDate("2024-10-31")}} required
            />

           {/* <label for="date">Taken Date:</label>
            <input type="date" className="block" 
            onChange={(e)=>setDate(e.target.value)}
             />*/ }

             
             {/*Map*/ }
              <div className="flex justify-center items-center mb-9">
                <div className="h-[500px] w-[80%]">
                  <div className="relative h-full w-full rounded-lg overflow-hidden">
                      <LoadScript googleMapsApiKey={API_KEY}  libraries={libraries}>
                        
                      <PlacesAutocomplete setMarkers={setMarkers} mapRef={mapRef}/>
                        <GoogleMap
                          mapContainerStyle={mapStyles}
                          zoom={6}
                          center={currentPosition}
                          onClick={handleMapClick}
                          onLoad={map => {
                            mapRef.current = map;
                          }}
                          options={{
                            zoomControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: true
                          }}
                        >
                          {markers.map((marker, index) => (
                            <Marker
                              key={index}
                              position={marker}
                              animation={google.maps.Animation.DROP}
                            />
                          ))}
                        </GoogleMap>
                      </LoadScript>

                      <button
                        onClick={handleGetCurrentLocation}
                        className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaLocationArrow className="text-blue-500" />
                      </button>
                  </div>

                </div>
              </div>
               {/*Map*/ }
               <div>
                
               </div>

           


            

              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded transition ease-in-out duration-300 hover:bg-blue-700">Upload photo</button>

              


          </form>
          {/*Form*/}



        </div>

      

        


        

    

      

          
     
          
    </>
   );

}


export default Gallery