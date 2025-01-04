"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Navbar from "../components/navbar";
import axios from 'axios';
import { MdOutlineClose } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

export default function Maps() {
  const [apiKey, setApiKey] = useState('');
  const [images, setImages] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popup, setOpenPopup] = useState(false);
  const [selectedimage, setSelectedimage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load API key and data in parallel
    const loadData = async () => {
      try {
        setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
        const response = await axios.get("http://127.0.0.1:8000/api/picture/pictures/");
        setImages(response.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const openPopup = (img) => {
    setOpenPopup(true);
    setSelectedimage(img);
  };

  const closePopup = () => {
    setOpenPopup(false);
    setSelectedimage(null);
  };

  if (isLoading || !apiKey) {
    return (
      <>
        <Navbar />
        <div className="w-full h-[92vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <APIProvider apiKey={apiKey}>
        <div className="w-full h-[92vh]">
        <Map 
          defaultZoom={5} 
          defaultCenter={{lat: 35.1341250981558, lng: -114}} 
          mapId={"87cd24d46574a1b1"}
          
          >
            {images.filter((image) => image.latitude !== null && image.longitude !== null)
            .map((image, index) => (
              <div key={index}>
                <AdvancedMarker
                  position={{
                    lat: parseFloat(image.latitude),
                    lng: parseFloat(image.longitude)
                  }}
                  onClick={() => setSelectedMarker(image)}
                >
                  <Pin
                    background={"orange"}
                    borderColor={"black"}
                    glyphColor={"white"}
                  />
                </AdvancedMarker>
                {(selectedMarker === image) && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(image.latitude),
                      lng: parseFloat(image.longitude)
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="w-[300px] h-[300px]">
                      <img 
                        src={image.image} 
                        alt={image.description} 
                        className="w-[300px] h-[240px] object-cover mb-2 rounded cursor-pointer"
                        onClick={() => openPopup(image.image)}
                      />
                      <h2 className="text-lg font-semibold mb-1">{image.description}</h2>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(image.date_taken).toLocaleDateString()}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </div>
            ))}
          </Map>
        </div>
      </APIProvider>

      {popup && (
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closePopup} 
        >
          <div 
            className="bg-white p-4 rounded-lg relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <MdOutlineClose
              onClick={closePopup}
              className="absolute top-5 right-5 text-2xl text-gray-900 bg-white bg-opacity-20 hover:scale-110 transition-transform duration-200 rounded-full cursor-pointer"
            />
            <img 
              src={selectedimage} 
              alt="Full-size" 
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}