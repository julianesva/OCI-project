import './ReportContent.css';
import { useState } from 'react';
import ReportKPI from './ReportKPI/ReportKPI';

export default function ReportContent() {
    const [teamFilter, setModuleFilter] = useState('all');
    const [memberFilter, setMemberFilter] = useState('all');
    const [sprintFilter, setSprintFilter] = useState('all');

    return (
        <div className='report-main-content-container'>
            {/* Title Container */}
            <div className='report-title-container'>
                {/* Title Text */}
                <p className='report-title-text'>Report</p>
            </div>

            {/* Report Selects Team & Member */}
            <div className="filter-team-member-container">
                {/* Select Team */}
                <div className="filter-container">
                    <p className='filter-title-text'>Team:</p>
                    <select className='filter-select' value={teamFilter} onChange={(e) => setModuleFilter(e.target.value)}>
                        <option value="default" disabled selected>Select a Team</option>
                    </select>
                </div>

                {/* Select Member */}
                <div className="filter-container">
                    <p className='filter-title-text'>Member:</p>
                    <select className='filter-select' value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)}>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>

            {/* Select Sprint */}
            <div className="filter-container select-sprint-container">
                <p className='filter-title-text'>Sprint:</p>
                <select className='filter-select' value={sprintFilter} onChange={(e) => setSprintFilter(e.target.value)}>
                    <option value="all">All</option>
                </select>
            </div>

            {/* Report KPI's */}
            <ReportKPI />
        </div>
    );
}