import './ReportTeam.css';
import { useState, useEffect } from 'react';

export default function ReportTeam({ data, moduleData }) {

    return (
        <div className='report-main-content-container'>
            {/* Title Container */}
            <div className='report-title-container'>
                {/* Title Text */}
                <p className='report-title-text'>Team Report</p>
            </div>
        </div>
    );
}