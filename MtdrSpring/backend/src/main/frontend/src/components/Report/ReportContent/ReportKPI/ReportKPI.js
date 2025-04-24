import './ReportKPI.css';
import { useState} from 'react';
import { Arrow_Down_Icon, Arrow_Up_Icon } from '../../../../Icons';

export default function ReportKPI() {

    const [hideKPIs, setHideKPIs] = useState(false);

    return (
        <div className='kpi-main-content-container'>
            
            {/* Title Container */}
            <div className='kpi-title-container'>

                {/* Title Text */}
                <p className='kpi-title-text'>Key Performance Indicators</p>

                {/* Generate Report Data */}
                <div className='report-generate-button-container'>
                        <button className='report-generate-button'>
                            <p className='report-generate-button-text'>Generate report</p>
                        </button>
                </div>

            </div>

            {/* KPI Cards Container */}
            <div className='kpi-main-container'>

                {/* Title Container */}
                <div className='kpi-title-section-container'>

                    {/* Title Text */}
                    <p className='kpi-title-section-text'>Tasks</p>

                    {/* Hidden | Unhidden Button */}
                    <button 
                    className='kpi-title-section-button'
                    onClick={() => setHideKPIs(!hideKPIs)}>
                        {hideKPIs ?
                            <Arrow_Up_Icon w='25px' h='25px' />
                            :
                            <Arrow_Down_Icon w='25px' h='25px' />
                        }
                    </button>
                </div>

            </div>

            {/* KPI Cards Container */}
            <div className='kpi-main-container'>

                {/* Title Container */}
                <div className='kpi-title-section-container'>

                    {/* Title Text */}
                    <p className='kpi-title-section-text'>Hours</p>
                    
                    {/* Hidden | Unhidden Button */}
                    <button 
                    className='kpi-title-section-button'
                    onClick={() => setHideKPIs(!hideKPIs)}>
                        {hideKPIs ?
                            <Arrow_Up_Icon w='25px' h='25px' />
                            :
                            <Arrow_Down_Icon w='25px' h='25px' />
                        }
                    </button>
                </div>

            </div>
            

        </div>
    );
}
    