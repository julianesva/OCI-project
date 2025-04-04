import React, { useState, useEffect } from 'react';
import NewItem from './NewItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TableBody, CircularProgress, Select, MenuItem } from '@mui/material';
import Moment from 'react-moment';
import RecommendationPopup from './RecommendationPopup';
import ORACLEIcon from './assets/ORACLEIcon.png';
import API from './API';

const { API_LIST, API_MODULES } = API;

function App() {
    const [isLoading, setLoading] = useState(false);
    const [isInserting, setInserting] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState();
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState('all');

    useEffect(() => {
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
    }, []);

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

    function toggleDone(event, id, description, done, story_Points) {
      event.preventDefault();
      const data = { description, done, story_Points };
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

    return (
      <div className="App">
        <div className="header-container">
          <img src={ORACLEIcon} alt="ORACLEIcon" className="todo-icon" />
          <h1 className="title">To Do List</h1>
          <RecommendationPopup items={items} />
        </div>
        <NewItem addItem={addItem} isInserting={isInserting} />
        <div className="filter-container">
          <label>Filter by Module:</label>
          <Select value={selectedModule} onChange={handleModuleChange}>
            <MenuItem value="all">All</MenuItem>
            {modules.map(module => (
              <MenuItem key={module.id} value={module.id}>{module.name}</MenuItem>
            ))}
          </Select>
        </div>
          {error && <p>Error: {error.message}</p>}
          {isLoading && <CircularProgress />}
          {!isLoading && (
            <div id="maincontent">
              <table id="itemlistNotDone" className="itemlist">
                <TableBody>
                  {filteredItems().map(item => (!item.done && (
                    <tr key={item.id}>
                      <td className="description">{item.description}</td>
                      <td className="date"><Moment format="MMM Do hh:mm:ss">{item.creation_ts}</Moment></td>
                      <td className="Story_Points">Story Points:{item.story_Points}</td>
                      <td><Button variant="contained" className="DoneButton" onClick={(event) => toggleDone(event, item.id, item.description, !item.done, item.story_Points)} size="small">Done</Button></td>
                      </tr>
                  )))}
                </TableBody>
              </table>
              <h2 id="donelist">Done items</h2>
              <table id="itemlistDone" className="itemlist">
                <TableBody>
                  {filteredItems().map(item => (item.done && (
                    <tr key={item.id}>
                      <td className="description">{item.description}</td>
                      <td className="date"><Moment format="MMM Do hh:mm:ss">{item.creation_ts}</Moment></td>
                      <td className="Story_Points">Story Points:{item.story_Points}</td>
                      <td><Button variant="contained" className="DoneButton" onClick={(event) => toggleDone(event, item.id, item.description, !item.done, item.story_Points)} size="small">Undo</Button></td>
                      <td><Button startIcon={<DeleteIcon />} variant="contained" className="DeleteButton" onClick={() => deleteItem(item.id)} size="small">Delete</Button></td>
                    </tr>
                  )))}
                </TableBody>
              </table>
            </div>
          )}
      </div>
    );
}
export default App;
