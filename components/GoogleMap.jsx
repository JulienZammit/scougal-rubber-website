import React from 'react';

const GoogleMap = ({ src, address }) => {
  return (
    <div className="rounded-[5px] border-4 border-white shadow-lg overflow-hidden">
      <iframe
        src={src}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="bg-white p-2 text-center font-bold">{address}</div>
    </div>
  );
};

export default GoogleMap;
