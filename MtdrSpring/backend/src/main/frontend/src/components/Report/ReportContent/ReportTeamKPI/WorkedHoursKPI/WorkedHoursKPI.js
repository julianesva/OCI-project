import React, { useState } from 'react';

export default function WorkedHoursKPI({ data, moduleData, teamFilter, membersAvailable }) {
    const [maxHours, setMaxHours] = useState(0);

    const getSprintNames = (modules) => {
        const sprints = new Set();
    
        modules.forEach(module => {
            if (module.id) {
                sprints.add(module.id);
            }
        });
    
        return Array.from(sprints).sort((a, b) => a - b);
    };    

    const processData = () => {
        const sprintNames = getSprintNames(moduleData);
        const hoursWorked = {};
        sprintNames.forEach(sprint => {
            hoursWorked[sprint] = {};
            membersAvailable.forEach(member => {
                hoursWorked[sprint][member] = 0;
            });
        });

        if (teamFilter != 'default') {
            data.filter((user) => {
                return user.teamId == teamFilter
            })
            .map((user) => {
                user.tasksCompleted.map((task) => {
                    const sprint = task.moduleId;
                    const member = user.user.username;
                    const taskTimeSum = hoursWorked[sprint][member] + task.actualTime
                    hoursWorked[sprint][member] = taskTimeSum;
                    if (taskTimeSum > maxHours) {
                        setMaxHours(taskTimeSum);
                    }
                })
            })
        }
        
        return hoursWorked;
    };

    const chartData = processData();
    const sprintNames = Object.keys(chartData);

    const memberColors = [
        "#4a90e2", "#50e3c2", "#4178be", "#7fdbfd", "#5F9EA0",
        "#00FFFF", "#FF7F50", "#FF69B4", "#8A2BE2", "#7FFF00",
        "#D2691E", "#FF4500", "#ADFF2F", "#FFD700", "#FF6347",
        "#4682B4", "#FF1493", "#00BFFF", "#00FF7F", "#FF8C00",
    ];

    return (
        <div className="report-team-kpi">
        {/* Chart legend */}
        <div className="report-team-chart-legend">
            {membersAvailable.map((member, memberIndex) => (
            <div key={member} className="report-team-legend-item">
                <div className="report-team-legend-color" style={{ backgroundColor: memberColors[memberIndex] }}></div>
                <div className="report-team-legend-label">{member}</div>
            </div>
            ))}
        </div>
        
        {/* Bar chart */}
        <div className="report-team-chart-container">
            {/* Y-axis labels */}
            <div className="report-team-y-axis">
                <div className="report-team-y-axis-title">Hours</div>
                {Array.from({ length: 5 }, (_, i) => {
                    const step = maxHours / 4;
                    const value = Math.round(maxHours - i * step);
                    return (
                        <div key={i} className="report-team-y-label">
                            {value}
                        </div>
                    );
                })}
            </div>
            
            {/* Chart bars */}
            <div className="report-team-chart-grid">
                {/* Grid lines */}
                <div className="report-team-grid-lines">
                    {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="report-team-grid-line"></div>
                    ))}
                </div>

                {/* Bars */}
                <div className="report-team-bars-container">
                    {sprintNames.map(sprint => (
                    <div key={sprint} className="report-team-sprint-group">
                        {membersAvailable.map((member, memberIndex) => (
                        <div key={`${sprint}-${member}`} className="report-team-bar-container">
                            <div 
                                className="report-team-bar"
                                style={{ 
                                    height: `${(chartData[sprint][member] / maxHours) * 100}%`,
                                    backgroundColor: memberColors[memberIndex]
                                }}
                                title={`${chartData[sprint][member]} hours`}
                            >
                            </div>
                        </div>
                        ))}
                        <div className="report-team-sprint-label">{`Sprint ${sprint}`}</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}