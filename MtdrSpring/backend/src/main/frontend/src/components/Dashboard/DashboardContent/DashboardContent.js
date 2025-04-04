import './DashboardContent.css'
import DashboardInput from '../DashboardInput/DashboardInput';
import DashboardTasksTable from '../DashboardTasksTables/DashboardTasksTable';
import RecommendationPopup from '../../../RecommendationPopup';

export default function DashboardContent({ tasklist, addItem, isInserting, toggleDone, deleteItem }) {
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
                    <RecommendationPopup items={tasklist} />
                </div>

                {/* Dashboard Input */}
                <DashboardInput addItem={addItem} isInserting={isInserting} />

                {/* To Do Table */}
                <DashboardTasksTable taskList={tasklist} filter={0} title={"To Do"} action={"Start"} toggleDone={toggleDone} deleteItem={deleteItem} />

                {/* In Progress Table */}
                <DashboardTasksTable taskList={tasklist} filter={1} title={"In Progress"} action={"Done"} toggleDone={toggleDone} deleteItem={deleteItem} />

                {/* Completed Table */}
                <DashboardTasksTable taskList={tasklist} filter={2} title={"Completed"} action={"Undo"} toggleDone={toggleDone} deleteItem={deleteItem} />
            </div>
        </div>
    );
}