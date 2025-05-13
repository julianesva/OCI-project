import './Displays.css';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import LeftBar from '../LeftBar/LeftBar';


export default function Displays() {
    return (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <div className="displays">
            <div className='displays-main'>
              <Navbar />
              <div className="displays-main-container">
                <LeftBar />
                <Outlet />
              </div>
            </div>
          </div>
        </SignedIn>
      </>
    );
}