import './ReportContent.css';
import { useState, useEffect } from 'react';
import ReportSpecific from './ReportSpecific/ReportSpecific';
import ReportTeam from './ReportTeam/ReportTeam';
import ReportGeneral from './ReportGeneral/ReportGeneral';

export default function ReportContent({ data, moduleData }) {
    const [viewSelected, setViewSelected] = useState('ReportSpecific');
    return (
        <>
            {/* Report Nav */}
            <div className='report-content-main-container'>
                <div className='report-content-nav-main-container'>
                    {/* Title Nav */}
                    <h1 className='report-content-nav-main-container-text'>Report Type</h1>

                    {/* Nav Buttons */}
                    <div className='report-content-nav-container'>
                        <button onClick={() => setViewSelected('ReportSpecific')}>
                            <p className={`report-content-nav-text ${viewSelected == 'ReportSpecific' ? 'report-content-selected' : ''}`}>Specific</p>
                        </button>
                        <button onClick={() => setViewSelected('ReportTeam')}>
                            <p className={`report-content-nav-text ${viewSelected == 'ReportTeam' ? 'report-content-selected' : ''}`}>Team</p>
                        </button>
                        <button onClick={() => setViewSelected('ReportGeneral')}>
                            <p className={`report-content-nav-text ${viewSelected == 'ReportGeneral' ? 'report-content-selected' : ''}`}>General</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            {viewSelected == 'ReportSpecific' &&
                <ReportSpecific data={data} moduleData={moduleData} />
            }
            {viewSelected == 'ReportTeam' &&
                <ReportTeam data={data} moduleData={moduleData} />
            }
            {viewSelected == 'ReportGeneral' &&
                <ReportGeneral data={data} moduleData={moduleData} />
            }
        </>
    );
}