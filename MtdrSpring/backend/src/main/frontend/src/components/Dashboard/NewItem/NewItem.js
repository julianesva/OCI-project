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

function NewItem(props) {
  const [item, setItem] = useState('');
  const [storyPoints, setStoryPoints] = useState('');

  function handleSubmit(e) {
    if (!item.trim()) {
      return;
    }
    // Now addItem makes the REST API call with both the item text and story points:
    props.addItem({ text: item, storyPoints: storyPoints });
    setItem("");
    setStoryPoints("");
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