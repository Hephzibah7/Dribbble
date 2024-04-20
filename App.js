
import ProfileForm from "./ProfileForm";
import SignUp from "./SignUp";
import { UserProvider } from './UserContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SimpleCard from "./SimpleCard";
import SimpleEmail from "./SimpleEmail"
import { Footer } from "./Footer";
import Navbar from "./Navbar";

function App() {
  return (

    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/ProfileForm" element={<><Navbar/><ProfileForm/><Footer/> </>}/>
            <Route exact path="/SimpleCard" element={<><Navbar/><SimpleCard/><Footer/> </>} />
            <Route exact path="/SimpleEmail" element={<><Navbar/><SimpleEmail/><Footer/> </>} />

          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
