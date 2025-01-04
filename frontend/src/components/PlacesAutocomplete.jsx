import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = ({ setMarkers, mapRef }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      
    },
    debounce: 300,
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setMarkers([{ lat, lng }]);
      mapRef.current?.panTo({ lat, lng });
      mapRef.current?.setZoom(10);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[400px] z-10">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search for a location"
        className="w-full px-4 py-2 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {status === "OK" && (
        <ul className="mt-2 bg-white rounded-lg shadow-lg border border-gray-300 max-h-72 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;