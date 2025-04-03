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

import React, { useState } from "react";
import Button from '@mui/material/Button';
import './NewItem.css';

function NewItem(props) {
  const [title, setTitle] = useState('');
  const [item, setItem] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [hours, setHours] = useState('');

  function handleSubmit(e) {
    if (!item.trim()) {
      return;
    }
    // Now addItem makes the REST API call with both the item text and story points:
    props.addItem({ text: item, storyPoints: storyPoints, hours: hours, title: title });
    setItem("");
    setStoryPoints("");
    setHours("");
    setTitle("");
    e.preventDefault();
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleItemChange(e) {
    setItem(e.target.value);
  }

  function handlePointsChange(e) {
    setStoryPoints(e.target.value);
  }

  function handleHoursChange(e) {
    setHours(e.target.value);
  }


  return (
    <div id="newinputform">
    <form>
      <div className="input-container">
        {/* Title Input */}
        <input
          id="newtitleinput"
          placeholder="Title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
          className="input-format title-input"
        />

        {/* New Item Input */}
        <input
          id="newiteminput"
          placeholder="New item"
          type="text"
          autoComplete="off"
          value={item}
          onChange={handleItemChange}
          className="input-format item-input"
        />

        {/* Story Points Input */}
        <input
          id="storypoints"
          placeholder="Story Points"
          type="number"
          min="1"
          max="10"
          value={storyPoints}
          onChange={handlePointsChange}
          className="input-format number-input"
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
        />

        {/* Hours Input */}
        <input
          id="hours"
          placeholder="Hours"
          type="number"
          min="1"
          value={hours}
          onChange={handleHoursChange}
          className="input-format number-input"
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
        />

        <Button
          className="AddButton"
          variant="contained"
          disabled={props.isInserting}
          onClick={!props.isInserting ? handleSubmit : null}
          size="small"
        >
          {props.isInserting ? 'Adding…' : 'Add'}
        </Button>
      </div>
    </form>
    </div>
  );
}

export default NewItem;