import './DashboardInput.css'

export default function DashboardInput() {
    return (
        <div className='dashboard-input-container'>
            {/* Input Title */}
            <input type="text" className='dashboard-input-format' placeholder='Title' />

            {/* Input Description */}
            <input type="text" className='dashboard-input-format description-input' placeholder='Description' />

            {/* Input Story Points */}
            <input type="number" className='dashboard-input-format num-input' placeholder='Story Points' min={1} max={10} />

            {/* Input Hours */}
            <input type="number" className='dashboard-input-format num-input' placeholder='Hours' min={1} />

            {/* Search Button */}
            <button className='dashboard-input-button'>
                <p className='dashboard-input-button-text'>Add</p>
            </button>
        </div>
    );
}