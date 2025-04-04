/*
## MyToDoReact version 1.0.
##
## Copyright (c) 2022 Oracle, Inc.
## Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/*
 * Component that supports creating a new todo item.
 * @author  jean.de.lavarene@oracle.com
 */

import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import API from './API';

const { API_LIST, API_MODULES } = API;

function NewItem(props) {
  const [item, setItem] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [modules, setModules] = useState([]); 
  const [selectedModule, setSelectedModule] = useState('');

  useEffect(() => {
    fetch(API_MODULES)
      .then(response => response.json())
      .then(data => setModules(data))
      .catch(error => console.error("Error fetching modules:", error));
  }, []);

  function handleSubmit(e) {
    if (!item.trim()) {
      return;
    }
    const changedStoryPoints = parseInt(storyPoints, 10);
    if (isNaN(selectedModule.id)) {
        alert("Invalid Module ID");
        return;
    }
    props.addItem({ text: item, storyPoints: changedStoryPoints, moduleId: selectedModule.id });
    setItem("");
    setStoryPoints("");
    setSelectedModule("");
    e.preventDefault();
  }

  function handleItemChange(e) {
    setItem(e.target.value);
  }

  function handlePointsChange(e) {
    setStoryPoints(e.target.value);
  }
  return (
    <div id="newinputform">
    <form>
      <input
        id="newiteminput"
        placeholder="New item"
        type="text"
        autoComplete="off"
        value={item}
        onChange={handleItemChange}
      />

      <span>&nbsp;&nbsp;</span>
      
      <input
        id="storypoints"
        placeholder="Story Points"
        type="number"
        min="1"
        max="10"
        value={storyPoints}
        onChange={handlePointsChange}
        style={{ width: '100px' }}
        // No need to click on the "ADD" button to add a todo item. You
        // can simply press "Enter":
        onKeyDown={event => {
          if (event.key === 'Enter') {
            handleSubmit(event);
          }
        }}
      />
      
      <span>&nbsp;&nbsp;</span>

      {/* Dropdown para seleccionar el módulo */}
      <select
        id="moduleSelect"
        value={selectedModule ? selectedModule.id : ''}
        onChange={(e) => {
          const moduleId = e.target.value;
          const module = modules.find(m => m.id === parseInt(moduleId, 10));
          setSelectedModule(module);
        }}
      >
        <option value="">Select Module</option>
        {modules.map((module) => (
          <option key={module.id} value={module.id}>
            {module.id} - {module.title}
          </option>
        ))}
      </select>

      <Button
        className="AddButton"
        variant="contained"
        disabled={props.isInserting}
        onClick={!props.isInserting ? handleSubmit : null}
        size="small"
      >
        {props.isInserting ? 'Adding…' : 'Add'}
      </Button>
    </form>
    </div>
  );
}

export default NewItem;