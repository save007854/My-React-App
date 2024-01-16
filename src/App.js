import React, { useEffect, useRef } from 'react';

const App = () => {
  const videoRef = useRef();

  useEffect(() => {
    const cctvURL = 'rtsp://touch:Touch1234@f03e0ec59b99.sn.mynetname.net:5555';

    const updateCCTVStream = () => {
      videoRef.current.src = `${cctvURL}?${Date.now()}`;
    };

    // Update every 5 seconds (adjust as needed)
    const intervalId = setInterval(updateCCTVStream, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>CCTV Real-time Viewer with React</h1>
      <video ref={videoRef} controls width="640" height="360" alt="CCTV Stream">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default App;
