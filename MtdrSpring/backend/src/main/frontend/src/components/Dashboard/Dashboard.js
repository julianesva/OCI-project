import './Dashboard.css'
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardGraphs from './DashboardGraphs/DashboardGraphs';
import API_LIST from '../../API';

export default function Dashboard() {
    const [isLoading, setLoading] = useState(false);
    const [isInserting, setInserting] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState();

    function deleteItem(deleteId) {
      fetch(API_LIST+"/"+deleteId, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(
        (result) => {
          const remainingItems = items.filter(item => item.id !== deleteId);
          setItems(remainingItems);
        },
        (error) => {
          setError(error);
        }
      );
    }

    function toggleDone(event, id, title, description, done, estimatedTime, story_Points ) {
      event.preventDefault();
      modifyItem(id, title, description, done, estimatedTime, story_Points).then(
        (result) => { reloadOneIteam(id); },
        (error) => { setError(error); }
      );
    }

    function modifyItem(id, title, description, done, estimatedTime, story_Points) {
      let data = {
        "title": title,
        "description": description,
        "estimatedTime": estimatedTime,
        "done": done,
        "story_Points": story_Points
      };
      return fetch(API_LIST+"/"+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Something went wrong ...');
        }
      });
    }

    function reloadOneIteam(id){
      fetch(API_LIST+"/"+id)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(
          (result) => {
            const items2 = items.map(
              x => (x.id === id ? {
                 ...x,
                 'title':result.title,
                 'description':result.description,
                 'done': result.done,
                 'creation_ts': result.creation_ts,
                 'estimatedTime': result.estimatedTime,
                 'story_Points': result.story_Points
                } : x));
            setItems(items2);
          },
          (error) => {
            setError(error);
          });
    }
    
    function addItem(task){
      setInserting(true);
      let data = {
        "title": task.title,
        "description": task.description,
        "estimatedTime": task.estimatedTime,
        "done": 0,
        "story_Points": task.story_Points
      };
      
      fetch(API_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then((response) => {
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
            "title": task.title,
            "description": task.text,
            "estimatedTime": task.estimatedTime,
            "done": 0,
            "story_Points": task.storyPoints
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

    useEffect(() => {
      setLoading(true);
      fetch(API_LIST)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong loading the initial charge check useEffect ...');
          }
        })
        .then(
          (result) => {
            console.log("API Response HEREEEEEEEEEEEEE:", result);
            setLoading(false);
            setItems(result);
          },
          (error) => {
            setLoading(false);
            setError(error);
          });
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