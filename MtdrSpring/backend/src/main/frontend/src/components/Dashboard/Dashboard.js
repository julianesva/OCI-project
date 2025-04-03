import './Dashboard.css'
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardGraphs from './DashboardGraphs/DashboardGraphs';

export default function Dashboard() {
    return (
        <div className='dashboard-main'>
            <div className='dashboard-main-container'>
                {/* Left  */}
                <DashboardContent />

                {/* Right */}
                <DashboardGraphs />
            </div>
        </div>
    );
}