import './Report.css';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import ReportContent from './ReportContent/ReportContent';

export default function Report() {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    return (
          <div className='report-main'>
              {/* Loading OR report */}
              {isLoading ?
                  // Loading
                  <div className='report-loading'>
                      <CircularProgress />
                  </div>
    
              : error ?
                  // Error
                  <div className='report-error'>
                      <p className='report-error-text'>Error: {error}</p>
                  </div>
    
              :
    
                  // report Main
                  <div className='report-main-container'>
                      <ReportContent />
                  </div>
              }
          </div>
      );
    }

