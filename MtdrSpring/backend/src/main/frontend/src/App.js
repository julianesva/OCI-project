/*
## MyToDoReact version 1.0.
##
## Copyright (c) 2022 Oracle, Inc.
## Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/*
 * This is the application main React component. We're using "function"
 * components in this application. No "class" components should be used for
 * consistency.
 * @author  jean.de.lavarene@oracle.com
 */
import React, { useState, useEffect } from 'react';
import NewItem from './NewItem';
import API_LIST from './API';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TableBody, CircularProgress } from '@mui/material';
import Moment from 'react-moment';
import RecommendationPopup from './RecommendationPopup';
import ORACLEIcon from './assets/ORACLEIcon.png';

/* In this application we're using Function Components with the State Hooks
 * to manage the states. See the doc: https://reactjs.org/docs/hooks-state.html
 * This App component represents the entire app. It renders a NewItem component
 * and two tables: one that lists the todo items that are to be done and another
 * one with the items that are already done.
 */
function App() {
    // isLoading is true while waiting for the backend to return the list
    // of items. We use this state to display a spinning circle:
    const [isLoading, setLoading] = useState(false);
    // Similar to isLoading, isInserting is true while waiting for the backend
    // to insert a new item:
    const [isInserting, setInserting] = useState(false);
    // The list of todo items is stored in this state. It includes the "done"
    // "not-done" items:
    const [items, setItems] = useState([]);
    // In case of an error during the API call:
    const [error, setError] = useState();

    function deleteItem(deleteId) {
      // console.log("deleteItem("+deleteId+")")
      fetch(API_LIST+"/"+deleteId, {
        method: 'DELETE',
      })
      .then(response => {
        // console.log("response=");
        // console.log(response);
        if (response.ok) {
          // console.log("deleteItem FETCH call is ok");
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
    function toggleDone(event, id, description, done, story_Points ) {
      event.preventDefault();
      modifyItem(id, description, done, story_Points).then(
        (result) => { reloadOneIteam(id); },
        (error) => { setError(error); }
      );
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
                 'description':result.description,
                 'done': result.done,
                 'creation_ts': result.creation_ts, // Add creation_ts to the updated item
                 'story_Points': result.story_Points // Add story_Points to the updated item
                } : x));
            setItems(items2);
          },
          (error) => {
            setError(error);
          });
    }
    function modifyItem(id, description, done, story_Points) {
      // console.log("deleteItem("+deleteId+")")
      var data = {"description": description, "done": done, "story_Points": story_Points};
      console.log("Modifying item DEBUG CONSOLE:", id, "with data:", data); // Add logging
      return fetch(API_LIST+"/"+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        // console.log("response=");
        // console.log(response);
        if (response.ok) {
          // console.log("deleteItem FETCH call is ok");
          return response;
        } else {
          throw new Error('Something went wrong ...');
        }
      });
    }
    /*
    To simulate slow network, call sleep before making API calls.
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    */
    useEffect(() => {
      setLoading(true);
      // sleep(5000).then(() => {
      fetch(API_LIST)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong loading the initial charge check useEffect ...');
          }
        })
        //.then(async (response) => {
        //  if (!response.ok) {
        //    const errorText = await response.text(); // Read response body
        //    throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
        //  }
        //  return response.json();
        //})
        .then(
          (result) => {
            console.log("API Response HEREEEEEEEEEEEEE:", result); //Log the JSON structure
            setLoading(false);
            setItems(result);
          },
          (error) => {
            setLoading(false);
            setError(error);
          });

      //})
    },
    // https://en.reactjs.org/docs/faq-ajax.html
    [] // empty deps array [] means
       // this useEffect will run once
       // similar to componentDidMount()
    );
    function addItem(text){
      console.log("addItem(", text, ")")
      setInserting(true);
      let data = {
        description: text.text,
        story_Points: text.storyPoints,
        estimatedTime: text.hours,
        title: text.title
      };
      
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
            "description": text.title, 
            "story_Points": text.storyPoints // Include story points in the new item
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

    return (
      <div className="App">
        {/* Title */}
        <div className="header-container">
          <img src={ORACLEIcon} alt="ORACLEIcon" className="todo-icon" />
          <h1 className="title">To Do List</h1>
          <RecommendationPopup items={items} />
        </div>

        {/* Item Bar */}
        <NewItem addItem={addItem} isInserting={isInserting}/>

        {/* Display Error */}
        { error &&
          <p>Error: {error.message}</p>
        }

        {/* Display Is Loading */}
        { isLoading &&
          <CircularProgress />
        }

        {/* Main */}
        { !isLoading &&
          <div id="maincontent">
            <table id="itemlistNotDone" className="itemlist">
              <TableBody>
              {items.map(item => (
                !item.done && (
                <tr key={item.id}>
                  <td className="description">{item.description}</td>
                  { /*<td>{JSON.stringify(item, null, 2) }</td>*/ }
                  <td className="date"><Moment format="MMM Do hh:mm:ss">{item.creation_ts}</Moment></td>
                  <td className="Story_Points">Story Points:{item.story_Points}</td> { /*AQUIIIIIIIIIII MODIFICATION HEREEEEEE*/}
                  <td><Button variant="contained" className="DoneButton" onClick={(event) => toggleDone(event, item.id, item.description, !item.done, item.story_Points)} size="small">
                        Done
                      </Button></td>
                </tr>
              )))}
              </TableBody>
            </table>
          <h2 id="donelist">
            Done items
          </h2>
          <table id="itemlistDone" className="itemlist">
            <TableBody>
            {items.map(item => (
              item.done && (

              <tr key={item.id}>
                <td className="description">{item.description}</td>
                <td className="date"><Moment format="MMM Do hh:mm:ss">{item.creation_ts}</Moment></td>
                <td className="Story_Points">Story Points:{item.story_Points}</td> { /*AQUIIIIIIIIIII MODIFICATION HEREEEEEE*/}
                <td><Button variant="contained" className="DoneButton" onClick={(event) => toggleDone(event, item.id, item.description, !item.done, item.story_Points)} size="small">
                      Undo
                    </Button></td>
                <td><Button startIcon={<DeleteIcon />} variant="contained" className="DeleteButton" onClick={() => deleteItem(item.id)} size="small">
                      Delete
                    </Button></td>
              </tr>
            )))}
            </TableBody>
          </table>
          </div>
        }
      </div>
    );
}
export default App;
