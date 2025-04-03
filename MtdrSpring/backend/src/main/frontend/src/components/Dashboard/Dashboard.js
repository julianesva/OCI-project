import './Dashboard.css'
import Navbar from '../Navbar/Navbar';

export default function Dashboard() {
    return (
        <div className='dashboard-main'>
            <Navbar />

            {/* Main Container */}
            <div className="dashboard-main-container">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}