'use client'

import React from 'react'

export default function Buttons() {
    
        const handleClick = () => {
          console.log("Button clicked!");
        };
      
        return (
          <div>
            <div onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
              Test Button
            </div>
          </div>
        );
     
}

  