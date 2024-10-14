import { useState, useRef } from 'react';

function HomePage() {
  const [image, setImage] = useState(null);
  const [frame, setFrame] = useState('JRFwithaifer');
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFrameChange = (frameType) => {
    setFrame(frameType);
  };

  const downloadImage = async () => {
    try {
        const formData = new FormData();
        
        // Convert the data URL to a Blob
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('avatar', blob); // Append the image blob
        formData.append('frame', frame); // Append the frame type

        console.log('Frame type being sent:', frame); // Log the frame type for debugging

        // Send the request to the backend
        const res = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text(); // Get error message from the response
            console.error('Failed to upload image:', res.status, errorText);
            return;
        }

        const data = await res.blob(); 
        const url = URL.createObjectURL(data);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'profile-with-frame.png'; 
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 
    } catch (error) {
        console.error('Error in download:', error);
    }
};

  
  

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-xl font-bold mb-4">Profile Picture Uploader</h1>
      <input 
        type="file" 
        onChange={handleImageChange} 
        accept="image/*"
        className="mb-4 p-2 border border-gray-300 rounded-md cursor-pointer"
      />

      <div className="flex space-x-4 mb-4">
        <button 
          onClick={() => handleFrameChange('JRFwithaifer')} 
          className={`px-4 py-2 rounded-full ${frame === 'JRFwithaifer' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          JRFwithaifer
        </button>
        <button 
          onClick={() => handleFrameChange('NETwithaifer')} 
          className={`px-4 py-2 rounded-full ${frame === 'NETwithaifer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          NETwithaifer
        </button>
      </div>

      <div className="relative w-32 flex items-end h-32 mb-6 border-2 border-dashed border-gray-300 rounded-full overflow-hidden">
  {image && (
    <img
    name="avatar"
      src={image}
      alt="Profile"
      className="absolute w-full "
    />
  )}
  {frame === 'JRFwithaifer' && (
    <img
    src="/JRFwithaifer.png"
    alt="JRFwithaifer"
    className="absolute top-0 left-0 w-full h-full object-cover"
    style={{ transform: 'scale(1.6)', clipPath: 'circle(50%)' }} 
    />
  )}
  {frame === 'NETwithaifer' && (
    <img
    src="/NETwithaifer.png"
    alt="NETwithaifer"
    className="absolute top-0 left-0 w-full h-full object-cover"
    style={{ transform: 'scale(1.6)', clipPath: 'circle(50%)' }} 
    />
  )}
</div>


      {image && frame && (
        <div>
          <canvas ref={canvasRef} width="200" height="200" className="hidden" />
          <button 
            onClick={downloadImage} 
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Download Profile Picture
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
