import './HoursInvestedKPI.css';
import { useState, useEffect } from 'react';

export default function HoursInvestedKPI({ data, moduleData, teamFilter }) {
    const [hoursPerSprint, setHoursPerSprint] = useState([]);
    const [maxHours, setMaxHours] = useState(0);
    
    useEffect(() => {
        // If teamFilter is "default", don't load any data
        if (teamFilter === "default") {
            setHoursPerSprint([]);
            setMaxHours(0);
            return;
        }
        
        // If no moduleData, return empty
        if (!moduleData || !moduleData.length) {
            setHoursPerSprint([]);
            setMaxHours(0);
            return;
        }
        
        // PROCESSING REAL DATA
        // Create a map to store hours per module ID (sprint)
        const hoursPerModule = {};
        
        // Initialize all modules with 0 hours
        moduleData.forEach(module => {
            hoursPerModule[module.id] = 0;
        });
        
        // Get all tasks from the data
        let allTasks = [];
        
        if (data && data.tasksCompleted && data.tasksCompleted.length > 0) {
            allTasks = [...data.tasksCompleted];
        } else {
            // Collect all tasks from all modules
            allTasks = moduleData.flatMap(module => module.tasks || []);
        }
        
        // Apply team filter if specified (other than "default")
        if (teamFilter && teamFilter !== "default") {
            // Filter by team logic would go here
            // This is a placeholder
        }
        
        // Sum up hours for each module (sprint)
        allTasks.forEach(task => {
            if (task.moduleId && task.actualTime) {
                // If this module exists in our list, add the hours
                if (hoursPerModule.hasOwnProperty(task.moduleId)) {
                    hoursPerModule[task.moduleId] += task.actualTime;
                }
            }
        });
        
        // Convert to array and format for display
        const sprintData = Object.entries(hoursPerModule)
            .map(([moduleId, hours]) => ({
                sprint: `Sprint ${moduleId}`,
                hours,
                moduleId: parseInt(moduleId)
            }))
            .sort((a, b) => a.moduleId - b.moduleId)
            .map(({ sprint, hours }) => ({ sprint, hours }));
        
        setHoursPerSprint(sprintData);
        
        // Calculate max hours for scaling
        const maxValue = Math.max(...sprintData.map(item => item.hours));
        setMaxHours(maxValue > 0 ? maxValue + 2 : 16); // Default to 16 if no data
    }, [data, moduleData, teamFilter]);
    
    // Calculate the height of each bar based on its value
    const calculateBarHeight = (hours) => {
        if (maxHours === 0) return 0;
        return (hours / maxHours) * 100;
    };
    
    return (
        <div className="hours-invested-kpi">
            {/* Legend */}
            <div className="hours-invested-legend">
                <div className="hours-invested-legend-item">
                    <div className="hours-invested-legend-color"></div>
                    <div>Hours Invested</div>
                </div>
            </div>

            <div className="hours-invested-chart-container">
                {/* Y-axis labels */}
                <div className="hours-invested-y-axis">
                    <div className="hours-invested-y-axis-title">Hours</div>
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="hours-invested-y-label">
                            {Math.round(maxHours * (7 - i) / 7)}
                        </div>
                    ))}
                </div>
                
                {/* Chart grid and bars */}
                <div className="hours-invested-chart-grid">
                    {/* Grid lines */}
                    <div className="hours-invested-grid-lines">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="hours-invested-grid-line"></div>
                        ))}
                    </div>
                    
                    {/* Bars */}
                    <div className="hours-invested-bars-container">
                        {hoursPerSprint.map((item, index) => (
                            <div key={index} className="hours-invested-bar-column">
                                <div 
                                    className="hours-invested-bar"
                                    style={{ 
                                        height: `${calculateBarHeight(item.hours)}%`,
                                    }}
                                    title={`${item.hours} hours`}
                                >
                                </div>
                                <div className="hours-invested-x-label">{item.sprint}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}