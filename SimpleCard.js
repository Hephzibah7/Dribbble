import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Resend } from 'resend';




const SimpleCard = () => {
  const resend = new Resend('re_NapFfwpb_L5MmzwGgWnjq8b5Y7QkFy6QD');
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState([]);
  const [emailSent, setEmailSent] = useState(false); // State to track if email is sent


  const handleCardSelect = (index) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((item) => item !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const load =()=>{
    navigate("/SimpleEmail");
  }


  return (
    <div className="bg-white flex flex-col items-center justify-center mt-20 p-5 lg:p-10">
      {/* Header */}
      <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-10 text-center">What brings you to Dribbble?</h2>
      <p className="text-sm lg:text-base text-gray-500 mb-10 text-center">Select the options that best describe you. Don't worry, you can explore other options later.</p>

      <div className='flex flex-col lg:flex-row gap-5 mb-10 lg:mb-20'>
        <Card className={`border rounded-md text-center w-full lg:w-96 ${selectedCards.includes(0) ? 'border-pink-500' : ''}`}>
          <CardBody>
            <img className="m-3 mx-auto" src="pic1.png" alt="Pic 1"/>
            <Typography variant="h4" color="blue-gray" className="font-bold mb-1">
              I'm a designer looking to share my work
            </Typography>
            <input
              type="checkbox"
              checked={selectedCards.includes(0)}
              onChange={() => handleCardSelect(0)}
              className="mb-4 mx-auto"
            />
          </CardBody>
        </Card>
        <Card className={`border rounded-md text-center w-full lg:w-96 ${selectedCards.includes(1) ? 'border-pink-500' : ''}`}>
          <CardBody>
            <img className='m-3 mx-auto' src="pic2.png" alt="Pic 2"/>
            <Typography variant="h4" color="blue-gray" className="font-bold mb-1">
              I'm looking to hire a designer
            </Typography>
            <input
              type="checkbox"
              checked={selectedCards.includes(1)}
              onChange={() => handleCardSelect(1)}
              className="mb-4 mx-auto"
            />
          </CardBody>
        </Card>
        <Card className={`border rounded-md text-center w-full lg:w-96 ${selectedCards.includes(2) ? 'border-pink-500' : ''}`}>
          <CardBody>
            <img className='m-3 mx-auto' src="pic3.png" alt="Pic 3"/>
            <Typography variant="h4" color="blue-gray" className="font-bold mb-1">
              I'm looking for design inspiration
            </Typography>
            <input
              type="checkbox"
              checked={selectedCards.includes(2)}
              onChange={() => handleCardSelect(2)}
              className="mb-4 mx-auto"
            />
          </CardBody>
        </Card>
      </div>

      {/* Additional Text */}
      {selectedCards.length > 0 && (
        <p className="text-sm font-bold text-black mb-2 text-center">Anything else? You can select multiple</p>
      )}

      {/* Finish Button */}
      <button onClick={load} className="w-full lg:w-2/12 bg-pink-500 text-white px-6 py-3 rounded-md mb-3 lg:mb-0">Finish</button>

      {selectedCards.length > 0 && (
        <div className="text-gray-500 text-center ">or Press RETURN</div>
      )}
    </div>
  );
};

export default SimpleCard;
