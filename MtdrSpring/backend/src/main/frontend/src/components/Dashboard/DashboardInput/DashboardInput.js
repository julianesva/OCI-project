import './DashboardInput.css'
import { useState } from 'react';
import API from '../../../API'

const { API_MODULES } = API;

export default function DashboardInput({ addItem, isInserting }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [storyPoints, setStoryPoints] = useState('');
    const [hours, setHours] = useState('');

    const clearFields = () => {
        setTitle('');
        setDescription('');
        setStoryPoints('');
        setHours('');
    }

    function handleSubmit(e) {
        if (isInserting) {
            return;
        }
        
        addItem({ title: title, description:description, estimatedTime: hours, story_Points: storyPoints });
        clearFields();
        e.preventDefault();
    }


    return (
        <div className='dashboard-input-container'>
            {/* Input Title */}
            <input type="text" className='dashboard-input-format' placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />

            {/* Input Description */}
            <input type="text" className='dashboard-input-format description-input' placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />

            {/* Input Story Points */}
            <input type="number" className='dashboard-input-format num-input' placeholder='Story Points' min={1} max={10}
                value={storyPoints}
                onChange={(e) => setStoryPoints(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />

            {/* Input Hours */}
            <input type="number" className='dashboard-input-format num-input' placeholder='Hours' min={1}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />

            {/* Search Button */}
            <button className='dashboard-input-button' onClick={handleSubmit} disabled={isInserting}>
                <p className='dashboard-input-button-text'>Add</p>
            </button>
        </div>
    );
}