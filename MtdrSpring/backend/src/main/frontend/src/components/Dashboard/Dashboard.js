import './Dashboard.css'
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardGraphs from './DashboardGraphs/DashboardGraphs';
import API from '../../API'
import { tasklist } from '../../FakeFetchs'

const { API_LIST, API_MODULES } = API;

export default function Dashboard() {
    const [isLoading, setLoading] = useState(false);
    const [isInserting, setInserting] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState();
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState('all');

    function handleModuleChange(event) {
        setSelectedModule(event.target.value);
    }

    function filteredItems() {
        return selectedModule === 'all' ? items : items.filter(item => item.moduleId === selectedModule);
    }

    function addItem(text){
      console.log("addItem(", text, ")")
      setInserting(true);
      var data = {};
      data.description = text.text;
      data.story_Points = text.storyPoints;
      data.moduleId= text.moduleId; 
      
      fetch(API_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then((response) => {
        // This API doens't return a JSON document
        console.log(response);
        console.log();
        console.log(response.headers.location);
        // return response.json();
        if (response.ok) {
          return response;
        } else {
          throw new Error('Something went wrong ...');
        }
      }).then(
        (result) => {
          var id = result.headers.get('location');
          var newItem = {
            "id": id, 
            "description": text.text, 
            "story_Points": text.storyPoints,
            "module_id": text.moduleId
          }
          setItems([newItem, ...items]);
          setInserting(false);
        },
        (error) => {
          setInserting(false);
          setError(error);
        }
      );
    }

    function toggleDone(event, id, title, description, done, story_Points, estimatedTime) {
      event.preventDefault();
      const data = { title, description, done, story_Points, estimatedTime };
      fetch(`${API_LIST}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(response => response.ok ? response.json() : Promise.reject('Error updating task'))
      .then(updatedItem => {
        setItems(items.map(item => (item.id === id ? updatedItem : item)));
      })
      .catch(error => setError(error));
    }

    function deleteItem(deleteId) {
      fetch(`${API_LIST}/${deleteId}`, { method: 'DELETE' })
      .then(response => response.ok ? response : Promise.reject('Error deleting task'))
      .then(() => {
        setItems(items.filter(item => item.id !== deleteId));
      })
      .catch(error => setError(error));
    }

    useEffect(() => {
        const getFetch = async () => {
            setLoading(true);
            fetch(API_LIST)
                .then(response => response.ok ? response.json() : Promise.reject('Error fetching tasks'))
                .then(result => {
                    setLoading(false);
                    setItems(result);
                })
                .catch(error => {
                    setLoading(false);
                    setError(error);
                });
            
            fetch(API_MODULES)
                .then(response => response.ok ? response.json() : Promise.reject('Error fetching modules'))
                .then(result => setModules(result))
                .catch(error => setError(error));
        }

        const fetchData = async () => {
            setLoading(true);
            console.log("Fetching data...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Data fetched");
            setItems(tasklist);
            setLoading(false);
        }

        // getFetch();
        fetchData();
    }, []);

    return (
        <div className='dashboard-main'>
            {/* Loading OR Dashboard */}
            {isLoading ?
                // Loading
                <div className='dashboard-loading'>
                    <CircularProgress />
                </div>

            : error ?
                // Error
                <div className='dashboard-error'>
                    <p className='dashboard-error-text'>Error: {error}</p>
                </div>

            :

                // Dashboard
                <div className='dashboard-main-container'>
                    {/* Left  */}
                    <DashboardContent tasklist={items} addItem={addItem} isInserting={isInserting} toggleDone={toggleDone} deleteItem={deleteItem} />

                    {/* Right */}
                    <DashboardGraphs />
                </div>
            }
        </div>
    );
}