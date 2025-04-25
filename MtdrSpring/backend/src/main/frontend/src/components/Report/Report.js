import './Report.css';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import ReportContent from './ReportContent/ReportContent';
import { API_TEAM_DATA, API_MODULES } from '../../API';

export default function Report() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [moduleData, setModuleData] = useState();

    useEffect(async () => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const team_data_response = await fetch(API_TEAM_DATA);
                const team_data = await team_data_response.json();
                const module_data_response = await fetch(API_MODULES);
                const module_data = await module_data_response.json();
                setData(team_data);
                setModuleData(module_data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        await fetchData();
    }, []);

    return (
          <div className='report-main'>
              {/* Loading OR report */}
              {isLoading ?
                  // Loading
                  <div className='report-progress'>
                      <CircularProgress />
                  </div>
    
              : error ?
                  // Error
                  <div className='report-error'>
                      <p className='report-error-text'>Error: {error}</p>
                  </div>
    
              :
    
                  // Report Main
                  <div className='report-main-container'>
                      <ReportContent data={data} moduleData={moduleData} />
                  </div>
              }
          </div>
      );
}