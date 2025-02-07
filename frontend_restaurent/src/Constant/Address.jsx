import React from 'react'
import { useEffect, useState } from 'react';

const Address = ({adress}) => {
    const [adressnames, setadressnames] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

    const handleChange = (e) => {
      setSelectedAddress(e.target.value);
    };
    useEffect(() => {
        const names = adress.map((item) => item.addressname); 
        setadressnames(names); 
    }, [adress]);
    useEffect(() => {
        if (adressnames.length > 0) {
          setSelectedAddress(adressnames[0]);
        }
      }, [adressnames]);

    const selectedDetails = adress.find(
        (item) => item.addressname === selectedAddress
      );
    
    
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-300 rounded-md shadow-sm p-2 max-w-[60vw] sm:max-w-lg mx-auto">
            <span className="hidden sm:block">
        <lord-icon
            src="https://cdn.lordicon.com/dhmavvpz.json"
            trigger="loop"
            colors="primary:#121331,secondary:#ee8f66"
            style={{ width: "50px", height: "50px" }}
        ></lord-icon></span>
        
        <div
        style={{ width: 'calc(100% - 80px)' }} 
        className="flex flex-col sm:flex-row items-center gap-2  ">
            <select
                onChange={handleChange}
                value={selectedAddress}
                className="px-3 cursor-pointer py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-orange-400 focus:outline-none w-full sm:w-auto"
            >
                <option value="" disabled className="text-gray-400">
                    -- Select Address --
                </option>
                {adressnames.map((item) => (
                    <option key={item} value={item} className="text-gray-700">
                        {item}
                    </option>
                ))}
            </select>
    
            <span className="text-gray-600 text-sm w-full sm:w-auto min-w-0 truncate">
                {selectedDetails
                    ? `${selectedDetails.street}, ${selectedDetails.city}, ${selectedDetails.state}, ${selectedDetails.zip}`
                    : "Select an address to see details"}
            </span>
        </div>
    </div>
    
    
    )
}

export default Address
