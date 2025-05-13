import './Displays.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import LeftBar from '../LeftBar/LeftBar';


export default function Displays() {
    return (
      <div className="displays">
        <div className='displays-main'>
          <Navbar />

          {/* Main Container */}
          <div className="displays-main-container">
              {/* Left Bar */}
              <LeftBar />

              {/* Display Outlet */}
              <Outlet />
          </div>
        </div>
      </div>
    );
}