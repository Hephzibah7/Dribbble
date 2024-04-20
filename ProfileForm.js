import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileForm = () => {

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
   
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      console.log(image);
      // Send image and location data to the backend
      const formData = new FormData();
      formData.append('image', image); // Append the image data to the form data
      formData.append('location', location); // Append the location to the form data

      // Send the form data to the backend using Axios
      const response = await axios.post('http://localhost:9002/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      });

      console.log(response.data); // Log the response from the backend
      alert('Profile data saved successfully');
     
      navigate('/SimpleCard'); // Navigate to the next page
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile data');
    }
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-center lg:min-h-screen bg-white-100">
      {/* Dribble logo */}
      {/* <div className="lg:absolute lg:top-0 lg:left-0 lg:p-4">
        <h1 className='text-3xl text-pink-500 font-bold'>Dribbble</h1>
      </div> */}
       
      {/* Form section */}
      <div className="pt-10 pl-2 pr-2  lg:flex-column lg:absolute lg:top-15">
        <h1 className="pb-2 w-10/12 text-3xl font-bold lg:w-full lg:text-5xl lg:font-bold lg:mb-2">Welcome! Let's create your profile</h1>
        <p className="pb-5 w-10/12 lg:text-sm lg:text-gray-600 lg:mb-11">Let others get to know you better! You can do these later</p>


        <div className="pl-20 ml-10 lg:-ml-20 lg:-pl-9 lg:mt-7 lg:mb-7">
      <h2 className="mt-10 mb-2 pl-1 text-2xl    lg:text-2xl font-bold lg:mb-4">Add an Avatar</h2>
      <div className=' lg:flex lg:relative '>
      {/* Large circle with dotted borders and camera icon */}
      <div className="ml-7 mt-5 mb-5 w-32 h-32     lg:-ml-2 lg:relative lg:w-52 lg:h-52 lg:mt-5 lg:mb-4 lg:mr-5 border border-dotted border-gray-500 rounded-full flex items-center justify-center">
        {image ? (
           <img src={image} className="w-full h-full   lg:w-full lg:h-full rounded-full object-cover" alt="Avatar" />
        ):(
        <label htmlFor="avatar" className="-mt-20 pb-20 absolute inset-0 flex items-center justify-center lg:mt-10 lg:pt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4zM2 6a2 2 0 012-2h1.465a4 4 0 017.07 0H18a2 2 0 012 2v8a2 2 0 01-2 2h-1.465a4 4 0 01-7.07 0H4a2 2 0 01-2-2V6zm4 1a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        </label>
)}
      </div>

      {/* Choose an image and defaults */}
      <div className='hidden lg:block lg:relative lg:top-10 lg:left-1 lg:ml-5'>
      {/* <p className="text-sm  text-black-600 mb-10">Choose an image</p> */}
      <input name= "image" onChange={handleFileChange} type="file" id="avatar" className="lg:mb-5" />
      <p className="text-xs  text-gray-500">or choose one of the defaults</p>
      </div>
      </div>
      
    </div>

        {/* Add Location section */}
        <div className="mt-20 mb-10 lg:mt-20 lg:mb-9">
          <label htmlFor="location" className="mb-3 text-2xl block font-bold lg:mb-5">Add your location</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="border-b border-gray-300 w-full px-3 py-2" placeholder="Enter a location" />
        </div>

        {/* Next button */}
        <button onClick={handleSubmit} className=" w-full lg:w-1/3 bg-pink-500 text-white px-4 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
}

export default ProfileForm;
