import React, { useState } from 'react';
import './TasksCompletedKPI.css';

export default function TasksCompletedKPI({ data, moduleData, teamFilter, membersAvailable }) {
    const [maxTasksCompleted, setMaxTasksCompleted] = useState(0);

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
        const tasksCompleted = {};
        sprintNames.forEach(sprint => {
            tasksCompleted[sprint] = {};
            membersAvailable.forEach(member => {
                tasksCompleted[sprint][member] = 0;
            });
        });

        if (teamFilter != 'default') {
            data.filter((user) => {
                return user.teamId == teamFilter
            })
            .map((user) => {
                user.tasksCompleted.map((task) => {
                    const sprint = `${task.moduleId}`;
                    const member = membersAvailable[task.responsible - 1];
                    tasksCompleted[sprint][member] += 1;
                    if (tasksCompleted[sprint][member] > maxTasksCompleted) {
                        setMaxTasksCompleted(tasksCompleted[sprint][member]);
                    }
                })
            })
        }
        
        return tasksCompleted;
    };

    const chartData = processData();
    const sprintNames = Object.keys(chartData);

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
            {membersAvailable.map((member, memberIndex) => (
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
                <div className="worked-hours-y-axis-title">Tasks</div>
                {Array.from({ length: 5 }, (_, i) => {
                    const step = maxTasksCompleted / 4;
                    const value = Math.round(maxTasksCompleted - i * step);
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
                        {membersAvailable.map((member, memberIndex) => (
                        <div key={`${sprint}-${member}`} className="bar-container">
                            <div 
                                className="bar"
                                style={{ 
                                    height: `${(chartData[sprint][member] / maxTasksCompleted) * 100}%`,
                                    backgroundColor: memberColors[memberIndex]
                                }}
                                title={`${chartData[sprint][member]} tasks`}
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