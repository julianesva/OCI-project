import './ReportKPI.css';
import { useState } from 'react';
import { Arrow_Down_Icon, Arrow_Up_Icon } from '../../../../Icons';

export default function ReportKPI() {
    const [hideTasksKPI, setHideTasksKPI] = useState(false);
    const [hideHoursKPI, setHideHoursKPI] = useState(false);

    return (
        <div className='kpi-main-content-container'>
            {/* Title Sections Container */}
            <div className='kpi-title-sections-container'>
                <p className='kpi-title-sections-text'>Key Performance Indicators</p>
                {/* Generate Report Button */}
                <div className='kpi-generate-report-button-container'>
                    <button className='kpi-generate-report-button'>
                        <p className='kpi-generate-report-button-text'>Generate Report</p>
                    </button>
                </div>
            </div>

            {/* KPI's Sections */}
            <div className='kpi-sections-container'>
                {/* KPI Tasks */}
                <div className='kpi-main-container kpi-first-container'>
                    <div className='kpi-title-container'>
                        <p className='kpi-title-container-text'>Tasks</p>
                        <button
                            className='kpi-title-button'
                            onClick={() => {setHideTasksKPI(!hideTasksKPI)}}
                        >
                            {!hideTasksKPI ?
                                <Arrow_Down_Icon w='25px' h='25px' />
                                :
                                <Arrow_Up_Icon w='25px' h='25px' />
                            }
                        </button>
                    </div>
                </div>

                {/* KPI Hours */}
                <div className='kpi-main-container'>
                    <div className='kpi-title-container'>
                        <p className='kpi-title-container-text'>Hours</p>
                        <button
                            className='kpi-title-button'
                            onClick={() => {setHideHoursKPI(!hideHoursKPI)}}
                        >
                            {!hideHoursKPI ?
                                <Arrow_Down_Icon w='25px' h='25px' />
                                :
                                <Arrow_Up_Icon w='25px' h='25px' />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}