import React, { useState, useEffect, useRef } from 'react';
import './WorkedHoursKPI.css';

export default function WorkedHoursKPI({ data, moduleData, tasksData, membersAvailable }) {
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
        const teamMembers = membersAvailable;
        
        const hoursWorked = {};
        sprintNames.forEach(sprint => {
            hoursWorked[sprint] = {};
            teamMembers.forEach(member => {
                hoursWorked[sprint][member] = 0;
            });
        });

        if (tasksData.length > 0) {
            tasksData.forEach(task => {
                if (task.actualTime) {
                    const sprint = `${task.moduleId}`;
                    const member = teamMembers[task.responsible - 1];
                    hoursWorked[sprint][member] += task.actualTime;
                }
                if (task.actualTime > maxHours) {
                    setMaxHours(task.actualTime);
                }
            });
        }
        
        return hoursWorked;
    };

    const chartData = processData();
    const sprintNames = Object.keys(chartData);
    const teamMembers = Object.keys(chartData[sprintNames[0]]);

    const memberColors = [
        "#7BAAF7", "#34A853", "#1A73E8", "#7986CB", "#FBBC05",
        "#EA4335", "#FF7043", "#F57C00", "#AB47BC", "#8E24AA",
        "#FF7043", "#F06292", "#FFB74D", "#FFD54F", "#64B5F6",
        "#4DB6AC", "#81C784", "#FF8A65", "#4285F4", "#90CAF9",
    ];

    return (
        <div className="worked-hours-kpi">
        {/* Chart legend */}
        <div className="chart-legend">
            {teamMembers.map((member, memberIndex) => (
            <div key={member} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: memberColors[memberIndex] }}></div>
                <div className="legend-label">{member}</div>
            </div>
            ))}
        </div>
        
        {/* Bar chart */}
        <div className="chart-container">
            {/* Y-axis labels */}
            <div className="worked-hours-y-axis">
                <div className="worked-hours-y-axis-title">Hours</div>
                {Array.from({ length: 5 }, (_, i) => {
                    const step = maxHours / 4;
                    const value = Math.round(maxHours - i * step);
                    return (
                        <div key={i} className="worked-hours-y-label">
                            {value}
                        </div>
                    );
                })}
            </div>
            
            {/* Chart bars */}
            <div className="worked-hours-chart-grid">
                {/* Grid lines */}
                <div className="worked-hours-grid-lines">
                    {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="worked-hours-grid-line"></div>
                    ))}
                </div>

                {/* Bars */}
                <div className="worked-hours-bars-container">
                    {sprintNames.map(sprint => (
                    <div key={sprint} className="sprint-group">
                        {teamMembers.map((member, memberIndex) => (
                        <div key={`${sprint}-${member}`} className="bar-container">
                            <div 
                                className="bar"
                                style={{ 
                                    height: `${(chartData[sprint][member] / maxHours) * 100}%`,
                                    backgroundColor: memberColors[memberIndex]
                                }}
                                title={`${chartData[sprint][member]} hours`}
                            >
                            </div>
                        </div>
                        ))}
                        <div className="sprint-label">{`Sprint ${sprint}`}</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}