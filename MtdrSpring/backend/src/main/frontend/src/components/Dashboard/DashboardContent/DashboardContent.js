import './DashboardContent.css'
import DashboardInput from '../DashboardInput/DashboardInput';

export default function DashboardContent() {
    return (
        <div className="dashboard-main-content">
            <div className='dashboard-main-content-container'>
                {/* Welcome Text */}
                <p className='welcome-text'>Welcome Back Santiago!</p>

                {/* Title & Recommendation Button */}
                <div className='dashboard-title-container'>
                    {/* Title Text */}
                    <p className='dashboard-title-text'>Dashboard</p>

                    {/* Recommendation Button */}
                    <button className='recommendation-button'>
                        <p className='recommendation-button-text'>Recommendation</p>
                    </button>
                </div>

                {/* Dashboard Input */}
                <DashboardInput />

                {/* To Do Table */}
            </div>
        </div>
    );
}