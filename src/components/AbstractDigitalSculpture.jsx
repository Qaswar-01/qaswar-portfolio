import React, { useRef, useEffect } from 'react';
import '../styles/AbstractDigitalSculpture.css';

const AbstractDigitalSculpture = () => {
  const sculptureRef = useRef(null);

  useEffect(() => {
    // Add gentle floating animation
    const sculpture = sculptureRef.current;
    if (sculpture) {
      sculpture.style.animation = 'floatGentle 6s ease-in-out infinite';
    }
  }, []);

  return (
    <div className="sculpture-container">
      <div className="sculpture-wrapper" ref={sculptureRef}>
        {/* Interlinked Rings */}
        <div className="ring-group">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        {/* Crystal Shards */}
        <div className="crystal-group">
          <div className="crystal crystal-1"></div>
          <div className="crystal crystal-2"></div>
          <div className="crystal crystal-3"></div>
          <div className="crystal crystal-4"></div>
        </div>

        {/* Floating Lines */}
        <div className="lines-group">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
          <div className="line line-4"></div>
          <div className="line line-5"></div>
        </div>

        {/* Connecting Elements */}
        <div className="connector-group">
          <div className="connector connector-1"></div>
          <div className="connector connector-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AbstractDigitalSculpture;