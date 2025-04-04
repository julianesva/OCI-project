import './DashboardContent.css'
import { useState, useEffect } from 'react';
import DashboardInput from '../DashboardInput/DashboardInput';
import { tasklist } from '../../../FakeFetchs';
import DashboardTasksTable from '../DashboardTasksTables/DashboardTasksTable';

export default function DashboardContent() {
    const [toDoTasks, setToDoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data...");
        }

        const filterTasks = () => {
            const filteredToDoTasks = tasklist.filter(task => task.done === 0);
            const filteredInProgressTasks = tasklist.filter(task => task.done === 1);
            const filteredDoneTasks = tasklist.filter(task => task.done === 2);
            setToDoTasks(filteredToDoTasks);
            setInProgressTasks(filteredInProgressTasks);
            setDoneTasks(filteredDoneTasks);
        }

        fetchData();
        filterTasks();
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
                    <button className='recommendation-button'>
                        <p className='recommendation-button-text'>Recommendation</p>
                    </button>
                </div>

                {/* Dashboard Input */}
                <DashboardInput />

                {/* To Do Table */}
                <DashboardTasksTable taskList={toDoTasks} title={"To Do"} action={"Start"} />

                {/* In Progress Table */}
                <DashboardTasksTable taskList={inProgressTasks} title={"In Progress"} action={"Done"} />

                {/* Completed Table */}
                <DashboardTasksTable taskList={doneTasks} title={"Completed"} action={"Undo"} />
            </div>
        </div>
    );
}