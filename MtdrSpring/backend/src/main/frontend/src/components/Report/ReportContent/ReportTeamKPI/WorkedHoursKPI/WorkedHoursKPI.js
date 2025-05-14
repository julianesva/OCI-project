import React, { useEffect, useRef } from 'react';
import './WorkedHoursKPI.css';

export default function WorkedHoursKPI({ data, moduleData, teamFilter, membersAvailable }) {
  // Sample data matching the chart image
  const sampleData = {
    "Sprint 1": {
      "Juan": 35,
      "Mary": 30,
      "Luis": 40,
      "Jose": 28
    },
    "Sprint 2": {
      "Juan": 40,
      "Mary": 32,
      "Luis": 38,
      "Jose": 30
    },
    "Sprint 3": {
      "Juan": 38,
      "Mary": 35,
      "Luis": 36,
      "Jose": 33
    },
    "Sprint 4": {
      "Juan": 42,
      "Mary": 34,
      "Luis": 39,
      "Jose": 31
    }
  };

  // Calculate max hours for scaling the bars
  const maxHours = 45; // Based on the chart Y-axis maximum

  // Create data from user data or use sample data if not available
  const processData = () => {
    if (!data || !data.tasks || !Array.isArray(data.tasks)) {
      return sampleData;
    }

    try {
      // Define sprint names
      const sprintNames = ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"];
      
      // Define team members (use from the data when possible)
      const teamMembers = ["Juan", "Mary", "Luis", "Jose"];
      
      // Initialize hours worked structure
      const hoursWorked = {};
      sprintNames.forEach(sprint => {
        hoursWorked[sprint] = {};
        teamMembers.forEach(member => {
          hoursWorked[sprint][member] = 0;
        });
      });

      // Add the current user's data if available
      if (data.tasks) {
        // Determine sprint based on task creation date
        data.tasks.forEach(task => {
          if (task.actualTime) {
            const creationDate = new Date(task.creation_ts);
            // Simplified sprint assignment for demo purposes
            const monthIndex = creationDate.getMonth();
            const sprintIndex = Math.min(3, Math.floor(monthIndex % 4));
            const sprint = `Sprint ${sprintIndex + 1}`;
            
            // For demo purposes, assign tasks to different team members
            // In a real app, you'd map task.responsible to actual team members
            const responsibleIndex = task.id % 4;
            const member = teamMembers[responsibleIndex];
            
            // Add hours to that member's sprint total
            hoursWorked[sprint][member] += task.actualTime;
          }
        });
      }

      // Fill in any missing data with sample data
      sprintNames.forEach(sprint => {
        teamMembers.forEach(member => {
          if (!hoursWorked[sprint][member]) {
            hoursWorked[sprint][member] = sampleData[sprint][member];
          }
        });
      });

      return hoursWorked;
    } catch (error) {
      console.error("Error processing data:", error);
      return sampleData;
    }
  };

  const chartData = processData();
  const sprintNames = Object.keys(chartData);
  const teamMembers = Object.keys(chartData[sprintNames[0]]);

  // Define colors for each team member
  const memberColors = {
    "Juan": "#4285F4",  // Light blue
    "Mary": "#34A853",  // Green
    "Luis": "#1A73E8",  // Dark blue
    "Jose": "#7BAAF7",  // Light sky blue
  };

  return (
    <div className="worked-hours-kpi">
      {/* Chart legend */}
      <div className="chart-legend">
        {teamMembers.map(member => (
          <div key={member} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: memberColors[member] }}></div>
            <div className="legend-label">{member}</div>
          </div>
        ))}
      </div>
      
      {/* Bar chart */}
      <div className="chart-container">
        {/* Y-axis labels */}
        <div className="worked-hours-y-axis">
            <div className="worked-hours-y-axis-title">Hours</div>
            {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="worked-hours-y-label">
                    {40 - i * 10}
                </div>
            ))}
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
                    {teamMembers.map(member => (
                    <div key={`${sprint}-${member}`} className="bar-container">
                        <div 
                            className="bar"
                            style={{ 
                                height: `${(chartData[sprint][member] / maxHours) * 100}%`,
                                backgroundColor: memberColors[member]
                            }}
                            title={`${chartData[sprint][member]} hours`}
                        >
                        </div>
                    </div>
                    ))}
                    <div className="sprint-label">{sprint}</div>
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}