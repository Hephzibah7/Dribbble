import React, { useContext } from 'react';
import UserContext from './UserContext';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const SimpleEmail = () => {
  const { userData } = useContext(UserContext);

  return (
    <div>
    {/* {userData && <p>Email: {userData.email}</p>} */}
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-green-500 text-6xl mb-4"
        />
        <p className="text-lg font-semibold mb-2">
          Email has been successfully verified!
        </p>
        <p className="text-sm text-gray-600">
          A Thank you message has been sent to your email.
        </p>
        <h2>{userData.email}</h2>
      </div>
    </div>
    </div>
  );
};

export default SimpleEmail;
