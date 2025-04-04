import './DashboardContent.css'
import { useState, useEffect } from 'react';
import DashboardInput from '../DashboardInput/DashboardInput';
import DashboardTasksTable from '../DashboardTasksTables/DashboardTasksTable';
import RecommendationPopup from '../../../RecommendationPopup';

export default function DashboardContent({ tasklist, addItem, isInserting, toggleDone, deleteItem }) {
    const [toDoTasks, setToDoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        const filterTasks = () => {
            const filteredToDoTasks = tasklist.filter(task => task.done === 0);
            const filteredInProgressTasks = tasklist.filter(task => task.done === 1);
            const filteredDoneTasks = tasklist.filter(task => task.done === 2);
            setToDoTasks(filteredToDoTasks);
            setInProgressTasks(filteredInProgressTasks);
            setDoneTasks(filteredDoneTasks);
        }

        filterTasks(tasklist);
    }, []);

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
                <DashboardTasksTable taskList={toDoTasks} title={"To Do"} action={"Start"} toggleDone={toggleDone} deleteItem={deleteItem} />

                {/* In Progress Table */}
                <DashboardTasksTable taskList={inProgressTasks} title={"In Progress"} action={"Done"} toggleDone={toggleDone} deleteItem={deleteItem} />

                {/* Completed Table */}
                <DashboardTasksTable taskList={doneTasks} title={"Completed"} action={"Undo"} toggleDone={toggleDone} deleteItem={deleteItem} />
            </div>
        </div>
    );
}