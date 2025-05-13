import './ReportGeneral.css';
import { useState, useEffect } from 'react';

export default function ReportGeneral({ data, moduleData }) {
    
    return (
        <div className='report-main-content-container'>
            {/* Title Container */}
            <div className='report-title-container'>
                {/* Title Text */}
                <p className='report-title-text'>General Report</p>
            </div>
        </div>
    );
}