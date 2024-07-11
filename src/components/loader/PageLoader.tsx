import React, { useState, useEffect } from "react";

export const PageLoader: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 180);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
      <div className="relative w-24 h-24">
        <div
          className={`absolute inset-0 flex items-center justify-center text-6xl font-bold transition-all duration-500 ease-in-out ${
            rotation % 360 === 0 ? "text-white scale-110" : "text-[#ff5f09]"
          }`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        >
          <span className="inline-block" style={{ transform: 'translateY(-3px)' }}>
            <img src="/images/logo.png" alt="" className="h-[80px] w-[80px] object-cover" />
          </span>
        </div>
        <div
          className={`absolute inset-0 border-4 rounded-full animate-ping ${
            rotation % 360 === 0 ? "border-[#F0CF98]" : "border-[#ff5f09]"
          }`}
        ></div>
      </div>
    </div>
  );
};
