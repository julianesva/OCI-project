import './Report.css';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import ReportContent from './ReportContent/ReportContent';
import { API_TEAM_DATA } from '../../API';

export default function Report() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        // Set loading to true
        setLoading(true);
        // Fetch the report data
        fetch(API_TEAM_DATA)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
            });
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
                      <ReportContent data={data} />
                  </div>
              }
          </div>
      );
}